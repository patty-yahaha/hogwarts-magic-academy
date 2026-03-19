// 霍格沃茨魔法学院 - 成就数据定义
// 包含所有课程的成就和对应的徽章图标

const ACHIEVEMENTS_DATA = {
  // 飞行课 - 霍琦夫人
  flying: [
    {
      id: 'flying_novice',
      name: { zh: '飞行新手', en: 'Flying Novice' },
      desc: { zh: '连续10根柱子未碰到任何障碍', en: 'Fly through 10 consecutive pillars without hitting any obstacles' },
      badge: 'flying_novice',
      category: 'flying',
      teacher: 'hooch'
    },
    {
      id: 'flying_perfect',
      name: { zh: '无暇飞行', en: 'Flawless Flight' },
      desc: { zh: '连续20根柱子未碰到任何障碍', en: 'Fly through 20 consecutive pillars without hitting any obstacles' },
      badge: 'flying_perfect',
      category: 'flying',
      teacher: 'hooch'
    },
    {
      id: 'flying_golden_snitch',
      name: { zh: '金色飞贼', en: 'Golden Snitch' },
      desc: { zh: '连续50根柱子未碰到任何障碍', en: 'Fly through 50 consecutive pillars without hitting any obstacles' },
      badge: 'flying_golden_snitch',
      category: 'flying',
      teacher: 'hooch'
    }
  ],

  // 魔药课 - 斯内普教授
  potions: [
    {
      id: 'potions_beginner',
      name: { zh: '坩埚初学者', en: 'Cauldron Apprentice' },
      desc: { zh: '完成初级难度所有关卡', en: 'Complete all beginner difficulty levels' },
      badge: 'potions_beginner',
      category: 'potions',
      teacher: 'snape'
    },
    {
      id: 'potions_master',
      name: { zh: '魔药大师', en: 'Potion Master' },
      desc: { zh: '完成中级难度所有关卡', en: 'Complete all intermediate difficulty levels' },
      badge: 'potions_master',
      category: 'potions',
      teacher: 'snape'
    },
    {
      id: 'potions_perfect',
      name: { zh: '精准配比', en: 'Precision Brewing' },
      desc: { zh: '在任意一关中获得满分', en: 'Get a perfect score in any level' },
      badge: 'potions_perfect',
      category: 'potions',
      teacher: 'snape'
    }
  ],

  // 黑魔法防御术 - 卢平教授
  defense: [
    {
      id: 'defense_patronus_1',
      name: { zh: '守护神咒', en: 'Patronus Charm' },
      desc: { zh: '完美通过第一轮训练', en: 'Perfectly complete the first round of training' },
      badge: 'defense_patronus_1',
      category: 'defense',
      teacher: 'lupin'
    },
    {
      id: 'defense_patronus_3',
      name: { zh: '呼神护卫', en: 'Expecto Patronum' },
      desc: { zh: '完美通过全部三轮训练', en: 'Perfectly complete all three rounds of training' },
      badge: 'defense_patronus_3',
      category: 'defense',
      teacher: 'lupin'
    },
    {
      id: 'defense_boggart',
      name: { zh: '博格特克星', en: 'Boggart Buster' },
      desc: { zh: '在第三轮训练中连续击中5次', en: 'Hit 5 consecutive times in the third round of training' },
      badge: 'defense_boggart',
      category: 'defense',
      teacher: 'lupin'
    }
  ],

  // 咒语课 - 弗立维教授
  charms: [
    {
      id: 'charms_wingardium',
      name: { zh: '羽加迪姆', en: 'Wingardium Leviosa' },
      desc: { zh: '正确拼写第一个咒语', en: 'Correctly spell the first charm' },
      badge: 'charms_wingardium',
      category: 'charms',
      teacher: 'flitwick'
    },
    {
      id: 'charms_consecutive',
      name: { zh: '咒语连发', en: 'Charm Barrage' },
      desc: { zh: '连续正确拼写10个咒语', en: 'Spell 10 consecutive charms correctly' },
      badge: 'charms_consecutive',
      category: 'charms',
      teacher: 'flitwick'
    },
    {
      id: 'charms_pride',
      name: { zh: '弗立维的骄傲', en: 'Flitwick\'s Pride' },
      desc: { zh: '以全正确成绩完成一轮咒语拼写', en: 'Complete a round of charm spelling with all correct answers' },
      badge: 'charms_pride',
      category: 'charms',
      teacher: 'flitwick'
    }
  ],

  // 占卜课 - 特里劳妮教授
  divination: [
    {
      id: 'divination_tea',
      name: { zh: '茶叶渣', en: 'Tea Leaves' },
      desc: { zh: '第一次猜对预测结果', en: 'Guess the prediction correctly for the first time' },
      badge: 'divination_tea',
      category: 'divination',
      teacher: 'trelawney'
    },
    {
      id: 'divination_crystal',
      name: { zh: '水晶球', en: 'Crystal Ball' },
      desc: { zh: '连续猜对5题', en: 'Guess 5 consecutive questions correctly' },
      badge: 'divination_crystal',
      category: 'divination',
      teacher: 'trelawney'
    },
    {
      id: 'divination_clairvoyant',
      name: { zh: '天目', en: 'Clairvoyant' },
      desc: { zh: '在一轮预测中全对（10题全部正确）', en: 'Get all 10 questions correct in one round of predictions' },
      badge: 'divination_clairvoyant',
      category: 'divination',
      teacher: 'trelawney'
    }
  ],

  // 草药学 - 斯普劳特教授
  herbology: [
    {
      id: 'herbology_gardener',
      name: { zh: '园丁', en: 'Gardener' },
      desc: { zh: '累计收集100株曼德拉草', en: 'Collect 100 Mandrakes in total' },
      badge: 'herbology_gardener',
      category: 'herbology',
      teacher: 'sprout'
    },
    {
      id: 'herbology_ghost_avoider',
      name: { zh: '避鬼高手', en: 'Poltergeist Dodger' },
      desc: { zh: '在一关中从未点到皮皮鬼', en: 'Never click on Peeves in a level' },
      badge: 'herbology_ghost_avoider',
      category: 'herbology',
      teacher: 'sprout'
    },
    {
      id: 'herbology_harvest',
      name: { zh: '丰收季节', en: 'Harvest Season' },
      desc: { zh: '顺利通过所有关卡', en: 'Successfully complete all levels' },
      badge: 'herbology_harvest',
      category: 'herbology',
      teacher: 'sprout'
    }
  ],

  // 魔法史 - 宾斯教授
  history: [
    {
      id: 'history_chronicler',
      name: { zh: '编年史家', en: 'Chronicler' },
      desc: { zh: '坚持完成一局正确排序', en: 'Persist and complete a correct timeline arrangement' },
      badge: 'history_chronicler',
      category: 'history',
      teacher: 'binns'
    },
    {
      id: 'history_scholar',
      name: { zh: '博闻强识', en: 'Walking Encyclopedia' },
      desc: { zh: '无错误完成一局排序（一次性全部排对，无错误尝试）', en: 'Complete a timeline arrangement without any mistakes' },
      badge: 'history_scholar',
      category: 'history',
      teacher: 'binns'
    },
    {
      id: 'history_ghost_chat',
      name: { zh: '幽灵对话', en: 'Ghostly Conversation' },
      desc: { zh: '触发宾斯教授所有台词', en: 'Trigger all of Professor Binns\' dialogue lines' },
      badge: 'history_ghost_chat',
      category: 'history',
      teacher: 'binns'
    }
  ],

  // 变形课 - 麦格教授
  transfiguration: [
    {
      id: 'transfiguration_basic',
      name: { zh: '雏形', en: 'First Form' },
      desc: { zh: '通关基础模式', en: 'Complete the basic mode' },
      badge: 'transfiguration_basic',
      category: 'transfiguration',
      teacher: 'mcgonagall'
    },
    {
      id: 'transfiguration_precise',
      name: { zh: '精准描绘', en: 'Precise Drawing' },
      desc: { zh: '连续5次获得5星评价', en: 'Get 5-star ratings 5 consecutive times' },
      badge: 'transfiguration_precise',
      category: 'transfiguration',
      teacher: 'mcgonagall'
    },
    {
      id: 'transfiguration_master',
      name: { zh: '变形大师', en: 'Transfiguration Master' },
      desc: { zh: '通关移动火柴模式', en: 'Complete the moving matchstick mode' },
      badge: 'transfiguration_master',
      category: 'transfiguration',
      teacher: 'mcgonagall'
    }
  ],

  // 世界语言课 - 邓布利多教授
  language: [
    {
      id: 'language_top_student',
      name: { zh: '年级第一', en: 'Top Student' },
      desc: { zh: '以满分完成一次综合测验', en: 'Get a perfect score on a comprehensive test' },
      badge: 'language_top_student',
      category: 'language',
      teacher: 'dumbledore'
    },
    {
      id: 'language_dumbledore_encouragement',
      name: { zh: '邓布利多的鼓励', en: 'Dumbledore\'s Encouragement' },
      desc: { zh: '累计学习时长达到5小时', en: 'Accumulate 5 hours of study time' },
      badge: 'language_dumbledore_encouragement',
      category: 'language',
      teacher: 'dumbledore'
    },
    {
      id: 'language_phoenix_linguist',
      name: { zh: '凤凰社的语言学家', en: 'Phoenix Linguist' },
      desc: { zh: '累计学习时长达到10小时', en: 'Accumulate 10 hours of study time' },
      badge: 'language_phoenix_linguist',
      category: 'language',
      teacher: 'dumbledore'
    }
  ],

  // 全局成就（跨课程）
  global: [
    {
      id: 'global_jack_of_all_trades',
      name: { zh: '万事通', en: 'Jack of All Trades' },
      desc: { zh: '在9门课程中各获得至少一个成就', en: 'Earn at least one achievement in all 9 courses' },
      badge: 'global_jack_of_all_trades',
      category: 'global',
      teacher: 'all'
    },
    {
      id: 'global_teachers_pet',
      name: { zh: '教授们的宠儿', en: 'Teachers\' Pet' },
      desc: { zh: '累计解锁10个成就', en: 'Unlock 10 achievements in total' },
      badge: 'global_teachers_pet',
      category: 'global',
      teacher: 'all'
    },
    {
      id: 'global_hogwarts_scholar',
      name: { zh: '霍格沃茨学霸', en: 'Hogwarts Scholar' },
      desc: { zh: '累计解锁20个成就', en: 'Unlock 20 achievements in total' },
      badge: 'global_hogwarts_scholar',
      category: 'global',
      teacher: 'all'
    }
  ]
};

