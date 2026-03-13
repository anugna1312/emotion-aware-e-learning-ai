# Fix formatting issues in learning_engine.py

with open('learning_engine.py', 'r', encoding='utf-8') as file:
    content = file.read()

# Fix the trigonometry section formatting
content = content.replace(
    """5️⃣ **Applications of Trigonometry**

- **Height and distance problems**

Engineering

Physics

Navigation

Computer graphics**""",
    """5️⃣ **Applications of Trigonometry**

- **Height and distance problems**
- **Engineering**
- **Physics**
- **Navigation**
- **Computer graphics**"""
)

with open('learning_engine.py', 'w', encoding='utf-8') as file:
    file.write(content)

print("Fixed formatting issues in learning_engine.py")
