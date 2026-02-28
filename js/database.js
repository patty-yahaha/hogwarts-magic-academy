/**
 * 霍格沃茨魔法学院 - 数据同步层
 *
 * 这个文件负责在 localStorage 和 Supabase 之间同步数据
 * 提供统一的 API 供所有页面使用
 */

// ============================================
// Supabase 配置
// ============================================
const SUPABASE_CONFIG = {
    url: 'https://xxalvnwmqhfcohcvebnp.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YWx2bndtcWhmY29oY3ZlYm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk3NDksImV4cCI6MjA4Nzc1NTc0OX0.VcFTOE9cUOqnsDL3QazvPje93LoKgA2tlXLt0NK2FKg'
};

// 初始化 Supabase 客户端
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

// ============================================
// 全局状态
// ============================================
let isGuest = localStorage.getItem('isGuest') === 'true';
let currentUserId = localStorage.getItem('userId');
let currentPlayerData = null;

// ============================================
// 用户认证相关
// ============================================

/**
 * 检查用户登录状态
 * @returns {Promise<boolean>} 是否已登录
 */
async function checkAuthStatus() {
    if (isGuest) {
        return false;
    }

    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUserId = session.user.id;
            localStorage.setItem('userId', currentUserId);
            return true;
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }

    return false;
}

/**
 * 用户登录
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @returns {Promise<Object>} 登录结果
 */
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (!error && data.user) {
        currentUserId = data.user.id;
        localStorage.setItem('userId', currentUserId);
        localStorage.setItem('userEmail', email);
        isGuest = false;
        localStorage.removeItem('isGuest');

        await loadPlayerData();
        return { success: true, user: data.user };
    }

    return { success: false, error: error };
}

/**
 * 用户注册
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @param {string} nickname 昵称
 * @returns {Promise<Object>} 注册结果
 */
async function registerUser(email, password, nickname) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                nickname: nickname
            }
        }
    });

    if (!error && data.user) {
        currentUserId = data.user.id;
        localStorage.setItem('userId', currentUserId);
        localStorage.setItem('userEmail', email);
        isGuest = false;
        localStorage.removeItem('isGuest');

        await loadPlayerData();
        return { success: true, user: data.user };
    }

    return { success: false, error: error };
}

/**
 * 用户登出
 * @returns {Promise<void>}
 */
async function logoutUser() {
    await supabase.auth.signOut();
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isGuest');
    currentUserId = null;
    currentPlayerData = null;
    window.location.href = 'login.html';
}

// ============================================
// 数据加载（从云端同步到本地）
// ============================================

/**
 * 加载所有玩家数据
 * @returns {Promise<Object>} 玩家数据
 */
async function loadPlayerData() {
    if (!currentUserId || isGuest) {
        // 游客模式，只使用 localStorage
        currentPlayerData = {
            isGuest: true,
            profile: {
                nickname: localStorage.getItem('nickname') || '魔法学徒',
                avatar: localStorage.getItem('avatar') || '🧙',
                coins: parseInt(localStorage.getItem('hogwartsCoins') || '100'),
                cumulative_coins: parseInt(localStorage.getItem('cumulativeCoins') || '0'),
                level: parseInt(localStorage.getItem('playerLevel') || '0'),
                xp: parseInt(localStorage.getItem('playerXP') || '0')
            }
        };
        return currentPlayerData;
    }

    try {
        // 并行加载所有数据
        const [
            profileData,
            broomsData,
            inventoryData,
            fragmentsData,
            potionsData,
            framesData
        ] = await Promise.all([
            // 用户资料
            supabase.from('player_profiles')
                .select('*')
                .eq('id', currentUserId)
                .single(),

            // 拥有的扫帚
            supabase.from('owned_broomsticks')
                .select('broom_id')
                .eq('player_id', currentUserId),

            // 背包物品
            supabase.from('inventory_items')
                .select('*')
                .eq('player_id', currentUserId),

            // 碎片和兑换券
            supabase.from('broom_fragments')
                .select('*')
                .eq('player_id', currentUserId)
                .single(),

            // 药水
            supabase.from('inventory_potions')
                .select('*')
                .eq('player_id', currentUserId)
                .single(),

            // 头像框
            supabase.from('unlocked_frames')
                .select('*')
                .eq('player_id', currentUserId)
                .single()
        ]);

        // 组装数据对象
        currentPlayerData = {
            isGuest: false,
            profile: profileData.data,
            ownedBroomsticks: broomsData.data ? broomsData.data.map(b => b.broom_id) : ['normal_broom'],
            inventory: inventoryData.data || [],
            fragments: fragmentsData.data?.fragments || 0,
            vouchers: fragmentsData.data?.vouchers || 0,
            potions: potionsData.data?.potions || {},
            unlockedFrames: framesData.data?.frame_ids || []
        };

        // 同步到 localStorage（用于离线访问）
        syncToLocal(currentPlayerData);

        return currentPlayerData;

    } catch (error) {
        console.error('Error loading player data:', error);
        return null;
    }
}