// 徽章图标定义 - 使用SVG数据URI以确保可访问性
const BADGE_ICONS = {
  // 飞行课徽章
  flying_novice: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffd700" stroke="%23ffed4e" stroke-width="3"/><path d="M50 30 L60 45 L50 60 L40 45 Z" fill="%23000" opacity="0.8"/><circle cx="50" cy="50" r="15" fill="%23fff"/></svg>`)},
    color: '#ffd700',
    lockedColor: '#888'
  },
  flying_perfect: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23c0c0c0" stroke="%23e8e8e8" stroke-width="3"/><path d="M50 30 L60 45 L50 60 L40 45 Z" fill="%23000" opacity="0.8"/><circle cx="50" cy="50" r="15" fill="%23fff"/><path d="M35 35 L45 45 M45 35 L35 45 M55 35 L65 45 M65 35 L55 45" stroke="%23000" stroke-width="2"/></svg>`)},
    color: '#c0c0c0',
    lockedColor: '#888'
  },
  flying_golden_snitch: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffd700" stroke="%23ffed4e" stroke-width="3"/><path d="M50 20 L65 35 L50 50 L35 35 Z" fill="%23ff0000"/><circle cx="50" cy="50" r="20" fill="%23ffd700"/><circle cx="50" cy="50" r="10" fill="%23ff0000"/></svg>`)},
    color: '#ffd700',
    lockedColor: '#888'
  },

  // 魔药课徽章
  potions_beginner: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%239b59b6" stroke="%23bb8fce" stroke-width="3"/><path d="M40 30 L60 30 L65 70 L35 70 Z" fill="%23fff"/><path d="M45 40 L55 40 L55 60 L45 60 Z" fill="%238e44ad"/></svg>`)},
    color: '#9b59b6',
    lockedColor: '#888'
  },
  potions_master: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%238e44ad" stroke="%23a569bd" stroke-width="3"/><path d="M40 30 L60 30 L65 70 L35 70 Z" fill="%23fff"/><path d="M45 40 L55 40 L55 60 L45 60 Z" fill="%239b59b6"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#8e44ad',
    lockedColor: '#888'
  },
  potions_perfect: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ff69b4" stroke="%23ffb6c1" stroke-width="3"/><path d="M40 30 L60 30 L65 70 L35 70 Z" fill="%23fff"/><path d="M45 40 L55 40 L55 60 L45 60 Z" fill="%23ff1493"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#ff69b4',
    lockedColor: '#888'
  },

  // 黑魔法防御术徽章
  defense_patronus_1: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%233498db" stroke="%236fa8dc" stroke-width="3"/><path d="M50 25 L60 40 L70 30 L65 45 L80 50 L65 55 L70 70 L60 60 L50 75 L40 60 L30 70 L35 55 L20 50 L35 45 L30 30 L40 40 Z" fill="%23fff"/></svg>`)},
    color: '#3498db',
    lockedColor: '#888'
  },
  defense_patronus_3: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%232980b9" stroke="%235499c7" stroke-width="3"/><path d="M50 20 L60 35 L70 25 L65 40 L80 45 L65 50 L70 65 L60 55 L50 70 L40 55 L30 65 L35 50 L20 45 L35 40 L30 25 L40 35 Z" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#2980b9',
    lockedColor: '#888'
  },
  defense_boggart: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%231abc9c" stroke="%2348c9b0" stroke-width="3"/><path d="M50 30 L55 40 L65 35 L60 45 L70 50 L60 55 L65 65 L55 60 L50 70 L45 60 L35 65 L40 55 L30 50 L40 45 L35 35 L45 40 Z" fill="%23fff"/><path d="M50 45 L55 50 L50 55 L45 50 Z" fill="%23000"/></svg>`)},
    color: '#1abc9c',
    lockedColor: '#888'
  },

  // 咒语课徽章
  charms_wingardium: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f39c12" stroke="%23f8b739" stroke-width="3"/><path d="M50 30 Q60 40 50 50 Q40 40 50 30" fill="%23fff"/><circle cx="50" cy="50" r="8" fill="%23000"/></svg>`)},
    color: '#f39c12',
    lockedColor: '#888'
  },
  charms_consecutive: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23e67e22" stroke="%23f0ad4e" stroke-width="3"/><path d="M50 30 Q60 40 50 50 Q40 40 50 30 M50 40 Q65 45 50 60 Q35 45 50 40" fill="%23fff"/><circle cx="50" cy="50" r="5" fill="%23000"/></svg>`)},
    color: '#e67e22',
    lockedColor: '#888'
  },
  charms_pride: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f39c12" stroke="%23f8b739" stroke-width="3"/><path d="M50 25 Q60 35 50 45 Q40 35 50 25 M50 35 Q65 40 50 55 Q35 40 50 35 M50 45 Q60 50 50 65 Q40 50 50 45" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#f39c12',
    lockedColor: '#888'
  },

  // 占卜课徽章
  divination_tea: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f1c40f" stroke="%23f7dc6f" stroke-width="3"/><path d="M50 30 Q60 40 50 60 Q40 40 50 30" fill="%23fff"/><path d="M45 35 L55 45 M45 45 L55 55 M45 55 L55 65" stroke="%23888" stroke-width="1"/></svg>`)},
    color: '#f1c40f',
    lockedColor: '#888'
  },
  divination_crystal: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%239b59b6" stroke="%23bb8fce" stroke-width="3"/><circle cx="50" cy="50" r="30" fill="%23fff" opacity="0.8"/><path d="M50 30 L50 70 M30 50 L70 50 M40 40 L60 60 M40 60 L60 40" stroke="%23888" stroke-width="1"/></svg>`)},
    color: '#9b59b6',
    lockedColor: '#888'
  },
  divination_clairvoyant: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffd700" stroke="%23ffed4e" stroke-width="3"/><circle cx="50" cy="50" r="30" fill="%23fff" opacity="0.8"/><path d="M50 30 L50 70 M30 50 L70 50 M40 40 L60 60 M40 60 L60 40" stroke="%23000" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="%23ff0000"/></svg>`)},
    color: '#ffd700',
    lockedColor: '#888'
  },

  // 草药学徽章
  herbology_gardener: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2327ae60" stroke="%2352c41a" stroke-width="3"/><path d="M50 30 L55 40 L60 35 L55 45 L70 50 L55 55 L60 65 L55 60 L50 70 L45 60 L40 65 L45 55 L30 50 L45 45 L40 35 L45 40 Z" fill="%23fff"/><path d="M50 30 L50 25 M50 70 L50 75" stroke="%23000" stroke-width="2"/></svg>`)},
    color: '#27ae60',
    lockedColor: '#888'
  },
  herbology_ghost_avoider: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2334495e" stroke="%235d6d7e" stroke-width="3"/><path d="M50 35 L55 45 L50 55 L45 45 Z" fill="%23fff"/><circle cx="50" cy="50" r="8" fill="%23fff"/><path d="M40 60 L60 60" stroke="%23fff" stroke-width="2"/></svg>`)},
    color: '#34495e',
    lockedColor: '#888'
  },
  herbology_harvest: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2327ae60" stroke="%2352c41a" stroke-width="3"/><path d="M50 30 L55 40 L60 35 L55 45 L70 50 L55 55 L60 65 L55 60 L50 70 L45 60 L40 65 L45 55 L30 50 L45 45 L40 35 L45 40 Z" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#27ae60',
    lockedColor: '#888'
  },

  // 魔法史徽章
  history_chronicler: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%237f8c8d" stroke="%2395a5a6" stroke-width="3"/><rect x="35" y="30" width="30" height="40" rx="3" fill="%23fff"/><path d="M40 35 L60 35 M40 40 L60 40 M40 45 L60 45 M40 50 L60 50" stroke="%23000" stroke-width="1"/></svg>`)},
    color: '#7f8c8d',
    lockedColor: '#888'
  },
  history_scholar: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2334495e" stroke="%235d6d7e" stroke-width="3"/><rect x="30" y="25" width="40" height="45" rx="3" fill="%23fff"/><path d="M35 30 L65 30 M35 35 L65 35 M35 40 L65 40 M35 45 L65 45 M35 50 L65 50 M35 55 L65 55" stroke="%23000" stroke-width="1"/><circle cx="50" cy="50" r="8" fill="%23ffd700"/></svg>`)},
    color: '#34495e',
    lockedColor: '#888'
  },
  history_ghost_chat: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2395a5a6" stroke="%23bdc3c7" stroke-width="3"/><path d="M50 25 L60 35 L55 45 L45 45 L40 35 Z" fill="%23fff"/><circle cx="50" cy="50" r="15" fill="%23fff" opacity="0.8"/><path d="M50 50 Q50 60 55 65 M50 50 Q60 55 65 60 M50 50 Q55 60 60 65" stroke="%23000" stroke-width="1"/></svg>`)},
    color: '#95a5a6',
    lockedColor: '#888'
  },

  // 变形课徽章
  transfiguration_basic: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%238e44ad" stroke="%23a569bd" stroke-width="3"/><path d="M50 30 L60 40 L50 50 L40 40 Z" fill="%23fff"/><circle cx="50" cy="50" r="8" fill="%23fff"/></svg>`)},
    color: '#8e44ad',
    lockedColor: '#888'
  },
  transfiguration_precise: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23c0392b" stroke="%23d9534f" stroke-width="3"/><path d="M50 30 L60 40 L50 50 L40 40 Z" fill="%23fff"/><circle cx="50" cy="50" r="8" fill="%23fff"/><path d="M45 35 L55 45 M45 45 L55 55 M45 55 L55 65" stroke="%23fff" stroke-width="2"/></svg>`)},
    color: '#c0392b',
    lockedColor: '#888'
  },
  transfiguration_master: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2316a085" stroke="%231abc9c" stroke-width="3"/><path d="M50 25 L60 35 L50 45 L40 35 Z" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23fff"/><path d="M40 40 L60 60 M40 60 L60 40" stroke="%23fff" stroke-width="2"/></svg>`)},
    color: '#16a085',
    lockedColor: '#888'
  },

  // 世界语言课徽章
  language_top_student: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f39c12" stroke="%23f8b739" stroke-width="3"/><path d="M50 30 L55 40 L65 45 L55 50 L60 60 L50 55 L40 60 L45 50 L35 45 L45 40 Z" fill="%23fff"/><circle cx="50" cy="50" r="8" fill="%23000"/></svg>`)},
    color: '#f39c12',
    lockedColor: '#888'
  },
  language_dumbledore_encouragement: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%232c3e50" stroke="%234a5568" stroke-width="3"/><path d="M50 30 L55 40 L65 35 L60 45 L70 50 L60 55 L65 65 L55 60 L50 70 L45 60 L35 65 L40 55 L30 50 L40 45 L35 35 L45 40 Z" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#2c3e50',
    lockedColor: '#888'
  },
  language_phoenix_linguist: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23e74c3c" stroke="%23ec7063" stroke-width="3"/><path d="M50 25 L60 35 L50 45 L40 35 Z" fill="%23fff"/><path d="M50 45 L55 55 L65 50 L60 60 L70 65 L60 70 L65 80 L55 75 L50 85 L45 75 L35 80 L40 70 L30 65 L40 60 L35 50 L45 55 Z" fill="%23fff"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/></svg>`)},
    color: '#e74c3c',
    lockedColor: '#888'
  },

  // 全局成就徽章
  global_jack_of_all_trades: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffd700" stroke="%23ffed4e" stroke-width="3"/><circle cx="50" cy="50" r="20" fill="%23fff"/><path d="M50 40 L55 45 L50 50 L45 45 Z" fill="%23000"/></svg>`)},
    color: '#ffd700',
    lockedColor: '#888'
  },
  global_teachers_pet: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23c0c0c0" stroke="%23e8e8e8" stroke-width="3"/><circle cx="50" cy="50" r="20" fill="%23ffd700"/><path d="M50 40 L55 45 L50 50 L45 45 Z" fill="%23000"/></svg>`)},
    color: '#c0c0c0',
    lockedColor: '#888'
  },
  global_hogwarts_scholar: {
    svg: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23ffd700" stroke="%23ffed4e" stroke-width="3"/><circle cx="50" cy="50" r="20" fill="%23c0c0c0"/><circle cx="50" cy="50" r="10" fill="%23ffd700"/><path d="M50 40 L55 45 L50 50 L45 45 Z" fill="%23000"/></svg>`)},
    color: '#ffd700',
    lockedColor: '#888'
  }
};

