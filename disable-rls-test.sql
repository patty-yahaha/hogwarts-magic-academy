-- ============================================
-- 临时禁用 RLS 进行测试
-- 在 Supabase SQL Editor 中运行此脚本
-- ⚠️ 这会暂时禁用所有安全策略，仅用于测试
-- ============================================

-- 临时禁用 messages 表的 RLS
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- 临时禁用 message_replies 表的 RLS
ALTER TABLE message_replies DISABLE ROW LEVEL SECURITY;

-- 临时禁用 message_likes 表的 RLS
ALTER TABLE message_likes DISABLE ROW LEVEL SECURITY;

-- 验证数据
SELECT COUNT(*) as messages_count FROM messages;
