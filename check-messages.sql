-- ============================================
-- 检查留言板数据
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 检查 messages 表
SELECT 'messages 表记录数：' as 检查项, COUNT(*) as 数量 FROM messages
UNION ALL
SELECT 'message_replies 表记录数：', COUNT(*) FROM message_replies
UNION ALL
SELECT 'message_likes 表记录数：', COUNT(*) FROM message_likes;

-- 显示所有留言（如果有）
SELECT '--- 所有留言 ---' as info;
SELECT * FROM messages ORDER BY created_at DESC LIMIT 10;

-- 显示所有回复（如果有）
SELECT '--- 所有回复 ---' as info;
SELECT * FROM message_replies ORDER BY created_at DESC LIMIT 10;
