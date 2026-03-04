-- ============================================
-- 修复点赞策略
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 删除旧的点赞策略
DROP POLICY IF EXISTS "允许点赞" ON message_likes;

-- 创建新的点赞策略 - 允许登录用户和游客点赞
CREATE POLICY "允许点赞"
    ON message_likes FOR INSERT
    WITH CHECK (true);
