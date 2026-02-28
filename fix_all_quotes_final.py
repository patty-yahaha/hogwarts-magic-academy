# -*- coding: utf-8 -*-

# Read the file
with open('quiz.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Get a sample line with Chinese quotes
sample = 'question: "罗恩在火车上吃到的"带干鼻子牛儿味"的豆子是什么品牌的？",'

# Extract the quote characters from the sample
left_quote = sample[10]  # The " after "question:
right_quote = sample[22]  # The " after "到的"

print(f'Left quote char: {repr(left_quote)} U+{ord(left_quote):04X}')
print(f'Right quote char: {repr(right_quote)} U+{ord(right_quote):04X}')

# Count before
count_before = content.count(left_quote)
print(f'Before: {count_before} left quotes')

# Replace
content = content.replace(left_quote, '"')
content = content.replace(right_quote, '"')

# Count after
count_after = content.count(left_quote)
print(f'After: {count_after} left quotes')

# Save
with open('quiz.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print('Saved!')
