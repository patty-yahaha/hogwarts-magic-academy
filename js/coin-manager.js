/**
 * 霍格沃茨魔法学院 - 金币管理模块
 *
 * 统一管理金加隆（Galleons），包括：
 * - 当前金币余额
 * - 累计收入（用于等级计算）
 * - 云端数据同步
 *
 * 所有页面都应该使用这个模块来管理金币，确保数据一致性
 */

(function(window) {
    'use strict';

    // Supabase 配置
    const SUPABASE_URL = 'https://xxalvnwmqhfcohcvebnp.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YWx2bndtcWhmY29oY3ZlYm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzk3NDksImV4cCI6MjA4Nzc1NTc0OX0.VcFTOE9cUOqnsDL3QazvPje93LoKgA2tlXLt0NK2FKg';
    let supabase = null;

    // 存储键名
    const STORAGE_KEYS = {
        CURRENT_COINS: 'hogwartsCoins',      // 当前金币
        CUMULATIVE_COINS: 'cumulativeCoins',  // 累计金币
        PLAYER_DATA: 'hogwartsPlayer'         // 玩家数据
    };

    // 初始金币数量
    const INITIAL_COINS = 100;

    // ============================================
    // 辅助函数
    // ============================================

    /**
     * 初始化 Supabase 客户端
     */
    async function initSupabase() {
        // 优先使用全局已认证的客户端
        if (!supabase) {
            if (window.sb && window.sb.from) {
                // 使用已有的全局客户端（已认证）
                supabase = window.sb;
                console.log('CoinManager: 使用全局 Supabase 客户端');
            } else if (window.supabase) {
                // 创建新客户端
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
                    auth: {
                        persistSession: true,
                        autoRefreshToken: true,
                        storage: window.localStorage
                    }
                });
                console.log('CoinManager: 创建新 Supabase 客户端');
            }
        }
    }

    /**
     * 检查是否为游客模式
     */
    function isGuestMode() {
        return localStorage.getItem('isGuest') === 'true' || !localStorage.getItem('userId');
    }

    /**
     * 获取当前用户 ID
     */
    function getCurrentUserId() {
        return localStorage.getItem('userId');
    }

    /**
     * 同步金币到云端数据库
     * @param {number} currentCoins 当前金币
     * @param {number} cumulativeCoins 累计金币
     */
    async function syncCoinsToCloud(currentCoins, cumulativeCoins) {
        await initSupabase();

        // 游客模式或没有用户 ID，不同步
        if (isGuestMode() || !supabase) {
            console.log('CoinManager: 游客模式或 Supabase 未初始化，跳过同步');
            return;
        }

        const userId = getCurrentUserId();
        if (!userId) {
            console.log('CoinManager: 没有用户 ID，跳过同步');
            return;
        }

        try {
            console.log('CoinManager: 开始同步金币到云端', { userId, currentCoins, cumulativeCoins });

            const updateData = {
                id: userId,
                coins: currentCoins,
                cumulative_coins: cumulativeCoins,
                updated_at: new Date().toISOString()
            };
            console.log('CoinManager: 准备更新的数据', updateData);

            // 使用 update 操作更新记录
            const { error, data } = await supabase
                .from('player_profiles')
                .update({
                    coins: currentCoins,
                    cumulative_coins: cumulativeCoins,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId)
                .select();

            console.log('CoinManager: 数据库更新结果 (update)', { error, data });
            if (error) {
                console.warn('CoinManager: 同步金币到云端失败', error);
                console.warn('CoinManager: 错误详情', { code: error.code, message: error.message, details: error.details });
            } else {
                console.log('CoinManager: 金币已同步到云端', { updated: data });
            }
        } catch (error) {
            console.warn('CoinManager: 同步金币到云端出错', error);
        }
    }

    // ============================================
    // 获取金币数量
    // ============================================

    /**
     * 获取当前金币余额
     * @returns {number} 当前金币数量
     */
    function getCurrentCoins() {
        return parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_COINS) || '0');
    }

    /**
     * 获取累计金币数量
     * @returns {number} 累计金币数量
     */
    function getCumulativeCoins() {
        // 直接从 cumulativeCoins 读取，不再从 playerData 读取
        // 这样可以确保初始化逻辑正常工作
        const cumulative = parseInt(localStorage.getItem(STORAGE_KEYS.CUMULATIVE_COINS) || '0');
        return cumulative;
    }

    // ============================================
    // 更新金币数量
    // ============================================

    /**
     * 更新当前金币（不改变累计金币）
     * 仅用于消费金币、系统初始化等场景
     * @param {number} amount 新的金币数量
     */
    function setCurrentCoins(amount) {
        const newAmount = Math.max(0, amount); // 不能为负数
        localStorage.setItem(STORAGE_KEYS.CURRENT_COINS, newAmount.toString());

        // 同步更新 playerData
        syncCoinsToPlayerData(newAmount, null);

        // 触发自定义事件
        dispatchCoinEvent('current-coins-changed', { amount: newAmount });
    }

    /**
     * 更新累计金币（不改变当前金币）
     * 仅用于数据迁移、修复等场景
     * @param {number} amount 新的累计金币数量
     */
    function setCumulativeCoins(amount) {
        const newAmount = Math.max(0, amount);
        localStorage.setItem(STORAGE_KEYS.CUMULATIVE_COINS, newAmount.toString());

        // 同步更新 playerData
        syncCoinsToPlayerData(null, newAmount);

        // 触发自定义事件
        dispatchCoinEvent('cumulative-coins-changed', { amount: newAmount });
    }

    /**
     * 同步金币到 playerData
     * @param {number|null} currentCoins 当前金币（如果为 null 则不更新）
     * @param {number|null} cumulativeCoins 累计金币（如果为 null 则不更新）
     */
    function syncCoinsToPlayerData(currentCoins, cumulativeCoins) {
        try {
            const playerData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYER_DATA) || '{}');

            if (currentCoins !== null) {
                playerData.coins = currentCoins;
            }

            if (cumulativeCoins !== null) {
                playerData.cumulativeCoins = cumulativeCoins;
            }

            localStorage.setItem(STORAGE_KEYS.PLAYER_DATA, JSON.stringify(playerData));
        } catch (e) {
            console.warn('CoinManager: 同步到 playerData 失败', e);
        }
    }

    // ============================================
    // 添加/消费金币
    // ============================================

    /**
     * 添加金币（同时更新当前和累计金币）
     * @param {number} amount 金币数量（正数）
     * @returns {Object} 更新后的金币信息
     */
    function addCoins(amount) {
        if (amount <= 0) {
            console.warn('CoinManager: 添加金币数量必须为正数', amount);
            return { current: getCurrentCoins(), cumulative: getCumulativeCoins() };
        }

        // 直接从 localStorage 读取最新值，确保使用最新的数据
        const current = parseInt(localStorage.getItem(STORAGE_KEYS.CURRENT_COINS) || '0');
        const cumulative = parseInt(localStorage.getItem(STORAGE_KEYS.CUMULATIVE_COINS) || '0');

        const newCurrent = current + amount;
        const newCumulative = cumulative + amount;

        console.log(`CoinManager: 准备添加 ${amount} 金币`, { current, cumulative, newCurrent, newCumulative });

        // 更新当前金币
        localStorage.setItem(STORAGE_KEYS.CURRENT_COINS, newCurrent.toString());

        // 更新累计金币
        localStorage.setItem(STORAGE_KEYS.CUMULATIVE_COINS, newCumulative.toString());

        const finalCurrentCoins = localStorage.getItem(STORAGE_KEYS.CURRENT_COINS);
        const finalCumulativeCoins = localStorage.getItem(STORAGE_KEYS.CUMULATIVE_COINS);
        console.log(`CoinManager: 已更新 localStorage`, { currentCoins: finalCurrentCoins, cumulativeCoins: finalCumulativeCoins });

        // 同步到 playerData
        syncCoinsToPlayerData(newCurrent, newCumulative);

        // 同步到云端（异步，不阻塞）
        syncCoinsToCloud(newCurrent, newCumulative);

        console.log(`CoinManager: 获得 ${amount} 金加隆，当前: ${newCurrent}, 累计: ${newCumulative}`);

        // 触发自定义事件
        dispatchCoinEvent('coins-added', {
            amount: amount,
            current: newCurrent,
            cumulative: newCumulative
        });

        return { current: newCurrent, cumulative: newCumulative };
    }

    /**
     * 消费金币（只减少当前金币，不影响累计金币）
     * @param {number} amount 金币数量（正数）
     * @returns {boolean} 是否成功消费
     */
    function spendCoins(amount) {
        if (amount <= 0) {
            console.warn('CoinManager: 消费金币数量必须为正数', amount);
            return false;
        }

        const current = getCurrentCoins();

        if (current < amount) {
            console.warn('CoinManager: 金币不足', { current, needed: amount });
            return false;
        }

        const newCurrent = current - amount;

        // 只更新当前金币
        localStorage.setItem(STORAGE_KEYS.CURRENT_COINS, newCurrent.toString());

        // 同步到 playerData（不改变累计金币）
        syncCoinsToPlayerData(newCurrent, null);

        // 同步到云端（异步，不阻塞）
        syncCoinsToCloud(newCurrent, getCumulativeCoins());

        console.log(`CoinManager: 消费 ${amount} 金加隆，当前: ${newCurrent}, 累计: ${getCumulativeCoins()}`);

        // 触发自定义事件
        dispatchCoinEvent('coins-spent', {
            amount: amount,
            current: newCurrent,
            cumulative: getCumulativeCoins()
        });

        return true;
    }

    // ============================================
    // 初始化
    // ============================================

    /**
     * 初始化金币系统
     * 只有在完全没有金币数据时才设置初始金币
     * 页面加载时从数据库同步最新的金币值
     */
    function initialize() {
        const current = getCurrentCoins();
        const cumulative = getCumulativeCoins();

        console.log('CoinManager: 检查是否需要初始化', { current, cumulative });

        // 只有当完全没有金币数据时才设置初始金币
        if (current === 0 && cumulative === 0) {
            console.log('CoinManager: 首次访问，设置初始金币');
            setCurrentCoins(INITIAL_COINS);
            setCumulativeCoins(INITIAL_COINS);
        } else {
            console.log('CoinManager: 已有金币数据，跳过初始化', { current, cumulative });
            // 从数据库同步最新的金币值
            syncCoinsFromDatabase();
        }
    }

    /**
     * 从数据库同步金币到本地
     */
    async function syncCoinsFromDatabase() {
        await initSupabase();
        const userId = getCurrentUserId();

        if (!userId || !supabase || isGuestMode()) {
            console.log('CoinManager: 跳过数据库同步（游客或未登录）');
            return;
        }

        try {
            console.log('CoinManager: 从数据库同步金币...', { userId });

            const { data: profiles, error } = await supabase
                .from('player_profiles')
                .select('coins, cumulative_coins')
                .eq('id', userId)
                .single();

            if (error) {
                console.warn('CoinManager: 从数据库读取金币失败', error);
                return;
            }

            if (!profiles) {
                console.log('CoinManager: 数据库中没有用户记录，跳过同步');
                return;
            }

            const dbCurrent = profiles.coins || 0;
            const dbCumulative = profiles.cumulative_coins || 0;
            const localCurrent = getCurrentCoins();
            const localCumulative = getCumulativeCoins();

            console.log('CoinManager: 数据库中的金币', { dbCurrent, dbCumulative });
            console.log('CoinManager: 本地存储的金币', { localCurrent, localCumulative });

            // 如果数据库中的值比本地大，使用数据库的值
            // 这可以防止本地数据被重置后丢失进度
            let shouldUpdate = false;

            if (dbCumulative > localCumulative) {
                console.log('CoinManager: 数据库累计金币更大，使用数据库值');
                setCumulativeCoins(dbCumulative);
                shouldUpdate = true;
            }

            if (dbCurrent > localCurrent) {
                console.log('CoinManager: 数据库当前金币更大，使用数据库值');
                setCurrentCoins(dbCurrent);
                shouldUpdate = true;
            }

            // 同步到 playerData
            syncCoinsToPlayerData(shouldUpdate ? dbCurrent : localCurrent, shouldUpdate ? dbCumulative : localCumulative);

            if (shouldUpdate) {
                console.log('CoinManager: 已从数据库同步金币', { current: getCurrentCoins(), cumulative: getCumulativeCoins() });
            }
        } catch (error) {
            console.warn('CoinManager: 从数据库同步金币出错', error);
        }
    }

    // ============================================
    // 事件系统
    // ============================================

    /**
     * 触发金币事件
     * @param {string} eventType 事件类型
     * @param {Object} data 事件数据
     */
    function dispatchCoinEvent(eventType, data) {
        const event = new CustomEvent('coinManager:' + eventType, {
            detail: data
        });
        window.dispatchEvent(event);
    }

    /**
     * 监听金币变化
     * @param {string} eventType 事件类型 ('coins-added', 'coins-spent', 'current-coins-changed', 'cumulative-coins-changed')
     * @param {Function} callback 回调函数
     */
    function onCoinChange(eventType, callback) {
        const eventName = 'coinManager:' + eventType;
        window.addEventListener(eventName, function(e) {
            callback(e.detail);
        });
    }

    // ============================================
    // 工具函数
    // ============================================

    /**
     * 格式化金币显示
     * @param {number} amount 金币数量
     * @returns {string} 格式化后的字符串
     */
    function formatCoins(amount) {
        return amount.toLocaleString('zh-CN');
    }

    /**
     * 获取金币信息摘要
     * @returns {Object} 金币信息
     */
    function getCoinInfo() {
        return {
            current: getCurrentCoins(),
            cumulative: getCumulativeCoins(),
            formatted: {
                current: formatCoins(getCurrentCoins()),
                cumulative: formatCoins(getCumulativeCoins())
            }
        };
    }

    /**
     * 重置金币系统（仅用于调试）
     */
    function resetCoins() {
        console.warn('CoinManager: 重置金币系统');
        localStorage.removeItem(STORAGE_KEYS.CURRENT_COINS);
        localStorage.removeItem(STORAGE_KEYS.CUMULATIVE_COINS);
        initialize();
    }

    /**
     * 强制同步当前金币到云端（用于调试）
     */
    async function forceSyncToCloud() {
        const currentCoins = getCurrentCoins();
        const cumulativeCoins = getCumulativeCoins();
        console.log('CoinManager: 强制同步金币到云端', { currentCoins, cumulativeCoins });
        await syncCoinsToCloud(currentCoins, cumulativeCoins);
    }

    // ============================================
    // 导出 API
    // ============================================

    window.CoinManager = {
        // 获取金币
        getCurrentCoins,
        getCumulativeCoins,
        getCoinInfo,

        // 设置金币
        setCurrentCoins,
        setCumulativeCoins,

        // 添加/消费金币
        addCoins,
        spendCoins,

        // 初始化
        initialize,
        resetCoins,
        forceSyncToCloud,

        // 事件
        onCoinChange,

        // 工具
        formatCoins,

        // 常量
        INITIAL_COINS
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    console.log('CoinManager: 金币管理模块已加载');

})(window);