// 成就管理器
class AchievementManager {
  constructor() {
    this.achievements = ACHIEVEMENTS_DATA;
    this.badges = BADGE_ICONS;
    this.unlockedAchievements = this.loadUnlockedAchievements();
  }

  // 加载已解锁的成就
  loadUnlockedAchievements() {
    const saved = localStorage.getItem('hogwarts_unlocked_achievements');
    return saved ? JSON.parse(saved) : [];
  }

  // 保存已解锁的成就
  saveUnlockedAchievements() {
    localStorage.setItem('hogwarts_unlocked_achievements', JSON.stringify(this.unlockedAchievements));
  }

  // 检查成就是否已解锁
  isAchievementUnlocked(achievementId) {
    return this.unlockedAchievements.includes(achievementId);
  }

  // 解锁成就
  unlockAchievement(achievementId) {
    if (!this.isAchievementUnlocked(achievementId)) {
      this.unlockedAchievements.push(achievementId);
      this.saveUnlockedAchievements();
      this.showAchievementNotification(achievementId);
      return true;
    }
    return false;
  }

  // 显示成就解锁通知
  showAchievementNotification(achievementId) {
    const achievement = this.getAchievementById(achievementId);
    if (achievement) {
      const notification = document.createElement('div');
      notification.className = 'achievement-unlock-notification';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(193, 154, 107, 0.95));
        border: 3px solid #ffd700;
        border-radius: 15px;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 4.5s forwards;
        min-width: 300px;
        z-index: 10000;
      `;

      const badgeIcon = this.badges[achievement.badge];
      notification.innerHTML = `
        <img src="${badgeIcon.svg}" width="50" height="50" style="filter: ${this.isAchievementUnlocked(achievementId) ? 'brightness(1)' : 'grayscale(1)'}; border-radius: 50%;">
        <div>
          <div style="font-family: 'Cinzel', serif; font-size: 1rem; color: #2c1810; font-weight: bold;">🎉 成就解锁!</div>
          <div style="font-family: 'Cinzel', serif; font-size: 0.9rem; color: #5a4a3a;">${achievement.name.zh}</div>
          <div style="font-family: 'Cinzel', serif; font-size: 0.8rem; color: #8b7355;">${achievement.desc.zh}</div>
        </div>
      `;

      // 添加动画样式
      if (!document.getElementById('achievementAnimationStyles')) {
        const style = document.createElement('style');
        style.id = 'achievementAnimationStyles';
        style.textContent = `
          @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(notification);

      // 5秒后移除
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  }

