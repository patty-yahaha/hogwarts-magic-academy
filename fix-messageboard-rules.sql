-- ============================================
-- 修复留言板 RLS 策略
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 1. 删除所有旧的策略（避免冲突）
DROP POLICY IF EXISTS "允许所有人读取留言" ON messages;
DROP POLICY IF EXISTS "所有人可以读取留言" ON messages;
DROP POLICY IF EXISTS "所有人可以读取留言" ON messages;
DROP POLICY IF EXISTS "允许登录用户插入留言" ON messages;
DROP POLICY IF EXISTS "允许用户删除自己的留言" ON messages;
DROP POLICY IF EXISTS "允许游客插入留言" ON messages;
DROP POLICY IF EXISTS "允许插入留言" ON messages;
DROP POLICY IF EXISTS "允许删除自己的留言" ON messages;
DROP POLICY IF EXISTS "允许所有人读取点赞" ON message_likes;
DROP POLICY IF EXISTS "允许登录用户点赞" ON message_likes;
DROP POLICY IF EXISTS "允许游客点赞" ON message_likes;
DROP POLICY IF EXISTS "允许用户取消点赞" ON message_likes;
DROP POLICY IF EXISTS "允许点赞" ON message_likes;
DROP POLICY IF EXISTS "允许取消点赞" ON message_likes;
DROP POLICY IF EXISTS "允许所有人读取回复" ON message_replies;
DROP POLICY IF EXISTS "允许登录用户插入回复" ON message_replies;
DROP POLICY IF EXISTS "允许游客插入回复" ON message_replies;
DROP POLICY IF EXISTS "允许用户删除自己的回复" ON message_replies;
DROP POLICY IF EXISTS "允许插入回复" ON message_replies;
DROP POLICY IF EXISTS "允许删除自己的回复" ON message_replies;

-- 2. 确保启用 RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_replies ENABLE ROW LEVEL SECURITY;

-- 3. 重新创建策略

-- messages 表策略
-- 允许所有人（包括匿名用户）读取留言
CREATE POLICY "允许所有人读取留言"
    ON messages FOR SELECT
    USING (true);

-- 允许登录用户或游客插入留言
CREATE POLICY "允许插入留言"
    ON messages FOR INSERT
    WITH CHECK (
        (auth.uid()::text = user_id) OR (is_guest = true AND user_id IS NULL)
    );

-- 允许用户删除自己的留言
CREATE POLICY "允许删除自己的留言"
    ON messages FOR DELETE
    USING (
        (auth.uid()::text = user_id) OR (is_guest = true)
    );

-- message_likes 表策略
-- 允许所有人读取点赞记录
CREATE POLICY "允许所有人读取点赞"
    ON message_likes FOR SELECT
    USING (true);

-- 允许登录用户或游客点赞
CREATE POLICY "允许点赞"
    ON message_likes FOR INSERT
    WITH CHECK (
        (auth.uid()::text = user_id) OR (is_guest_liker = true)
    );

-- 允许任何人取消自己的点赞
CREATE POLICY "允许取消点赞"
    ON message_likes FOR DELETE
    USING (true);

-- message_replies 表策略
-- 允许所有人读取回复
CREATE POLICY "允许所有人读取回复"
    ON message_replies FOR SELECT
    USING (true);

-- 允许登录用户或游客插入回复
CREATE POLICY "允许插入回复"
    ON message_replies FOR INSERT
    WITH CHECK (
        (auth.uid()::text = COALESCE(user_id::text, '')) OR (is_guest = true AND user_id IS NULL)
    );

-- 允许用户删除自己的回复
CREATE POLICY "允许删除自己的回复"
    ON message_replies FOR DELETE
    USING (
        (auth.uid()::text = COALESCE(user_id::text, '')) OR (is_guest = true)
    );

-- 4. 验证数据
SELECT 'messages 表记录数：' as 检查项, COUNT(*) as 数量 FROM messages
UNION ALL
SELECT 'message_replies 表记录数：', COUNT(*) FROM message_replies
UNION ALL
SELECT 'message_likes 表记录数：', COUNT(*) FROM message_likes;