/**
 * 同步数据到 localStorage
 * @param {Object} data 玩家数据
 */
function syncToLocal(data) {
    if (!data) return;

    // 同步基本资料
    if (data.profile) {
        localStorage.setItem('nickname', data.profile.nickname);
        localStorage.setItem('avatar', data.profile.avatar);
        localStorage.setItem('hogwartsCoins', data.profile.coins.toString());
        localStorage.setItem('cumulativeCoins', data.profile.cumulative_coins.toString());
        localStorage.setItem('playerLevel', data.profile.level.toString());
        localStorage.setItem('playerXP', data.profile.xp.toString());
    }

    // 同步扫帚
    if (data.ownedBroomsticks) {
        localStorage.setItem('ownedBroomsticks', JSON.stringify(data.ownedBroomsticks));
    }

    // 同步碎片
    localStorage.setItem('broomFragments', (data.fragments || 0).toString());
    localStorage.setItem('broomVouchers', (data.vouchers || 0).toString());

    // 同步药水
    localStorage.setItem('inventoryPotions', JSON.stringify(data.potions || {}));

    // 同步头像框
    localStorage.setItem('unlockedFrames', JSON.stringify(data.unlockedFrames || []));

    // 同步背包物品
    if (data.inventory) {
        localStorage.setItem('hogwartsPlayer', JSON.stringify({
            nickname: data.profile.nickname,
            avatar: data.profile.avatar,
            coins: data.profile.coins,
            inventory: data.inventory,
            room: JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}').room
        }));
    }
}

// ============================================
// 数据保存（从本地同步到云端）
// ============================================

/**
 * 保存玩家数据到云端
 * @param {Object} changes 需要保存的变更
 * @returns {Promise<boolean>} 是否成功
 */
