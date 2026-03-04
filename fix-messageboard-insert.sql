-- ============================================
-- 修复留言板插入策略
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 删除旧的插入策略
DROP POLICY IF EXISTS "允许插入留言" ON messages;
DROP POLICY IF EXISTS "允许登录用户插入留言" ON messages;
DROP POLICY IF EXISTS "允许游客插入留言" ON messages;

-- 创建新的插入策略 - 简化版本
CREATE POLICY "允许插入留言"
    ON messages FOR INSERT
    WITH CHECK (true);

-- 注意：这个策略允许任何人插入留言
-- 如果需要更严格的控制，可以修改为：
-- WITH CHECK (
--     (auth.uid() IS NOT NULL AND auth.uid()::text = user_id) OR
--     (is_guest = true AND user_id IS NULL)
-- );
