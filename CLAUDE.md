# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 在处理本仓库代码时提供指导。

---

## 项目概述

霍格沃茨魔法学院是一个以哈利·波特为主题的教育游戏网站，是一个多页面的 HTML/CSS/JavaScript 应用程序，使用 Supabase 作为后端进行云同步。

## 技术栈

- **前端**：纯 HTML5、CSS3、原生 JavaScript（无框架或构建工具）
- **后端**：Supabase（PostgreSQL 数据库 + 身份验证 + 实时功能）
- **数据持久化**：localStorage（本地存储）+ Supabase（云端同步）
- **字体**：Google Fonts（Cinzel、Cinzel Decorative、MedievalSharp）

---

## 架构

### 文件结构

```
hogwarts-magic-academy/
├── index.html              # 分院选择页面
├── login.html              # 登录/注册/访客模式
├── academy.html            # 主枢纽（玩家控制面板）
├── wizard-camp.html        # 巫师营地（原成就墙已移至个人资料页）
├── classes.html            # 课程选择菜单
├── profile.html            # 个人资料页（包含完整的成就徽章展示墙）
├── [class]-*.html          # 各课程页面（飞行课、魔药课等）
├── js/
│   ├── coin-manager.js     # 统一的加隆管理与云端同步
│   ├── database.js         # Supabase 数据库同步层
│   ├── player-sync.js      # 玩家数据同步
│   └── spell-effects.js    # 视觉法术效果（Canvas）
├── supabase/
│   └── setup.sql           # 数据库模式和 RLS 策略
├── docs/
│   ├── SUPABASE_SETUP_GUIDE.md
│   ├── Game-Rules-System.md
│   └── 游戏规则体系.md
└── [其他页面]              # 商店、排行榜等
```

### 核心系统

#### 1. 金币管理器 (js/coin-manager.js)
- 分别管理当前金币和累计金币
- 累计金币决定玩家等级（消费不会降低等级）
- 同步到 Supabase 的 `player_profiles` 表
- 主要 API：
  ```javascript
  CoinManager.addCoins(amount, source);  // 添加金币
  CoinManager.getCurrentCoins();        // 获取当前余额
  CoinManager.getCumulativeCoins();    // 获取终身收入
  CoinManager.syncNow();               // 强制云同步
  ```

#### 2. 数据库层 (js/database.js)
- `HogwartsDatabase` 类用于所有 Supabase 操作
- 处理身份验证、个人资料、背包、聊天
- 使用 Supabase 实时订阅功能实现实时聊天

#### 3. 教师好感度系统
- 存储在 `localStorage` 中，键名：`hogwarts_mentor_affection`
- 格式：`{ teacherId: affectionValue, ... }`
- 教师：hooch（霍琦夫人）、snape（斯内普教授）、lupin（卢平教授）、flitwick（弗立维教授）、mcgonagall（麦格教授）、trelawney（特里劳妮教授）、binns（宾斯教授）、sprout（斯普劳特教授）、dumbledore（邓布利多教授）
- 每门课程更新对应的教师好感度

#### 4. 能量系统
- 初始：60 点，最大：100 点
- 每分钟减少 1 点，闲置 15 分钟后停止减少
- 每天重置为 60 点
- 可在三把扫帚购买食物恢复

---

## 开发流程

### 运行应用程序
- 无需构建过程
- 直接在浏览器中打开 HTML 文件或使用本地服务器：
  ```bash
  # Python
  python -m http.server 5500

  # Node.js (如果有 npx)
  npx http-server -p 5500
  ```
- 登录页面：`login.html`
- 主枢纽：`academy.html`

### 修改页面
- 每个 HTML 文件都是自包含的，包含嵌入式 CSS 和 JavaScript
- 编辑你想要修改的页面的特定 HTML 文件
- 刷新浏览器查看更改

### 数据库更改
- 使用 Supabase 控制面板的 SQL 编辑器进行数据库修改
- 执行 `supabase/setup.sql` 中的 SQL 以重新创建表
- 主要表：`player_profiles`、`chat_messages`、`mailbox_letters` 等

