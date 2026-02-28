/**
 * 玩家数据云同步模块
 *
 * 功能：
 * - 自动将登录用户的数据同步到 Supabase
 * - 页面加载时从云端获取最新数据
 * - 游客模式继续使用 localStorage
 */

(function(window) {
    'use strict';

    const SUPABASE_URL = 'https://xxalvnwmqhfcohcvebnp.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YWx2bndtcWhmYWhmY29oY3ZlYm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk3NDksImV4cCI6MjA4Nzc1NTc0OX0.VcFTOE9cUOqnsDL3QazvPje93LoKgA2tlXLt0NK2FKg';

    let supabase = null;
    let isGuest = true;
    let userId = null;
    let syncEnabled = false;

    // 初始化
    function init() {
        try {
            // 检查是否有 Supabase 客户端
            if (window.supabase) {
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            }
        } catch (error) {
            console.error('PlayerSync: Supabase 初始化失败', error);
            return;
        }

        // 检查登录状态
        userId = localStorage.getItem('userId');
        isGuest = localStorage.getItem('isGuest') === 'true';

        syncEnabled = !isGuest && userId && supabase;

        if (syncEnabled) {
            console.log('PlayerSync: 云端同步已启用');
            // 加载云端数据
            loadFromCloud();
            // 设置自动保存
            setupAutoSave();
        } else {
            console.log('PlayerSync: 游客模式，仅本地存储');
        }
    }

    // 从云端加载数据
    async function loadFromCloud() {
        if (!syncEnabled) return;

        try {
            const { data, error } = await supabase
                .from('player_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // 没有找到记录，创建新记录
                    console.log('PlayerSync: 创建新用户资料');
                    await createNewProfile();
                } else {
                    console.error('PlayerSync: 加载数据失败', error);
                }
                return;
            }

            if (data) {
                // 合并云端数据到本地
                mergeCloudData(data);
                console.log('PlayerSync: 云端数据已加载');
            }
        } catch (error) {
            console.error('PlayerSync: 加载错误', error);
        }
    }

    // 合并云端数据到本地
    function mergeCloudData(cloudData) {
        const localData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');

        // 使用云端数据作为主要数据源，保留本地较新的数据
        const merged = {
            ...localData,
            // 云端数据优先（金币、经验、等级）
            galleons: cloudData.galleons,
            exp: cloudData.exp,
            level: cloudData.level,
            energy: cloudData.energy,
            house: cloudData.house,
            // 云端的其他数据
            decorations: cloudData.decorations || {},
            inventory: cloudData.inventory || {},
            achievements: cloudData.achievements || {},
            // 保留本地的一些临时数据
            nickname: localData.nickname || cloudData.nickname,
            avatar: localData.avatar || cloudData.avatar
        };

        localStorage.setItem('hogwartsPlayer', JSON.stringify(merged));
    }

    // 创建新的用户资料
    async function createNewProfile() {
        const playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');

        try {
            const { data, error } = await supabase
                .from('player_profiles')
                .insert([{
                    user_id: userId,
                    nickname: playerData.nickname || '魔法学徒',
                    avatar: playerData.avatar || '🧙',
                    galleons: playerData.galleons || 100,
                    exp: playerData.exp || 0,
                    level: playerData.level || 1,
                    energy: playerData.energy || 100
                }])
                .select()
                .single();

            if (!error && data) {
                console.log('PlayerSync: 新用户资料创建成功');
            }
        } catch (error) {
            console.error('PlayerSync: 创建资料失败', error);
        }
    }

    // 保存数据到云端
    async function saveToCloud() {
        if (!syncEnabled) return;

        const playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');

        try {
            const { error } = await supabase
                .from('player_profiles')
                .upsert({
                    user_id: userId,
                    nickname: playerData.nickname || '魔法学徒',
                    avatar: playerData.avatar || '🧙',
                    galleons: playerData.galleons || 0,
                    exp: playerData.exp || 0,
                    level: playerData.level || 1,
                    energy: playerData.energy || 100,
                    house: playerData.house || 'Gryffindor',
                    decorations: playerData.decorations || {},
                    inventory: playerData.inventory || {},
                    achievements: playerData.achievements || {},
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id'
                });

            if (error) {
                console.error('PlayerSync: 保存失败', error);
            } else {
                console.log('PlayerSync: 数据已同步到云端');
            }
        } catch (error) {
            console.error('PlayerSync: 保存错误', error);
        }
    }

    // 设置自动保存（防抖）
    let saveTimer = null;
    function setupAutoSave() {
        if (!syncEnabled) return;

        // 监听 localStorage 变化
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.call(this, key, value);

            if (key === 'hogwartsPlayer') {
                clearTimeout(saveTimer);
                saveTimer = setTimeout(() => {
                    saveToCloud();
                }, 2000); // 2秒后保存，避免频繁请求
            }
        };
    }

    // 手动触发保存
    function syncNow() {
        if (syncEnabled) {
            saveToCloud();
        }
    }

    // 获取同步状态
    function getStatus() {
        return {
            enabled: syncEnabled,
            isGuest: isGuest,
            userId: userId
        };
    }

    // 页面卸载时保存
    window.addEventListener('beforeunload', function() {
        if (syncEnabled) {
            // 使用 sendBeacon 确保数据被发送
            const playerData = JSON.parse(localStorage.getItem('hogwartsPlayer') || '{}');
            const data = {
                user_id: userId,
                nickname: playerData.nickname || '魔法学徒',
                avatar: playerData.avatar || '🧙',
                galleons: playerData.galleons || 0,
                exp: playerData.exp || 0,
                level: playerData.level || 1,
                energy: playerData.energy || 100
            };

            // 注意：sendBeacon 需要配合 Supabase REST API 使用
            // 这里简化处理，依赖 auto-save
        }
    });

    // 导出到全局
    window.PlayerSync = {
        init,
        syncNow,
        getStatus,
        loadFromCloud
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window);
