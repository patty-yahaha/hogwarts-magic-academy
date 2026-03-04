-- ============================================
-- 修复排行榜视图（修复 user_id 错误）
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 金加隆排行榜视图
CREATE OR REPLACE VIEW leaderboard_coins AS
SELECT
    id,
    nickname,
    avatar,
    coins,
    cumulative_coins,
    level,
    ROW_NUMBER() OVER (ORDER BY cumulative_coins DESC) as rank
FROM player_profiles
ORDER BY cumulative_coins DESC;

-- 飞行排行榜视图
CREATE OR REPLACE VIEW leaderboard_flying AS
SELECT
    p.id,
    p.nickname,
    p.avatar,
    COALESCE(MAX(f.score), 0) as best_score,
    COALESCE(SUM(f.pillars_passed), 0) as total_pillars,
    COALESCE(COUNT(f.id), 0) as games_played,
    ROW_NUMBER() OVER (ORDER BY COALESCE(MAX(f.score), 0) DESC) as rank
FROM player_profiles p
LEFT JOIN flying_records f ON p.id = f.player_id
GROUP BY p.id, p.nickname, p.avatar
ORDER BY best_score DESC;
