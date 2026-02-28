# 🧙 霍格沃茨魔法学院 - Supabase 设置指南

## 📋 快速开始（5分钟完成）

### 步骤 1：注册 Supabase 账号

1. 访问 https://supabase.com
2. 点击 **"Start your project"** 或 **"Sign Up"**
3. 使用 **GitHub** 或 **Email** 注册（推荐使用 GitHub，一键登录）
4. 注册成功后会自动跳转到 Dashboard

### 步骤 2：创建新项目

1. 点击 **"New Project"** 按钮
2. 填写项目信息：
   - **Name**: `hogwarts-magic-academy`
   - **Database Password**: 设置一个强密码（请保存好！）
   - **Region**: 选择 `Southeast Asia (Singapore)` 离中国最近
3. 点击 **"Create new project"**
4. 等待 1-2 分钟，项目创建完成

### 步骤 3：获取 API 密钥

1. 项目创建后，会自动进入项目 Dashboard
2. 点击左侧菜单的 **"Project Settings"**（齿轮图标）
3. 选择 **"API"** 选项卡
4. 复制以下两个值：
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. 保存这两个值，稍后需要用到

### 步骤 4：执行数据库设置 SQL

1. 点击左侧菜单的 **"SQL Editor"**
2. 点击 **"New Query"**
3. 复制 `supabase/setup.sql` 文件的全部内容
4. 粘贴到 SQL Editor 中
5. 点击 **"Run"** 按钮或按 `Ctrl+Enter`
6. 等待执行完成，应该显示 "Success"

### 步骤 5：配置项目 URL 和密钥

需要在以下 3 个文件中配置 API 密钥：

**1. 配置 login.html**
- 打开 `login.html` 文件
- 找到第 257-258 行：
  ```javascript
  const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
  const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
  ```
- 替换为你在步骤 3 获取的实际值：
  ```javascript
  const SUPABASE_URL = 'https://hogwarts-xxxxx.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  ```

**2. 配置 js/database.js**
- 打开 `js/database.js` 文件
- 找到第 12-13 行，进行相同的替换

**3. 配置 chat.html**
- 打开 `chat.html` 文件
- 找到第 394-395 行（在 script 标签内）：
  ```javascript
  const SUPABASE_CONFIG = {
      url: 'YOUR_SUPABASE_URL_HERE',
      key: 'YOUR_SUPABASE_ANON_KEY_HERE'
  };
  ```
- 进行相同的替换

### 步骤 6：配置行级安全策略（RLS）

1. 点击左侧菜单的 **"SQL Editor"**
2. 点击 **"New Query"**
3. 执行以下 SQL：

```sql
-- 确认触发器已创建
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- 确认表已启用 RLS
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'player_profiles',
    'owned_broomsticks',
    'inventory_items',
    'mailbox_letters',
    'chat_messages'
  );
```

4. 应该看到所有表的 `rowsecurity` 列都是 `true`

### 步骤 7：测试登录功能

1. 在浏览器中打开 `login.html`
2. 点击 **"注册"** 标签
3. 填写信息：
   - 邮箱：`test@example.com`
   - 昵称：`哈利波特`
   - 密码：`password123`
4. 点击 **"开始魔法之旅"**
5. 注册成功后会自动跳转到 `academy.html`

### 步骤 8：测试聊天功能

1. 在 `academy.html` 中点击聊天图标进入 `chat.html`
2. 你应该看到以下聊天室：
   - 🏰 大礼堂（所有玩家）
   - 🦁 格兰芬多公共休息室
   - 🐍 斯莱特林公共休息室
   - 🦅 拉文克劳公共休息室
   - 🦡 赫奇帕奇公共休息室
   - 🧹 魁地奇球场

3. 在输入框中输入消息并点击发送
4. 打开另一个浏览器或无痕窗口，用不同账号登录
5. 你可以看到两个窗口之间的消息实时同步！

---

## 🔧 高级配置

### 启用邮件验证（可选）

1. 在 Supabase Dashboard 中：
   - 进入 **Project Settings** → **Authentication**
   - 找到 **"Email Templates"**
   - 可以自定义验证邮件的内容

2. 启用邮箱验证：
   - 进入 **Authentication** → **Providers**
   - 确保 **Email** 提供商已启用
   - 在 **Settings** 中启用 **"Confirm email"**

### 配置自定义域名（可选）

如果你有自己的域名，可以配置：

1. 进入 **Project Settings** → **API**
2. 在 **"CORS"** 设置中添加你的域名：
   ```
   https://yourdomain.com
   ```
3. 在 **Authentication** → **URL Configuration** 中配置你的网站 URL

---

## 📊 数据库结构说明

### 核心表

| 表名 | 用途 |
|------|------|
| `player_profiles` | 用户基本资料（金币、等级、头像等） |
| `owned_broomsticks` | 拥有的飞天扫帚 |
| `inventory_items` | 背包物品 |
| `broom_fragments` | 碎片和兑换券 |
| `inventory_potions` | 药水库存 |
| `unlocked_frames` | 已解锁头像框 |
| `flying_records` | 飞行课记录 |
| `flying_affection` | 飞行好感度 |
| `unlocked_achievements` | 已解锁成就 |
| `mailbox_letters` | 邮件 |
| `daily_quest_progress` | 每日任务进度 |
| `weekly_quest_progress` | 每周任务进度 |
| `chat_messages` | 聊天消息 |
| `friendships` | 好友关系 |

