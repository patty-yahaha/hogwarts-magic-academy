-- ============================================
-- 修复留言板插入策略（只允许已登录用户）
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 删除旧的插入策略
DROP POLICY IF EXISTS "允许插入留言" ON messages;

-- 创建新的插入策略 - 只允许已登录用户（user_id 必须匹配 auth.uid()）
CREATE POLICY "允许插入留言"
    ON messages FOR INSERT
    WITH CHECK (auth.uid()::text = user_id);
