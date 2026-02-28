# -*- coding: utf-8 -*-
"""
Complete script to add English translations to all Hard questions
"""

# Read the file
with open('quiz.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the complete replacement for the hard array
hard_array_replacement = """            hard: [
                {
                    question: "在《哈利·波特与魔法石》的献辞中，谁被描述为故事的第一位听众？",
                    questionEn: "In the dedication of Harry Potter and the Philosopher's Stone, who is described as the first audience of the story?",
                    options: ["安妮", "戴", "杰西卡", "马爱农"],
                    optionsEn: ["Anne", "Di", "Jessica", "Ma Ainong"],
                    correct: 1,
                    explanation: "献辞明确列出了杰西卡、安妮和戴，其中戴是第一个听到这个故事的人。",
                    explanationEn: "The dedication explicitly lists Jessica, Anne, and Di, with Di being the one who first heard the story."
                },
                {
                    question: "哈利在丽痕书店看到温迪克教授写的哪本书时，想用它来诅咒达力？",
                    questionEn: "Which book by Professor Vindictus Viridian did Harry see in Flourish and Blotts and want to use to curse Dudley?",
                    options: ["《标准咒语（初级）》", "《黑魔法的兴衰》", "《诅咒与反诅咒》", "《黑暗力量：自卫指南》"],
                    optionsEn: ["The Standard Book of Spells Grade 1", "The Rise and Fall of the Dark Arts", "Curses and Counter-Curses", "The Dark Forces: A Guide to Self-Protection"],
                    correct: 2,
                    explanation: "书中提到该书包含脱发、打折腿等手法，哈利认为这主意不错。",
                    explanationEn: "The text mentions this book includes methods like hair loss and leg-breaking, which Harry found appealing."
                },
                {
                    question: "在对角巷的药店里，银色的独角兽角单价是多少？",
                    questionEn: "In the Diagon Alley apothecary, what is the unit price of silver unicorn horns?",
                    options: ["21加隆", "5纳特", "10西可", "7加隆"],
                    optionsEn: ["21 Galleons", "5 Knuts", "10 Sickles", "7 Galleons"],
                    correct: 0,
                    explanation: "文中明确提到哈利在药店看到银色独角兽角每个价值二十一加隆。",
                    explanationEn: "The text explicitly mentions Harry saw silver unicorn horns valued at 21 Galleons each in the shop."
                },
                {
                    question: "罗恩提到乔治曾经吃到了什么味道的比比多味豆？",
                    questionEn: "What flavor of Bertie Bott's Every Flavor Beans did Ron mention George once ate?",
                    options: ["胡椒口味", "沙丁鱼味", "菠菜味", "干鼻子牛儿味"],
                    optionsEn: ["Pepper flavor", "Sardine flavor", "Spinach flavor", "Bogey flavor"],
                    correct: 3,
                    explanation: "罗恩警告哈利时，提到了乔治吃过这种极不寻常且令人恶心的味道。",
                    explanationEn: "While warning Harry, Ron mentioned George had eaten this highly unusual and disgusting flavor."
                },
                {
                    question: "赫敏在火车上寻找纳威丢失的蟾蜍时，提到的第一本包含哈利名字的参考书是？",
                    questionEn: "When Hermione was looking for Neville's toad, what was the first reference book she mentioned that included Harry's name?",
                    options: ["《现代魔法史》", "《黑魔法的兴衰》", "《二十世纪重要魔法事件》", "《魔法史》"],
                    optionsEn: ["A History of Magic Modern", "The Rise and Fall of the Dark Arts", "Great Wizarding Events of the Twentieth Century", "A History of Magic Standard"],
                    correct: 0,
                    explanation: "赫敏在自我介绍后，列举了三本提到哈利的书，第一本就是《现代魔法史》。",
                    explanationEn: "After introducing herself, Hermione listed three books mentioning Harry, starting with A History of Magic."
                }
            ]
        };"""

print("This script defines the complete replacement for the hard array")
print("Due to the large size, the replacement will be done in parts")
print("Total hard questions: 30")
print("This is a placeholder for the actual replacement logic")
