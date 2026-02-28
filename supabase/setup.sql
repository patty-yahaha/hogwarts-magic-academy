-- 霍格沃茨魔法学院 - Supabase 数据库设置
-- 执行顺序：在 Supabase SQL Editor 中按顺序执行

-- ============================================
-- 1. 启用必要的扩展
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. 创建用户资料表
-- ============================================
CREATE TABLE player_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nickname VARCHAR(50) NOT NULL,
    avatar TEXT DEFAULT '🧙',
    coins INTEGER DEFAULT 100,
    cumulative_coins INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_nickname UNIQUE (nickname)
);

-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_player_profiles_updated_at
    BEFORE UPDATE ON player_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. 飞天扫帚系统
-- ============================================
CREATE TABLE owned_broomsticks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    broom_id TEXT NOT NULL,
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id, broom_id)
);

CREATE TABLE equipped_broomstick (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    broom_id TEXT NOT NULL
);

-- ============================================
-- 4. 背包和房间系统
-- ============================================
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    item_name_zh TEXT NOT NULL,
    item_name_en TEXT NOT NULL,
    icon TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE room_decorations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    decoration_id TEXT NOT NULL,
    decoration_name_zh TEXT NOT NULL,
    decoration_name_en TEXT NOT NULL,
    icon TEXT NOT NULL
);

CREATE TABLE room_placed_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    icon TEXT NOT NULL,
    x_position FLOAT NOT NULL,
    y_position FLOAT NOT NULL,
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. 游戏记录
-- ============================================
CREATE TABLE flying_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    pillars_passed INTEGER NOT NULL,
    coins_earned INTEGER NOT NULL,
    broom_used TEXT DEFAULT 'normal_broom',
    played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE flying_affection (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    affection_level INTEGER DEFAULT 0,
    poor_performance_count INTEGER DEFAULT 0,
    daily_play_time INTEGER DEFAULT 0,
    last_play_date DATE DEFAULT CURRENT_DATE
);

-- ============================================
-- 6. 成就系统
-- ============================================
CREATE TABLE unlocked_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reward_claimed BOOLEAN DEFAULT FALSE,
    UNIQUE(player_id, achievement_id)
);

CREATE TABLE achievement_rewards_granted (
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (player_id, achievement_id)
);

CREATE TABLE broom_fragments (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    fragments INTEGER DEFAULT 0,
    vouchers INTEGER DEFAULT 0
);

-- ============================================
-- 7. 道具库存
-- ============================================
CREATE TABLE inventory_potions (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    potions JSONB DEFAULT '{}'
);

CREATE TABLE unlocked_frames (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    frame_ids TEXT[] DEFAULT '{}'
);

-- ============================================
-- 8. 邮件系统
-- ============================================
CREATE TABLE mailbox_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    letter_type TEXT NOT NULL, -- ITEM, INVENTORY, REMEMBRALL, ANNOUNCEMENT, EVENT
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    body_zh TEXT NOT NULL,
    body_en TEXT NOT NULL,
    reward_data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    is_reward_claimed BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. 任务系统
-- ============================================
CREATE TABLE daily_quest_progress (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    quest_date DATE DEFAULT CURRENT_DATE,
    study_minutes INTEGER DEFAULT 0,
    flying_pillars INTEGER DEFAULT 0,
    potions_count INTEGER DEFAULT 0,
    quiz_count INTEGER DEFAULT 0,
    completed_quests TEXT[] DEFAULT '{}',
    UNIQUE(player_id, quest_date)
);

CREATE TABLE weekly_quest_progress (
    player_id UUID PRIMARY KEY REFERENCES player_profiles(id) ON DELETE CASCADE,
    week_start_date DATE DEFAULT CURRENT_DATE,
    study_minutes INTEGER DEFAULT 0,
    flying_pillars INTEGER DEFAULT 0,
    perfect_quiz_count INTEGER DEFAULT 0,
    completed_quests TEXT[] DEFAULT '{}',
    UNIQUE(player_id, week_start_date)
);

-- ============================================
-- 10. 聊天系统
-- ============================================
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    sender_nickname VARCHAR(50) NOT NULL,
    room_id TEXT DEFAULT 'general',
    message TEXT NOT NULL,
    message_type TEXT DEFAULT 'text',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. 好友系统
-- ============================================
CREATE TABLE friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id, friend_id),
    CONSTRAINT check_no_self_friendship CHECK (player_id != friend_id)
);

-- ============================================
-- 12. 排行榜视图
-- ============================================
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
ORDER BY cumulative_coins DESC
LIMIT 100;

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
ORDER BY best_score DESC
LIMIT 100;

-- ============================================
-- 13. 创建索引以提升性能
-- ============================================
CREATE INDEX idx_flying_records_player ON flying_records(player_id, played_at DESC);
CREATE INDEX idx_flying_records_score ON flying_records(score DESC);
CREATE INDEX idx_chat_messages_room ON chat_messages(room_id, sent_at DESC);
CREATE INDEX idx_mailbox_player ON mailbox_letters(player_id, sent_at DESC);
CREATE INDEX idx_friendships_player ON friendships(player_id, status);
CREATE INDEX idx_daily_quests_player ON daily_quest_progress(player_id, quest_date);
CREATE INDEX idx_achievements_player ON unlocked_achievements(player_id, achievement_id);

-- ============================================
-- 14. 行级安全策略 (RLS)
-- ============================================
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE owned_broomsticks ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailbox_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- 用户只能读写自己的数据
CREATE POLICY "Users can view own profile" ON player_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON player_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own broomsticks" ON owned_broomsticks
    FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Users can insert own broomsticks" ON owned_broomsticks
    FOR INSERT WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Users can view own inventory" ON inventory_items
    FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Users can view own mailbox" ON mailbox_letters
    FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Users can update own mailbox" ON mailbox_letters
    FOR UPDATE USING (auth.uid() = player_id);

-- 聊天消息所有人可读，但只能插入自己的
CREATE POLICY "Anyone can view chat messages" ON chat_messages
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can send messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============================================
-- 15. 自动创建用户资料的触发器
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.player_profiles (id, nickname, coins)
    VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1), 100);

    INSERT INTO public.broom_fragments (player_id)
    VALUES (NEW.id);

    INSERT INTO public.flying_affection (player_id)
    VALUES (NEW.id);

    INSERT INTO public.inventory_potions (player_id)
    VALUES (NEW.id);

    INSERT INTO public.unlocked_frames (player_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 当用户在 auth.users 中创建时自动触发
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 完成！
-- ============================================
-- 现在数据库已经准备好了！
-- 接下来创建登录/注册页面...