async function savePlayerData(changes) {
    if (!currentUserId || isGuest) {
        // 游客模式，只保存到 localStorage
        return true;
    }

    try {
        // 根据变更类型保存到不同的表
        const promises = [];

        // 保存基本资料
        if (changes.profile) {
            promises.push(
                supabase.from('player_profiles')
                    .update({
                        nickname: changes.profile.nickname,
                        avatar: changes.profile.avatar,
                        coins: changes.profile.coins,
                        cumulative_coins: changes.profile.cumulative_coins,
                        level: changes.profile.level,
                        xp: changes.profile.xp,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', currentUserId)
            );
        }

        // 添加扫帚
        if (changes.addBroom) {
            promises.push(
                supabase.from('owned_broomsticks')
                    .insert({
                        player_id: currentUserId,
                        broom_id: changes.addBroom
                    })
            );
        }

        // 添加背包物品
        if (changes.addInventoryItem) {
            promises.push(
                supabase.from('inventory_items')
                    .insert({
                        player_id: currentUserId,
                        ...changes.addInventoryItem
                    })
            );
        }

        // 更新碎片
        if (changes.fragments !== undefined) {
            promises.push(
                supabase.from('broom_fragments')
                    .update({ fragments: changes.fragments })
                    .eq('player_id', currentUserId)
            );
        }

        // 更新药水
        if (changes.potions) {
            promises.push(
                supabase.from('inventory_potions')
                    .update({ potions: changes.potions })
                    .eq('player_id', currentUserId)
            );
        }

        // 添加头像框
        if (changes.addFrame) {
            promises.push(
                supabase.from('unlocked_frames')
                    .update({
                        frame_ids: supabase.raw('array_append(frame_ids, ?)', changes.addFrame)
                    })
                    .eq('player_id', currentUserId)
            );
        }

        // 保存飞行记录
        if (changes.flyingRecord) {
            promises.push(
                supabase.from('flying_records')
                    .insert({
                        player_id: currentUserId,
                        ...changes.flyingRecord
                    })
            );
        }

        // 解锁成就
        if (changes.unlockAchievement) {
            promises.push(
                supabase.from('unlocked_achievements')
                    .insert({
                        player_id: currentUserId,
                        achievement_id: changes.unlockAchievement
                    })
            );
        }

        await Promise.all(promises);
        return true;

    } catch (error) {
        console.error('Error saving player data:', error);
        return false;
    }
}

// ============================================
// 金币相关
// ============================================

/**
 * 获取当前金币数
 * @returns {Promise<number>} 金币数量
 */
async function getCoins() {
    if (isGuest) {
        return parseInt(localStorage.getItem('hogwartsCoins') || '100');
    }

    const data = await loadPlayerData();
    return data?.profile?.coins || 0;
}

/**
 * 添加金币
 * @param {number} amount 金币数量（正数为增加，负数为消费）
 * @returns {Promise<boolean>} 是否成功
 */
async function addCoins(amount) {
    const currentCoins = await getCoins();
    const newCoins = currentCoins + amount;

    if (isGuest) {
        localStorage.setItem('hogwartsCoins', newCoins.toString());
        // 只有在获得金币时才更新累计金币
        if (amount > 0) {
            const currentCumulative = parseInt(localStorage.getItem('cumulativeCoins') || '0');
            localStorage.setItem('cumulativeCoins', (currentCumulative + amount).toString());
        }
        return true;
    }

    const profile = currentPlayerData?.profile;
    const updateData = {
        ...profile,
        coins: newCoins
    };

    // 只有在获得金币时才更新累计金币
    if (amount > 0) {
        updateData.cumulative_coins = (profile?.cumulative_coins || 0) + amount;
    }

    return await savePlayerData({
        profile: updateData
    });
}

/**
 * 消费金币
 * @param {number} amount 金币数量
 * @returns {Promise<boolean>} 是否成功
 */
async function spendCoins(amount) {
    const currentCoins = await getCoins();

    if (currentCoins < amount) {
        return false;
    }

    return await addCoins(-amount);
}

// ============================================
// 碎片相关
// ============================================

/**
 * 获取碎片数量
 * @returns {Promise<number>} 碎片数量
 */
async function getFragments() {
    if (isGuest) {
        return parseInt(localStorage.getItem('broomFragments') || '0');
    }

    const data = await loadPlayerData();
    return data?.fragments || 0;
}

/**
 * 添加碎片
 * @param {number} amount 碎片数量
 * @returns {Promise<boolean>} 是否成功
 */
async function addFragments(amount) {
    const current = await getFragments();
    const newAmount = current + amount;

    if (isGuest) {
        localStorage.setItem('broomFragments', newAmount.toString());
        return true;
    }

    return await savePlayerData({ fragments: newAmount });
}

// ============================================
// 背包物品相关
// ============================================

/**
 * 获取背包物品
 * @returns {Promise<Array>} 背包物品列表
 */
async function getInventory() {
    if (isGuest) {
        const playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');
        return playerData.inventory || [];
    }

    const data = await loadPlayerData();
    return data?.inventory || [];
}

/**
 * 添加物品到背包
 * @param {Object} item 物品数据
 * @returns {Promise<boolean>} 是否成功
 */
async function addInventoryItem(item) {
    if (isGuest) {
        let playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');
        if (!playerData.inventory) {
            playerData.inventory = [];
        }

        // 检查是否已存在
        const exists = playerData.inventory.some(i => i.id === item.id);
        if (!exists) {
            playerData.inventory.push(item);
            localStorage.setItem('hogwartsPlayer', JSON.stringify(playerData));
        }

        return true;
    }

    return await savePlayerData({
        addInventoryItem: {
            id: item.id,
            item_id: item.id,
            item_name_zh: item.nameZh,
            item_name_en: item.nameEn,
            icon: item.icon,
            quantity: 1
        }
    });
}

// ============================================
// 房间装饰相关
// ============================================

/**
 * 获取房间装饰列表
 * @returns {Promise<Array>} 房间装饰
 */
async function getRoomDecorations() {
    if (isGuest) {
        const playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');
        return playerData.roomDecorations || [];
    }

    // 从 mailbox_letters 表中获取已领取的装饰
    const { data } = await supabase
        .from('mailbox_letters')
        .select('*')
        .eq('player_id', currentUserId)
        .eq('is_reward_claimed', 'true')
        .not('reward_data', 'is', null);

    return data?.map(letter => letter.reward_data?.item) || [];
}

// ============================================
// 实时数据订阅
// ============================================

/**
 * 订阅金币变化
 * @param {Function} callback 回调函数
 */
function subscribeCoins(callback) {
    if (isGuest) return;

    supabase
        .channel('player-coins')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'player_profiles',
            filter: `id=eq.${currentUserId}`
        }, (payload) => {
            if (payload.new) {
                callback(payload.new.coins);
            }
        })
        .subscribe();
}

// ============================================
// 导出给其他页面使用
// ============================================
window.HogwartsDatabase = {
    // 认证
    checkAuthStatus,
    loginUser,
    registerUser,
    logoutUser,
    isGuest: () => isGuest,

    // 数据加载
    loadPlayerData,
    getCurrentPlayerData: () => currentPlayerData,

    // 数据保存
    savePlayerData,

    // 金币
    getCoins,
    addCoins,
    spendCoins,

    // 碎片
    getFragments,
    addFragments,

    // 背包
    getInventory,
    addInventoryItem,

    // 房间装饰
    getRoomDecorations,

    // Supabase 客户端（用于高级操作）
    supabase
};

// 自动检查登录状态
checkAuthStatus().then(isLoggedIn => {
    if (isLoggedIn) {
        console.log('User is logged in:', currentUserId);
    } else {
        console.log('No user logged in');
    }
});