---

## Supabase 配置

### 运行前需要的设置

在运行前，请在以下文件中配置 Supabase 凭据：
1. `login.html`（第 257-258 行）
2. `js/database.js`（第 12-13 行）
3. `js/coin-manager.js`（第 16-17 行）

替换占位符值：
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'eyJhbGc...';
```

### 行级安全策略 (RLS)
- 所有表都启用了 RLS
- 用户只能读写自己的数据
- 聊天消息对所有人可读，但只能由发送者写入

---

## 游戏规则参考

### 等级系统（基于累计金币）
- 新手：500 加隆
- 学徒：1,500 加隆
- 老手：3,000 加隆
- 专家：5,000 加隆
- 大师：10,000 加隆

### 课程奖励示例
- **飞行课**：每根柱子 +1-4 加隆（取决于速度），+0.2 好感度/柱
- **魔药课**：每 10 个配方（初级）+20 加隆
- **黑魔法防御术**：完成 3 轮 +30 加隆
- **咒语课**：每正确拼写一个咒语 +2 加隆

完整游戏规则请参阅 `课程规则详解.md`。

---

## 常见任务

### 添加新课程
1. 创建新的 HTML 文件（如 `arithmancy-class.html`）
2. 包含 CSS 文件：`styles.css`、`academy.css`
3. 初始化 CoinManager 并加载玩家数据
4. 实现包含好感度和金币奖励的游戏逻辑
5. 在 `classes.html` 网格中添加条目
6. 在 `课程规则详解.md` 中更新课程规则

### 修改金币奖励
1. 在课程 HTML 中找到奖励计算部分
2. 使用 `CoinManager.addCoins(amount, 'source')` 代替直接操作 localStorage
3. source 参数用于跟踪来源
4. CoinManager 会自动同步到云端

### 测试聊天功能
1. 在两个浏览器窗口中打开 `chat.html`
2. 使用不同的账户（或访客模式）
3. 消息应通过 Supabase 实时功能实时显示

---

## 未完成功能-待继续开发

### 成就系统与个人资料页问题

#### 1. 已完成的部分：
- **成就系统架构重构**：
  - 删除了独立的 wizard-achievements.html 页面
  - 所有成就功能统一整合到 profile.html 的"徽章展示墙"
  - 修改了 wizard-camp.html，去掉"巫师成就墙"按钮，改为2列布局
- **个人资料页升级**：添加了"徽章展示墙"按钮和完整的徽章展示界面
- **成就管理系统**：创建了 `achievementManager` 对象，包含完整的成就管理功能
- **动态徽章生成**：实现了徽章 SVG 生成（灰色/彩色两种状态）
- **成就通知动画**：添加了成就解锁时的通知动画效果
- **课程成就触发逻辑**：完成了所有8门课程的成就触发逻辑
  - 飞行课：飞行新手、无暇飞行、金色飞贼
  - 魔药课：坩埚初学者、魔药大师、精准配比
  - 黑魔法防御术课：守护神咒、呼神护卫、博格特克星
  - 咒语课：羽加迪姆、咒语连发、弗立维的骄傲
  - 占卜课：茶叶渣、水晶球、天目
  - 草药学课：园丁、避鬼高手、丰收季节
  - 魔法史课：编年史家、博闻强识、幽灵对话
  - 变形课：雏形、精准描绘、变形大师
- **profile.html 修复**：
  - 添加了完整的 `achievementManager` 定义
  - 添加了 `getTeacherName()` 函数
  - 确保徽章展示墙能正确加载和显示
  - 修复了 SVG 编码问题（使用 encodeURIComponent 替代 btoa）
  - 修复了 switchTab 函数的语法错误

#### 2. 未完成的部分：
- **世界语言课成就**：暂时搁置

#### 3. 文件备份信息：
- 所有课程页面已备份至 `versions/achievements_backup_20260318/` 目录
- 原 wizard-achievements.html 也在备份目录中

#### 4. 成就系统使用说明：
- 用户通过个人资料页（profile.html）的"徽章展示墙"按钮进入成就页面
- 所有成就的解锁、查看都统一在个人资料页中
- 各课程页面会自动触发成就解锁逻辑
- 成就通过 localStorage 的 `unlockedAchievements` 键存储

---

## 重要说明

- **无 npm/yarn**：本项目使用原生 JavaScript 搭配 Supabase CDN
- **双语**：所有 UI 文字均为中文（zh-CN）
- **访客模式**：用户可以不登录游玩（仅使用 localStorage）
- **云端同步**：已登录用户通过 Supabase 在设备间同步数据
- **能量需求**：课程需要 ≥10 能量点
- **响应式设计**：使用媒体查询实现移动端响应

---

## 调试提示

### 检查 Supabase 连接
打开浏览器控制台并查找：
```
CoinManager: 开始同步金币到云端 {userId: '...', currentCoins: ..., cumulativeCoins: ...}
```

### 强制金币同步
部分页面有一个调试 "同步金币" 按钮，会调用 `CoinManager.syncNow()`

### 查看 localStorage
控制台中输入：`localStorage` 查看所有存储的数据

### 重置访客数据
在控制台输入：`localStorage.clear()` 然后刷新页面

### 禁止项
请避免在响应中包含敏感信息（如明文密码）

---

## 踩坑记录

### 1. 成就系统架构重构
- **问题**：成就系统分散在 wizard-achievements.html 和 profile.html 两个页面，导致功能重复和用户体验不佳
- **解决方案**：统一成就功能到 profile.html 的"徽章展示墙"，删除单独的 wizard-achievements.html 页面
- **受影响文件**：
  - 删除：wizard-achievements.html
  - 修改：wizard-camp.html（去掉成就墙按钮）
  - 保留：profile.html（完整成就功能）

### 2. btoa 编码 SVG 字符问题
- **问题**：`btoa()` 函数无法编码包含中文字符和 emoji 的 SVG 字符串
- **错误信息**：`Uncaught InvalidCharacterError: Failed to execute 'btoa' on 'Window'`
- **解决方案**：使用 `encodeURIComponent()` 和 UTF-8 编码的 data URL 代替 base64 编码
- **受影响文件**：profile.html、transfiguration-class.html

### 3. 函数未定义错误
- **问题**：`switchTab` 函数未定义
- **错误信息**：`Uncaught ReferenceError: switchTab is not defined`
- **解决方案**：确保函数定义完整，包含闭合大括号 `}`
- **受影响文件**：profile.html

### 4. 语法错误导致页面功能异常
- **问题**：`Uncaught SyntaxError: Unexpected end of input`
- **解决方案**：检查 JavaScript 函数和代码块的完整性，确保所有括号正确匹配
- **受影响文件**：profile.html

---

## 任务执行记录

### 成就系统开发任务清单

#### ✅ 已完成
1. **个人资料页升级**：添加了"徽章展示墙"按钮和完整的徽章展示界面
2. **成就管理系统**：创建了 `achievementManager` 对象，包含完整的成就管理功能
3. **动态徽章生成**：实现了徽章 SVG 生成（灰色/彩色两种状态）
4. **成就通知动画**：添加了成就解锁时的通知动画效果
5. **课程成就触发逻辑**：完成了所有8门课程的成就触发逻辑
6. **wizard-achievements.html 修复**：
   - 清理了新旧代码混合的问题
   - 成就容器ID已统一为正确的格式
   - 确保 `renderAchievements()` 函数能正确调用 achievementManager
   - 添加了成就通知的CSS样式
7. **profile.html 修复**：
   - 添加了完整的 `achievementManager` 定义
   - 添加了 `getTeacherName()` 函数
   - 确保徽章展示墙能正确加载和显示
8. **btoa 编码问题修复**：解决了 SVG 中包含中文字符和 emoji 的编码问题

#### 🔄 进行中

#### ❌ 待开始
- **世界语言课成就**：暂时搁置
