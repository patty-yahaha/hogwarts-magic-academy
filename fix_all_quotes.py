# -*- coding: utf-8 -*-
with open('quiz.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define Chinese quote characters
left_double = '\u201c'  # "
right_double = '\u201d'  # "
left_single = '\u2018'  # '
right_single = '\u2019'  # '

# Count before
print('Before replacement:')
print(f'  Left double: {content.count(left_double)}')
print(f'  Right double: {content.count(right_double)}')
print(f'  Left single: {content.count(left_single)}')
print(f'  Right single: {content.count(right_single)}')

# Replace
content = content.replace(left_double, '"')
content = content.replace(right_double, '"')
content = content.replace(left_single, "'")
content = content.replace(right_single, "'")

# Save
with open('quiz.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print('File saved')
