-- ============================================
-- 测试匿名访问权限
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 1. 检查 messages 表的 RLS 策略
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'messages';

-- 2. 检查 messages 表是否有数据
SELECT COUNT(*) as messages_count FROM messages;

-- 3. 尝试模拟匿名用户查询（使用 anon role）
SET ROLE anon;
SELECT COUNT(*) as anon_can_read FROM messages;

-- 4. 恢复默认 role
RESET ROLE;

-- 5. 检查 RLS 是否启用
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('messages', 'message_replies', 'message_likes');
