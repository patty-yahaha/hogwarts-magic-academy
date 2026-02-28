-- ============================================
-- 玩家数据云同步 - Supabase 数据库设置
-- ============================================
-- 在 Supabase SQL Editor 中执行此脚本

-- 1. 创建玩家数据表
CREATE TABLE IF NOT EXISTS player_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL, -- Supabase Auth 用户ID
    nickname TEXT NOT NULL,
    avatar TEXT DEFAULT '🧙',
    house TEXT DEFAULT 'Gryffindor', -- Gryffindor, Slytherin, Ravenclaw, Hufflepuff
    level INTEGER DEFAULT 1,
    exp INTEGER DEFAULT 0,
    galleons INTEGER DEFAULT 100, -- 金加隆
    energy INTEGER DEFAULT 100,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_energy_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 装饰品和收藏品 (JSON格式)
    decorations JSONB DEFAULT '{}'::jsonb,
    inventory JSONB DEFAULT '{}'::jsonb,
    room_theme TEXT DEFAULT 'default',

    -- 成就进度
    achievements JSONB DEFAULT '{}'::jsonb,
    completed_quests JSONB DEFAULT '{}'::jsonb,
    sent_mail_count INTEGER DEFAULT 0
);

-- 2. 创建索引
CREATE INDEX IF NOT EXISTS idx_player_profiles_user_id ON player_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_player_profiles_level ON player_profiles(level DESC);

-- 3. 创建更新时间戳触发器
CREATE OR REPLACE FUNCTION update_player_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER player_profiles_updated_at
    BEFORE UPDATE ON player_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_player_updated_at();

-- 4. 启用 Row Level Security
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;

-- 5. 创建 RLS 策略
-- 用户只能读取自己的数据
CREATE POLICY "用户可以读取自己的数据"
    ON player_profiles FOR SELECT
    USING (auth.uid() = user_id);

-- 用户可以插入自己的数据
CREATE POLICY "用户可以插入自己的数据"
    ON player_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的数据
CREATE POLICY "用户可以更新自己的数据"
    ON player_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- 6. 创建自动创建用户资料的触发器（当用户首次认证时）
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.player_profiles (user_id, nickname)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nickname', '魔法学徒')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 在 auth.users 表上创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- 完成！
SELECT '✅ 玩家数据云同步表创建成功！' AS status;
