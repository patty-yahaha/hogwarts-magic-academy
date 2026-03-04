-- ============================================
-- 修复累计金币数据
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 查看需要修复的用户
SELECT
    id,
    nickname,
    coins as current_coins,
    cumulative_coins,
    (cumulative_coins < coins) as needs_fix
FROM player_profiles
WHERE cumulative_coins < coins
ORDER BY coins DESC;

-- 修复：将 cumulative_coins 设置为等于 coins
UPDATE player_profiles
SET
    cumulative_coins = coins,
    updated_at = NOW()
WHERE cumulative_coins < coins;

-- 验证修复结果
SELECT
    '修复后数据' as status,
    id,
    nickname,
    coins as current_coins,
    cumulative_coins
FROM player_profiles
ORDER BY coins DESC
LIMIT 20;
