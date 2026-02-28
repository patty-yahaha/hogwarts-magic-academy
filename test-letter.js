// 测试邮件生成 - 在浏览器控制台运行此代码
(function() {
    // 获取当前语言
    const currentLang = localStorage.getItem('siteLanguage') || 'zh';

    // 房间装饰品列表
    const ROOM_DECORATIONS = [
        { id: 'magic_lamp', icon: '🪔', nameZh: '魔法油灯', nameEn: 'Magic Lamp' },
        { id: 'crystal_ball', icon: '🔮', nameZh: '水晶球摆件', nameEn: 'Crystal Ball Decor' },
        { id: 'owl_feather', icon: '🪶', nameZh: '猫头鹰羽毛', nameEn: 'Owl Feather' },
        { id: 'golden_snitch', icon: '🥎', nameZh: '金色飞贼模型', nameEn: 'Golden Snitch Model' },
        { id: 'spell_book', icon: '📕', nameZh: '古老咒语书', nameEn: 'Ancient Spell Book' },
        { id: 'potion_bottle', icon: '🧪', nameZh: '彩色魔药瓶', nameEn: 'Colored Potion Bottle' },
        { id: 'magic_wand_display', icon: '🪄', nameZh: '魔杖展示架', nameEn: 'Wand Display' },
        { id: 'house_banner', icon: '🚩', nameZh: '学院旗帜', nameEn: 'House Banner' },
        { id: 'remembrall', icon: '🔴', nameZh: '记忆球', nameEn: 'Remembrall' }
    ];

    // 随机选择一个装饰品
    const decoration = ROOM_DECORATIONS[Math.floor(Math.random() * ROOM_DECORATIONS.length)];

    // 创建邮件
    const letter = {
        id: 'test_letter_' + Date.now(),
        type: 'ITEM',
        title: {
            zh: `🎁 测试礼物 - ${decoration.nameZh}`,
            en: `🎁 Test Gift - ${decoration.nameEn}`
        },
        body: {
            zh: `亲爱的同学，\n\n这是一封测试邮件，用于测试新的房间装饰功能！\n\n你收到了：${decoration.nameZh}\n\n领取后，它会出现在你的房间中，可以随意拖动装饰你的房间！\n\n霍格沃茨猫头鹰邮局 测试部`,
            en: `Dear Student,\n\nThis is a test letter for the new room decoration feature!\n\nYou received: ${decoration.nameEn}\n\nAfter claiming, it will appear in your room and you can drag it around!\n\nHogwarts Owl Post Test Department`
        },
        date: new Date().toISOString(),
        read: false,
        reward: {
            type: 'decoration',
            item: decoration
        }
    };

    // 获取现有邮件
    let letters = JSON.parse(localStorage.getItem('hogwartsLetters') || '[]');

    // 添加新邮件到最前面
    letters.unshift(letter);

    // 保存
    localStorage.setItem('hogwartsLetters', JSON.stringify(letters));

    console.log('✅ 测试邮件已生成！');
    console.log('礼品内容：', decoration);

    // 刷新页面以显示新邮件
    alert(`✅ 测试邮件已生成！\n\n礼品：${decoration.nameZh}\n${decoration.icon}\n\n页面将刷新以显示新邮件...`);
    location.reload();
})();
