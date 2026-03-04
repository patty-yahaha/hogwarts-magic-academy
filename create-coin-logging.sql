-- ============================================
-- 创建金币变动日志表
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 创建金币变动日志表
CREATE TABLE IF NOT EXISTS coin_transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES player_profiles(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL,  -- 'earn', 'spend', 'init', 'sync', 'fix'
    amount INTEGER NOT NULL,
    coins_before INTEGER NOT NULL,
    coins_after INTEGER NOT NULL,
    cumulative_before INTEGER NOT NULL,
    cumulative_after INTEGER NOT NULL,
    description TEXT,
    page_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引加速查询
CREATE INDEX IF NOT EXISTS idx_coin_transactions_user_id
ON coin_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_coin_transactions_created_at
ON coin_transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_coin_transactions_type
ON coin_transactions(transaction_type);

-- 添加注释
COMMENT ON TABLE coin_transactions IS '金币变动日志表，用于追踪所有金币变化';
COMMENT ON COLUMN coin_transactions.transaction_type IS '交易类型: earn(获得), spend(消费), init(初始化), sync(同步), fix(修复)';
COMMENT ON COLUMN coin_transactions.amount IS '变动数量，正数为获得，负数为消费';
COMMENT ON COLUMN coin_transactions.page_name IS '发生变动的页面路径';