  // 根据ID获取成就信息
  getAchievementById(achievementId) {
    for (const category in this.achievements) {
      const achievement = this.achievements[category].find(a => a.id === achievementId);
      if (achievement) {
        return achievement;
      }
    }
    return null;
  }

  // 获取指定类别的所有成就
  getAchievementsByCategory(category) {
    return this.achievements[category] || [];
  }

  // 获取所有成就
  getAllAchievements() {
    let allAchievements = [];
    for (const category in this.achievements) {
      allAchievements = [...allAchievements, ...this.achievements[category]];
    }
    return allAchievements;
  }

  // 获取徽章图标
  getBadge(badgeId, isUnlocked = false) {
    const badge = this.badges[badgeId];
    if (!badge) return null;

    return {
      svg: badge.svg,
      color: isUnlocked ? badge.color : badge.lockedColor
    };
  }

  // 获取已解锁的成就
  getUnlockedAchievements() {
    const unlocked = [];
    for (const category in this.achievements) {
      const categoryAchievements = this.achievements[category].filter(achievement =>
        this.isAchievementUnlocked(achievement.id)
      );
      unlocked.push(...categoryAchievements);
    }
    return unlocked;
  }

  // 获取锁定的成就
  getLockedAchievements() {
    const locked = [];
    for (const category in this.achievements) {
      const categoryAchievements = this.achievements[category].filter(achievement =>
        !this.isAchievementUnlocked(achievement.id)
      );
      locked.push(...categoryAchievements);
    }
    return locked;
  }

  // 检查并解锁所有符合条件的成就
  checkAndUnlockAchievements() {
    const allAchievements = this.getAllAchievements();
    const newUnlocks = [];

    // 这里可以根据游戏进度自动检查并解锁成就
    // 目前实现为手动调用 unlockAchievement 方法

    return newUnlocks;
  }
}

// 初始化成就管理器
const achievementManager = new AchievementManager();

// 导出供其他页面使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ACHIEVEMENTS_DATA,
    BADGE_ICONS,
    AchievementManager,
    achievementManager
  };
}