### 排行榜视图

| 视图名 | 用途 |
|--------|------|
| `leaderboard_coins` | 金币排行榜 |
| `leaderboard_flying` | 飞行课排行榜 |

### 数据同步流程

```
┌─────────────┐
│   用户操作   │
└──────┬──────┘
       │
       ├─→ localStorage（本地，快速访问）
       │
       └─→ Supabase（云端，跨设备同步）
```

### 聊天系统架构

```
┌─────────────────────────────────────────┐
│          实时聊天架构                    │
├─────────────────────────────────────────┤
│  前端                  │
│    ├── 聊天界面 (chat.html)             │
│    ├── 快捷消息栏                       │
│    ├── 在线玩家列表                     │
│    └── 多聊天室支持                     │
│                                         │
│  Supabase Realtime                      │
│    ├── postgres_changes 订阅            │
│    ├── INSERT 事件监听                  │
│    └── 实时消息推送                     │
│                                         │
│  数据库                 │
│    └── chat_messages 表                 │
│        ├── sender_id                    │
│        ├── sender_nickname              │
│        ├── sender_avatar                │
│        ├── room_id                      │
│        ├── message                      │
│        └── sent_at                      │
└─────────────────────────────────────────┘
```

---

## 🚀 部署到生产环境

### 方案 A：使用 Supabase Hosting（推荐）

1. 将所有 HTML 文件上传到 Supabase Storage：
   ```
   npx supabase storage upload --public
   ```

2. 在 Supabase Dashboard 中：
   - 进入 **Project Settings** → **Storage**
   - 创建一个名为 `public` 的 bucket
   - 设置为公开访问
   - 上传所有文件

### 方案 B：使用 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 配置自定义域名（可选）

### 方案 C：使用你当前的静态网站托管

1. 确保在 HTML 文件中正确配置了 Supabase URL 和密钥
2. 上传文件到你的托管服务
3. 测试登录和数据同步功能

---

## ⚠️ 安全注意事项

### 1. 保护敏感信息

⚠️ **永远不要将 `service_role` 密钥提交到公开的代码库中！**

- 只使用 `anon/public` 密钥
- 这个密钥有行级安全策略（RLS）保护，相对安全

### 2. 配置 CORS

在 Supabase Dashboard 中：

**Project Settings** → **API** → **CORS**

添加允许的域名：
```
https://yourdomain.com
http://localhost:5500
```

### 3. 限制数据库操作

行级安全策略（RLS）已经配置，确保：
- 用户只能读写自己的数据
- 聊天消息所有人可读，但只能写自己的

---

## 🐛 故障排查

### 问题 1：登录后没有跳转

**检查**：
1. 浏览器控制台（F12）是否有错误
2. Supabase URL 和密钥是否正确
3. 网络连接是否正常

### 问题 2：数据没有保存

**检查**：
1. 数据库表是否创建成功
2. RLS 策略是否启用
3. 控制台是否有权限错误

### 问题 3：注册时提示 "User already registered"

**原因**：邮箱已经被注册过

**解决**：
1. 直接使用该邮箱登录
2. 或者使用不同的邮箱注册

---

## 📚 下一步

完成设置后：

1. ✅ 用户可以注册/登录
2. ✅ 金币、成就、背包等数据会保存到云端
3. ✅ 换设备后数据自动同步
4. ✅ 玩家可以实时聊天
5. ✅ 在线玩家列表
6. ✅ 多个聊天室（大礼堂、各学院休息室、魁地奇球场）

### 聊天系统功能

- **实时消息**: 使用 Supabase Realtime 实现即时通讯
- **多聊天室**: 6 个主题聊天室，玩家可以自由切换
- **在线状态**: 显示最近 5 分钟内活跃的玩家
- **快捷消息**: 预设常用短语，快速发送
- **消息历史**: 每个房间保存最近 50 条消息
- **双语支持**: 自动根据玩家语言设置显示内容
- **连接状态**: 实时显示与 Supabase 的连接状态

### 数据同步说明

当前已实现云端同步的数据：
- 用户资料（昵称、头像、金币、等级等）
- 拥有的飞天扫帚
- 背包物品
- 碎片和兑换券
- 药水库存
- 头像框
- 飞行记录
- 成就解锁记录
- 聊天消息

### 待集成功能

以下页面已创建但尚未集成 `HogwartsDatabase` API：
- `academy.html` - 需要使用 `savePlayerData()` 保存金币变更
- `flying-class.html` - 需要使用 `savePlayerData()` 保存飞行记录
- `broom-shop.html` - 需要使用 `savePlayerData()` 保存扫帚购买
- `inventory.html` - 需要使用 `loadPlayerData()` 加载数据

集成示例：
```javascript
// 替换原有的 localStorage 操作
// 原代码：
// localStorage.setItem('hogwartsCoins', newCoins.toString());

// 新代码：
await HogwartsDatabase.savePlayerData({
    profile: {
        ...HogwartsDatabase.getCurrentPlayerData().profile,
        coins: newCoins
    }
});
```

需要帮助？查看这些文件：
- `login.html` - 登录注册页面
- `js/database.js` - 数据同步层
- `chat.html` - 实时聊天系统
- `supabase/setup.sql` - 数据库结构
- `docs/SUPABASE_SETUP_GUIDE.md` - 本指南
