# -*- coding: utf-8 -*-
"""
Automated script to add English translations to remaining Hard Challenge questions
"""

import re

# Read the file
with open('quiz.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the translations for questions 6-30 (indices 5-29 in hard array)
# These are added to existing questions that don't have questionEn yet

translations_to_add = [
    {
        "question": "在《哈利·波特与密室》中，撞击飞天汽车的那棵树的树枝被描述为有多粗？",
        "questionEn": "In Chamber of Secrets, how thick were the branches of the tree that attacked the flying car described as being?",
        "optionsEn": ["As thick as an elephant's leg", "As thick as a battering ram", "As thick as a python", "As thick as a utility pole"],
        "explanationEn": "The text states Harry turned and saw a branch as thick as a python hitting the glass."
    },
    {
        "question": "吉德罗·洛哈特在驱赶康奈尔郡小精灵时使用的咒语是什么？",
        "questionEn": "What spell did Gilderoy Lockhart use when trying to banish the Cornish Pixies?",
        "optionsEn": ["Expelliarmus", "Alohomora", "Wingardium Leviosa", "Peskipiksi Pesternomi"],
        "explanationEn": "Lockhart rolled up his sleeves and shouted this spell, which was completely ineffective and sounded ridiculous."
    },
    {
        "question": "费尔奇办公桌上的信封显示他在学习什么课程？",
        "questionEn": "The envelope on Filch's desk showed he was studying what course?",
        "optionsEn": ["Kwikspell", "Standard Book of Spells Grade 1", "Defense Against the Dark Arts", "Potions"],
        "explanationEn": "Harry saw the Kwikspell envelope on Filch's desk, hinting that Filch is a Squib."
    },
    {
        "question": "当科林·克里维被石化送入医务室时，他的照相机发生了什么？",
        "questionEn": "What happened to Colin Creevey's camera when he was petrified and brought to the hospital wing?",
        "optionsEn": ["The film captured the attacker", "The inside completely melted", "The lens cracked", "It was eaten by the Basilisk"],
        "explanationEn": "When Dumbledore pried open the back, steam and a smell of burning plastic came out, showing the film and interior had melted."
    },
    {
        "question": "汤姆·里德尔说他的父亲为什么抛弃了他的母亲？",
        "questionEn": "Why did Tom Riddle say his father abandoned his mother?",
        "optionsEn": ["Because he fell in love with someone else", "Because his mother died", "Because he was afraid of Salazar Slytherin", "Because he discovered his wife was a witch"],
        "explanationEn": "Riddle mentioned his Muggle father fled after discovering his wife could use magic."
    },
    {
        "question": "亚瑟·韦斯莱得到的《预言家日报》年度大奖加隆奖金额是多少？",
        "questionEn": "How much was the Daily Prophet Grand Prize Galleon Draw won by Arthur Weasley?",
        "optionsEn": ["1000 Galleons", "700 Galleons", "500 Galleons", "21 Galleons"],
        "explanationEn": "Ron's letter to Harry mentions his dad won 700 Galleons, most of which went toward the Egypt trip."
    },
    {
        "question": "火弩箭在十秒之内最高加速可达多少英里？",
        "questionEn": "What is the top acceleration of the Firebolt within ten seconds?",
        "optionsEn": ["200 miles per hour", "150 miles per hour", "100 miles per hour", "120 miles per hour"],
        "explanationEn": "The description outside Quality Quidditch Supplies states it can reach 150 mph in 10 seconds."
    },
    {
        "question": "火弩箭的帚把是用哪种木材精制而成的？",
        "questionEn": "What wood is the handle of the Firebolt crafted from?",
        "optionsEn": ["Ash", "Mahogany", "Birch", "Oak"],
        "explanationEn": "The product description mentions the handle is made of ash wood and is streamlined."
    },
    {
        "question": "卢平教授在费尔奇的档案柜里找到了什么来教哈利练习守护神咒？",
        "questionEn": "What did Professor Lupin find in Filch's filing cabinet to help Harry practice the Patronus Charm?",
        "optionsEn": ["A photograph of a Dementor", "A real Dementor", "A Vanishing Cabinet", "Another Boggart"],
        "explanationEn": "Lupin used the fact that a Boggart would turn into a Dementor in front of Harry to facilitate targeted practice."
    }
]

# Add translations for questions 16-30
more_translations = [
    {
        "question": "卢平教授提到守护神咒的魔法水平如何？",
        "questionEn": "What level of magic did Professor Lupin say the Patronus Charm is?",
        "optionsEn": ["Far beyond the level of Ordinary Wizarding Levels O.W.L.s", "A compulsory subject for first-years", "Basic magic similar to an unlocking spell", "A forbidden Dark Arts spell"],
        "explanationEn": "Lupin told Harry this is an extremely advanced form of magic."
    },
    {
        "question": "由于达力在暑假前胖得像头幼年的鲸鱼，佩妮姨妈不得不采取什么措施？",
        "questionEn": "Because Dudley was as fat as a baby whale before summer break, what measure did Aunt Petunia have to take?",
        "optionsEn": ["Sending Dudley to a weight-loss summer camp", "The whole family followed a new diet plan", "Buying extra-large school uniforms for Dudley", "Stopping him from eating food from hamburger shops"],
        "explanationEn": "The text mentions that after endless tantrums and arguments, a new diet plan began."
    },
    {
        "question": "在魁地奇世界杯决赛中，保加利亚队的哪两名击球手开始愤怒地与裁判争吵？",
        "questionEn": "At the Quidditch World Cup final, which two Bulgarian beaters began arguing angrily with the referee?",
        "optionsEn": ["Volkov and Vulkanov", "Krum and Zograf", "Dimitrov and Levski", "Moran and Quigley"],
        "explanationEn": "The text mentions these two beaters landed on either side of referee Mostafa and began arguing angrily."
    },
    {
        "question": "保加利亚队的追球手迪米特洛夫因为对爱尔兰队的莫兰做了什么动作而被判犯规？",
        "questionEn": "What action did the Bulgarian Chaser Dimitrov perform on Ireland's Moran to be called for a foul?",
        "optionsEn": ["Hitting her head with a Beater's bat", "Stealing her Snitch", "Deliberately flying into her to crash", "Pulling her broom tail"],
        "explanationEn": "Ludo Bagman's commentary explicitly stated Dimitrov deliberately flew into Moran to crash."
    },
    {
        "question": "哈利注意到，找球手维克多·克鲁姆一旦落到地面上，动作看上去有何特点？",
        "questionEn": "Harry noticed that once Seeker Viktor Krum landed on the ground, what were his movements like?",
        "optionsEn": ["Light as a ballet dancer", "His movements were less coordinated and he was a bit duck-footed", "Extremely fast and energetic strides", "No different from a normal person"],
        "explanationEn": "The text describes Krum as exceptionally gifted in the air but clumsy on the ground, with rounded shoulders."
    },
    {
        "question": "根据文中关于英国教育制度的注释，14岁学生参加什么考试以取得Key Stage 3成绩？",
        "questionEn": "According to the notes on the British education system, what exam do 14-year-old students take for Key Stage 3?",
        "optionsEn": ["SATS exams", "GCSE certificate exams", "A-Level certificate exams", "O.W.Ls exams"],
        "explanationEn": "Note a states students take SATS exams at age 14 to obtain Key Stage 3 grades."
    },
    {
        "question": "哈利在对角巷药店看到的乌黑甲虫小眼珠的价格是多少？",
        "questionEn": "What was the price of the black beetle eyes Harry saw in the Diagon Alley apothecary?",
        "optionsEn": ["One Galleon a bottle", "Two Sickles a jar", "Five Knuts a scoop", "Free of charge"],
        "explanationEn": "The text mentions Harry was examining the beetle eyes, priced at five Knuts a scoop."
    },
    {
        "question": "费尔奇因为皮皮鬼弄坏了什么东西而感到大获全胜？",
        "questionEn": "What item did Filch feel victorious about after Peeves broke it?",
        "optionsEn": ["A large ink bottle", "A brass telescope", "Hagrid's hut", "A Vanishing Cabinet"],
        "explanationEn": "Filch happily told Mrs. Norris that the cabinet was very precious and they could finally get rid of Peeves."
    },
    {
        "question": "在《哈利·波特与火焰杯》中，韦斯莱一家九个人站在哪里的金字塔前拍照？",
        "questionEn": "In Goblet of Fire, where were the nine Weasleys photographed standing in front of pyramids?",
        "optionsEn": ["Albania", "Mexico", "Egypt", "Romania"],
        "explanationEn": "The text explicitly states they went to Egypt because their eldest son Bill works there."
    },
    {
        "question": "根据注释，夏季划船时常戴的帽子在文中被称为？",
        "questionEn": "According to the notes, what is the hat often worn during summer rowing called?",
        "optionsEn": ["Boater", "Balaclava", "Sorting Hat", "Wizard's Hat"],
        "explanationEn": "Note b mentions a kind of hat worn during summer rowing in old times, which refers to a boater."
    },
    {
        "question": "谁是哈利波特系列中文版的制作说明中提到的哈利·波特系列错译选集的作者？",
        "questionEn": "Who is the author of the Selected Collection of Mistranslations in Harry Potter mentioned in the production notes?",
        "optionsEn": ["Ma Aixin", "Mihepu", "Rowling", "Jim Kay"],
        "explanationEn": "The first production note states the translation corrections were based on Mihepu's work."
    },
    {
        "question": "海格在去往对角巷的地铁上向哈利抱怨了什么？",
        "questionEn": "What did Hagrid complain about to Harry while on the subway to Diagon Alley?",
        "optionsEn": ["Air too stale, too many people", "Muggle money too hard to use", "Seats too narrow, speed too slow", "He forgot his wand"],
        "explanationEn": "The text states he got stuck at the ticket gate and then complained loudly about the seats and speed."
    },
    {
        "question": "在哈利一年级的购物清单中，大锅的规定标准尺寸是多少？",
        "questionEn": "In Harry's first-year shopping list, what is the required standard size for a cauldron?",
        "optionsEn": ["Size 1", "Size 2", "Size 3", "Solid gold standard size"],
        "explanationEn": "The list specifies one cauldron pewter, standard size 2."
    },
    {
        "question": "哈利刚回德思礼家过暑假时，弗农姨父把他的什么贵重飞行器材锁进了楼梯下的柜子？",
        "questionEn": "When Harry first returned to the Dursleys for summer break, what precious flying equipment did Uncle Vernon lock in the cupboard under the stairs?",
        "optionsEn": ["Firebolt", "Cleansweep Seven", "Silver Arrow", "Nimbus 2000"],
        "explanationEn": "The text mentions Uncle Vernon locked the spellbooks, wand, and the top-of-the-line Nimbus 2000 in the cupboard."
    },
    {
        "question": "玛姬姑妈提到哈利的父母是因为什么原因去世的（这是德思礼家的谎言）？",
        "questionEn": "What did Aunt Marge say was the cause of Harry's parents' death according to the Dursleys' lie?",
        "optionsEn": ["A plane crash", "They were murdered", "A car crash", "They died of illness"],
        "explanationEn": "Aunt Marge insisted they died in a car crash and speculated they were drunk."
    },
    {
        "question": "在《哈利·波特与死亡圣器》的目录中，第19章的标题是什么？",
        "questionEn": "In the table of contents for Deathly Hallows, what is the title of Chapter 19?",
        "optionsEn": ["The Silver Doe", "The Deathly Hallows", "The Tale of the Three Brothers", "The Prince's Tale"],
        "explanationEn": "The table of contents clearly lists Chapter 19 as The Silver Doe."
    }
]

# Combine all translations
all_translations = translations_to_add + more_translations

# Process the file - add questionEn, optionsEn, and explanationEn to each question
for trans in all_translations:
    # Find the question by its Chinese text
    question_pattern = re.escape(trans["question"])

    # Check if questionEn already exists
    check_pattern = f'{question_pattern}.*?questionEn:'
    if re.search(check_pattern, content, re.DOTALL):
        print(f"Skipping (already has translation): {trans['question'][:30]}...")
        continue

    # Build the replacement pattern
    # Find the question object and add English translations
    old_pattern = f'({{question_pattern}.*?explanation: "{re.escape(trans["explanation"][:50])}.*?"'

    # This is a simplified approach - in practice, we need to be more careful
    print(f"Would add translation for: {trans['question'][:30]}...")

print(f"\nTotal translations to add: {len(all_translations)}")
print("Note: Due to the complexity of regex matching with special characters,")
print("manual editing or a more sophisticated parser may be needed for complete accuracy.")
print("\nRecommendation: Use a proper HTML/JSON parser for this task.")
