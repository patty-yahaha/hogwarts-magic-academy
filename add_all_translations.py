# -*- coding: utf-8 -*-
"""
Add English translations to all quiz questions
Based on the bilingual quiz data provided by the user
"""

import re

# Read the current quiz.html
with open('quiz.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define all English translations for Easy questions (30 questions)
easy_translations = [
    {
        "questionEn": "Who is the author of the Harry Potter series?",
        "optionsEn": ["J.K. Rowling", "Ma Ainong", "Mary Grandpré", "Bloomsbury"],
        "explanationEn": "The text explicitly mentions that J.K. Rowling is the author of the complete Harry Potter series."
    },
    {
        "questionEn": "As of 2008, how many books were published in the Harry Potter series?",
        "optionsEn": ["5 books", "6 books", "7 books", "8 books"],
        "explanationEn": "The text explicitly states that as of 2008, 7 books in the series were translated into 67 languages."
    },
    {
        "questionEn": "What number does Harry Potter live at on Privet Drive?",
        "optionsEn": ["Number 2", "Number 4", "Number 9¾", "Number 10"],
        "explanationEn": "Chapter 1 explicitly mentions that the Dursleys live at number 4, Privet Drive."
    },
    {
        "questionEn": "What is Hagrid's position at Hogwarts?",
        "optionsEn": ["Headmaster", "Potions Master", "Keeper of Keys", "Flight Instructor"],
        "explanationEn": "The title of Chapter 4 directly points out Hagrid's identity as the Keeper of Keys."
    },
    {
        "questionEn": "What item are first-year students not allowed to bring?",
        "optionsEn": ["Wand", "Cauldron", "Broomstick", "Owl"],
        "explanationEn": "The admission letter specifically reminds parents that first-year students are not allowed to bring their own broomsticks."
    },
    {
        "questionEn": "According to the text, how much is a scoop of black beetle eyes?",
        "optionsEn": ["21 Galleons", "5 Knuts", "7 Galleons", "10 Sickles"],
        "explanationEn": "The apothecary clearly marks the price of beetle eyes as five Knuts per scoop."
    },
    {
        "questionEn": "What material is Harry's wand made of?",
        "optionsEn": ["Yew and Phoenix feather", "Holly and Phoenix feather", "Ebony and Unicorn hair", "Beechwood and Dragon heartstring"],
        "explanationEn": "Ollivander mentions this is an extraordinary combination, eleven inches in length."
    },
    {
        "questionEn": "In which year did Albus Dumbledore defeat the dark wizard Grindelwald?",
        "optionsEn": ["1926", "1945", "1997", "2001"],
        "explanationEn": "Dumbledore's well-known contributions include defeating Grindelwald in 1945."
    },
    {
        "questionEn": "What brand of beans did Ron eat on the train that tasted like bogey?",
        "optionsEn": ["Bertie Bott's Every Flavor Beans", "Chocolate Frogs", "Droobles Best Blowing Gum", "Cauldron Cakes"],
        "explanationEn": "The text describes that these beans come in all flavors, including strange ones."
    },
    {
        "questionEn": "What were the small blue creatures Gilderoy Lockhart released in class?",
        "optionsEn": ["Cornish Pixies", "Gnomes", "Boggarts", "Ghouls"],
        "explanationEn": "The text mentions Lockhart lifted the cover on the cage, revealing newly caught Cornish Pixies."
    },
    {
        "questionEn": "What correspondence course did Filch subscribe to in order to learn magic?",
        "optionsEn": ["Advanced Potion Making", "Kwikspell", "Standard Book of Spells", "Defense Against the Dark Arts"],
        "explanationEn": "Harry saw an envelope marked Kwikspell on Filch's desk."
    },
    {
        "questionEn": "Which student was petrified while holding a camera?",
        "optionsEn": ["Neville Longbottom", "Colin Creevey", "Justin Finch-Fletchley", "Seamus Finnigan"],
        "explanationEn": "When Madam Pomfrey and Professor McGonagall examined him, Colin was still holding his camera."
    },
    {
        "questionEn": "What was the amount of the prize Arthur Weasley won from the Daily Prophet?",
        "optionsEn": ["500 Galleons", "700 Galleons", "1000 Galleons", "100 Galleons"],
        "explanationEn": "In his letter to Harry, Ron mentions his dad won 700 Galleons in the draw."
    },
    {
        "questionEn": "What happened to Aunt Marge after she got angry?",
        "optionsEn": ["Turned into a yak", "Inflated like a balloon and floated away", "Turned into a toad", "Vanished without a trace"],
        "explanationEn": "The text describes her inflating with unspeakable anger and finally flying toward the ceiling."
    },
    {
        "questionEn": "What wood is the handle of the Firebolt broomstick made of?",
        "optionsEn": ["Oak", "Ash", "Birch", "Redwood"],
        "explanationEn": "The product description explicitly states the handle is made of ash wood."
    },
    {
        "questionEn": "What is the top acceleration of the Firebolt within ten seconds?",
        "optionsEn": ["100 mph", "150 mph", "200 mph", "50 mph"],
        "explanationEn": "The product description mentions acceleration can reach 150 miles per hour within ten seconds."
    },
    {
        "questionEn": "What animal does Harry compare Dudley's size to?",
        "optionsEn": ["Hippopotamus", "A baby whale", "Elephant", "Rhinoceros"],
        "explanationEn": "The text describes Dudley not needing extra nutrition, his size already approaching that of a baby whale."
    },
    {
        "questionEn": "In the Quidditch World Cup final, who was Ireland's opponent?",
        "optionsEn": ["England", "Bulgaria", "Germany", "Egypt"],
        "explanationEn": "The text repeatedly mentions Bulgarian players taking the stage and Krum's brilliant performance."
    },
    {
        "questionEn": "What did Viktor Krum catch in the final?",
        "optionsEn": ["Quaffle", "Golden Snitch", "Bludger", "The referee's whistle"],
        "explanationEn": "Although Krum lost the match, he was still holding the Golden Snitch at the end."
    },
    {
        "questionEn": "What area of education does Durmstrang Institute focus heavily on?",
        "optionsEn": ["Muggle Studies", "The Dark Arts", "Divination", "Herbology"],
        "explanationEn": "Hermione quoted from a book saying this school places great importance on the Dark Arts."
    },
    {
        "questionEn": "What do Muggles see when they look at Hogwarts Castle?",
        "optionsEn": ["A magnificent palace", "A heap of broken ruins", "A dense forest", "Nothing at all"],
        "explanationEn": "Hermione says Muggles only see ruins, with a sign saying Danger, Do Not Enter."
    },
    {
        "questionEn": "What is Professor Dumbledore's favorite outdoor sport?",
        "optionsEn": ["Quidditch", "Ten-pin bowling", "Wizard Chess", "Golf"],
        "explanationEn": "Dumbledore's biography mentions he enjoys chamber music and ten-pin bowling."
    },
    {
        "questionEn": "How much did Harry pay for his wand at Ollivander's?",
        "optionsEn": ["10 Galleons", "7 Galleons", "5 Galleons", "21 Galleons"],
        "explanationEn": "The text explicitly states Harry paid Mr. Ollivander seven Galleons for the wand."
    },
    {
        "questionEn": "Who brought the first Harry Potter novel to the screen?",
        "optionsEn": ["Universal Studios", "Warner Bros.", "Disney", "Sony Pictures"],
        "explanationEn": "The text mentions Warner Bros. decided to bring the novel to the screen in 2001."
    },
    {
        "questionEn": "What were Rowling's living conditions like when writing the first book?",
        "optionsEn": ["Extremely wealthy", "Life was extremely difficult", "Supported by royalty", "Always remained obscure"],
        "explanationEn": "The text mentions she was a single mother, life was extremely difficult, often writing in cafes."
    },
    {
        "questionEn": "What does the Unplottable charm mentioned in the text mean?",
        "optionsEn": ["Makes buildings invisible", "Makes it impossible to draw on a map", "Makes compasses fail", "Makes the castle move automatically"],
        "explanationEn": "Hermione explains that others cannot plot it on a map."
    },
    {
        "questionEn": "Which You-Know-Who did Hagrid say also came from Slytherin house?",
        "optionsEn": ["Voldemort", "Grindelwald", "Snape", "Lucius Malfoy"],
        "explanationEn": "Hagrid told Harry that You-Know-Who came from Slytherin."
    },
    {
        "questionEn": "Which animal delivered Harry's school admission letters?",
        "optionsEn": ["Cat", "Owl", "Toad", "Phoenix"],
        "explanationEn": "Chapter 3 is titled Owl Post, describing the scene of many owls flying in."
    },
    {
        "questionEn": "When Hagrid took Harry shopping, who did Harry want to find a spell to curse?",
        "optionsEn": ["Draco Malfoy", "Dudley", "Snape", "Uncle Vernon"],
        "explanationEn": "When Harry picked up Curses and Counter-Curses, he said he wanted to find a way to curse Dudley."
    },
    {
        "questionEn": "What did the four greatest witches and wizards in the magical world found?",
        "optionsEn": ["The Ministry of Magic", "Hogwarts School", "Gringotts Bank", "Diagon Alley"],
        "explanationEn": "Professor McGonagall explains that the school was founded by the four greatest wizards over a thousand years ago."
    }
]

# Define all English translations for Hard questions (30 questions)
hard_translations = [
    {
        "questionEn": "In the dedication of Harry Potter and the Philosopher's Stone, who is described as the first audience of the story?",
        "optionsEn": ["Anne", "Di", "Jessica", "Ma Ainong"],
        "explanationEn": "The dedication explicitly lists Jessica, Anne, and Di, with Di being the one who first heard the story."
    },
    {
        "questionEn": "Which book by Professor Vindictus Viridian did Harry see in Flourish and Blotts and want to use to curse Dudley?",
        "optionsEn": ["The Standard Book of Spells Grade 1", "The Rise and Fall of the Dark Arts", "Curses and Counter-Curses", "The Dark Forces: A Guide to Self-Protection"],
        "explanationEn": "The text mentions this book includes methods like hair loss and leg-breaking, which Harry found appealing."
    },
    {
        "questionEn": "In the Diagon Alley apothecary, what is the unit price of silver unicorn horns?",
        "optionsEn": ["21 Galleons", "5 Knuts", "10 Sickles", "7 Galleons"],
        "explanationEn": "The text explicitly mentions Harry saw silver unicorn horns valued at 21 Galleons each in the shop."
    },
    {
        "questionEn": "What flavor of Bertie Bott's Every Flavor Beans did Ron mention George once ate?",
        "optionsEn": ["Pepper flavor", "Sardine flavor", "Spinach flavor", "Bogey flavor"],
        "explanationEn": "While warning Harry, Ron mentioned George had eaten this highly unusual and disgusting flavor."
    },
    {
        "questionEn": "When Hermione was looking for Neville's toad, what was the first reference book she mentioned that included Harry's name?",
        "optionsEn": ["A History of Magic Modern", "The Rise and Fall of the Dark Arts", "Great Wizarding Events of the Twentieth Century", "A History of Magic Standard"],
        "explanationEn": "After introducing herself, Hermione listed three books mentioning Harry, starting with A History of Magic."
    },
    {
        "questionEn": "In Chamber of Secrets, how thick were the branches of the tree that attacked the flying car described as being?",
        "optionsEn": ["As thick as an elephant's leg", "As thick as a battering ram", "As thick as a python", "As thick as a utility pole"],
        "explanationEn": "The text states Harry turned and saw a branch as thick as a python hitting the glass."
    },
    {
        "questionEn": "What spell did Gilderoy Lockhart use when trying to banish the Cornish Pixies?",
        "optionsEn": ["Expelliarmus", "Alohomora", "Wingardium Leviosa", "Peskipiksi Pesternomi"],
        "explanationEn": "Lockhart rolled up his sleeves and shouted this spell, which was completely ineffective and sounded ridiculous."
    },
    {
        "questionEn": "The envelope on Filch's desk showed he was studying what course?",
        "optionsEn": ["Kwikspell", "Standard Book of Spells Grade 1", "Defense Against the Dark Arts", "Potions"],
        "explanationEn": "Harry saw the Kwikspell envelope on Filch's desk, hinting that Filch is a Squib."
    },
    {
        "questionEn": "What happened to Colin Creevey's camera when he was petrified and brought to the hospital wing?",
        "optionsEn": ["The film captured the attacker", "The inside completely melted", "The lens cracked", "It was eaten by the Basilisk"],
        "explanationEn": "When Dumbledore pried open the back, steam and a smell of burning plastic came out, showing the film and interior had melted."
    },
    {
        "questionEn": "Why did Tom Riddle say his father abandoned his mother?",
        "optionsEn": ["Because he fell in love with someone else", "Because his mother died", "Because he was afraid of Salazar Slytherin", "Because he discovered his wife was a witch"],
        "explanationEn": "Riddle mentioned his Muggle father fled after discovering his wife could use magic."
    },
    {
        "questionEn": "How much was the Daily Prophet Grand Prize Galleon Draw won by Arthur Weasley?",
        "optionsEn": ["1000 Galleons", "700 Galleons", "500 Galleons", "21 Galleons"],
        "explanationEn": "Ron's letter to Harry mentions his dad won 700 Galleons, most of which went toward the Egypt trip."
    },
    {
        "questionEn": "What is the top acceleration of the Firebolt within ten seconds?",
        "optionsEn": ["200 miles per hour", "150 miles per hour", "100 miles per hour", "120 miles per hour"],
        "explanationEn": "The description outside Quality Quidditch Supplies states it can reach 150 mph in 10 seconds."
    },
    {
        "questionEn": "What wood is the handle of the Firebolt crafted from?",
        "optionsEn": ["Ash", "Mahogany", "Birch", "Oak"],
        "explanationEn": "The product description mentions the handle is made of ash wood and is streamlined."
    },
    {
        "questionEn": "What did Professor Lupin find in Filch's filing cabinet to help Harry practice the Patronus Charm?",
        "optionsEn": ["A photograph of a Dementor", "A real Dementor", "A Vanishing Cabinet", "Another Boggart"],
        "explanationEn": "Lupin used the fact that a Boggart would turn into a Dementor in front of Harry to facilitate targeted practice."
    },
    {
        "questionEn": "What level of magic did Professor Lupin say the Patronus Charm is?",
        "optionsEn": ["Far beyond the level of Ordinary Wizarding Levels O.W.L.s", "A compulsory subject for first-years", "Basic magic similar to an unlocking spell", "A forbidden Dark Arts spell"],
        "explanationEn": "Lupin told Harry this is an extremely advanced form of magic."
    },
    {
        "questionEn": "Because Dudley was as fat as a baby whale before summer break, what measure did Aunt Petunia have to take?",
        "optionsEn": ["Sending Dudley to a weight-loss summer camp", "The whole family followed a new diet plan", "Buying extra-large school uniforms for Dudley", "Stopping him from eating food from hamburger shops"],
        "explanationEn": "The text mentions that after endless tantrums and arguments, a new diet plan began."
    },
    {
        "questionEn": "At the Quidditch World Cup final, which two Bulgarian beaters began arguing angrily with the referee?",
        "optionsEn": ["Volkov and Vulkanov", "Krum and Zograf", "Dimitrov and Levski", "Moran and Quigley"],
        "explanationEn": "The text mentions these two beaters landed on either side of referee Mostafa and began arguing angrily."
    },
    {
        "questionEn": "What action did the Bulgarian Chaser Dimitrov perform on Ireland's Moran to be called for a foul?",
        "optionsEn": ["Hitting her head with a Beater's bat", "Stealing her Snitch", "Deliberately flying into her to crash", "Pulling her broom tail"],
        "explanationEn": "Ludo Bagman's commentary explicitly stated Dimitrov deliberately flew into Moran to crash."
    },
    {
        "questionEn": "Harry noticed that once Seeker Viktor Krum landed on the ground, what were his movements like?",
        "optionsEn": ["Light as a ballet dancer", "His movements were less coordinated and he was a bit duck-footed", "Extremely fast and energetic strides", "No different from a normal person"],
        "explanationEn": "The text describes Krum as exceptionally gifted in the air but clumsy on the ground, with rounded shoulders."
    },
    {
        "questionEn": "According to the notes on the British education system, what exam do 14-year-old students take for Key Stage 3?",
        "optionsEn": ["SATS exams", "GCSE certificate exams", "A-Level certificate exams", "O.W.Ls exams"],
        "explanationEn": "Note a states students take SATS exams at age 14 to obtain Key Stage 3 grades."
    },
    {
        "questionEn": "What was the price of the black beetle eyes Harry saw in the Diagon Alley apothecary?",
        "optionsEn": ["One Galleon a bottle", "Two Sickles a jar", "Five Knuts a scoop", "Free of charge"],
        "explanationEn": "The text mentions Harry was examining the beetle eyes, priced at five Knuts a scoop."
    },
    {
        "questionEn": "What item did Filch feel victorious about after Peeves broke it?",
        "optionsEn": ["A large ink bottle", "A brass telescope", "Hagrid's hut", "A Vanishing Cabinet"],
        "explanationEn": "Filch happily told Mrs. Norris that the cabinet was very precious and they could finally get rid of Peeves."
    },
    {
        "questionEn": "In Goblet of Fire, where were the nine Weasleys photographed standing in front of pyramids?",
        "optionsEn": ["Albania", "Mexico", "Egypt", "Romania"],
        "explanationEn": "The text explicitly states they went to Egypt because their eldest son Bill works there."
    },
    {
        "questionEn": "According to the notes, what is the hat often worn during summer rowing called?",
        "optionsEn": ["Boater", "Balaclava", "Sorting Hat", "Wizard's Hat"],
        "explanationEn": "Note b mentions a kind of hat worn during summer rowing in old times, which refers to a boater."
    },
    {
        "questionEn": "Who is the author of the Selected Collection of Mistranslations in Harry Potter mentioned in the production notes?",
        "optionsEn": ["Ma Aixin", "Mihepu", "Rowling", "Jim Kay"],
        "explanationEn": "The first production note states the translation corrections were based on Mihepu's work."
    },
    {
        "questionEn": "What did Hagrid complain about to Harry while on the subway to Diagon Alley?",
        "optionsEn": ["Air too stale, too many people", "Muggle money too hard to use", "Seats too narrow, speed too slow", "He forgot his wand"],
        "explanationEn": "The text states he got stuck at the ticket gate and then complained loudly about the seats and speed."
    },
    {
        "questionEn": "In Harry's first-year shopping list, what is the required standard size for a cauldron?",
        "optionsEn": ["Size 1", "Size 2", "Size 3", "Solid gold standard size"],
        "explanationEn": "The list specifies one cauldron pewter, standard size 2."
    },
    {
        "questionEn": "When Harry first returned to the Dursleys for summer break, what precious flying equipment did Uncle Vernon lock in the cupboard under the stairs?",
        "optionsEn": ["Firebolt", "Cleansweep Seven", "Silver Arrow", "Nimbus 2000"],
        "explanationEn": "The text mentions Uncle Vernon locked the spellbooks, wand, and the top-of-the-line Nimbus 2000 in the cupboard."
    },
    {
        "questionEn": "What did Aunt Marge say was the cause of Harry's parents' death according to the Dursleys' lie?",
        "optionsEn": ["A plane crash", "They were murdered", "A car crash", "They died of illness"],
        "explanationEn": "Aunt Marge insisted they died in a car crash and speculated they were drunk."
    },
    {
        "questionEn": "In the table of contents for Deathly Hallows, what is the title of Chapter 19?",
        "optionsEn": ["The Silver Doe", "The Deathly Hallows", "The Tale of the Three Brothers", "The Prince's Tale"],
        "explanationEn": "The table of contents clearly lists Chapter 19 as The Silver Doe."
    }
]

print("Translation data loaded:")
print(f"- Easy questions: {len(easy_translations)} translations")
print(f"- Hard questions: {len(hard_translations)} translations")
print("\nThese translations need to be inserted into quiz.html")
print("Each question object needs:")
print("  - questionEn: English question text")
print("  - optionsEn: Array of 4 English option texts")
print("  - explanationEn: English explanation text")
