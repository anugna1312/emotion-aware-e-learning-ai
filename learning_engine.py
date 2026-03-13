"""
Adaptive Learning Engine
Generates emotion-based learning responses for different topics.
"""

import random
from typing import Dict, List

class LearningEngine:
    """
    Generates adaptive learning content based on detected emotions.
    Implements the core logic for emotion-responsive education.
    """
    
    def __init__(self):
        # Learning content database for different topics and emotions
        self.learning_content = self._initialize_learning_content()
        
        # Response templates for each emotion
        self.response_templates = {
            'confused': [
                "I see you might be feeling confused. Let me explain this in a simpler way.",
                "It looks like this concept needs clarification. Here's a basic explanation:",
                "Don't worry if you're confused! Let's break this down step by step:",
                "I can help you understand this better. Here's a simple explanation:"
            ],
            'frustrated': [
                "I understand you might be feeling frustrated. You've got this! Let's try a different approach:",
                "Don't give up! Learning can be challenging. Here's some encouragement and guidance:",
                "I can see you're struggling. That's completely normal! Let's work through this together:",
                "Frustration is part of learning! Stay positive and let's tackle this step by step:"
            ],
            'bored': [
                "Feeling a bit bored? Let's make this more interesting with a quick quiz!",
                "I notice you might be losing interest. How about we test your knowledge with a fun quiz?",
                "Let's spice things up! Here's a quick quiz to keep you engaged:",
                "Time for a change of pace! Let's test what you've learned so far:"
            ],
            'happy': [
                "Great to see you're enjoying this! Let's dive into some more challenging content:",
                "You're in a good mood! Perfect time to explore some advanced concepts:",
                "Since you're feeling positive, let's push your understanding a bit further:",
                "Your enthusiasm is wonderful! Here's some moderately challenging material:"
            ],
            'engaged': [
                "You're clearly engaged and ready to learn! Let's explore some advanced concepts:",
                "Excellent focus! Since you're so engaged, here's some detailed, advanced content:",
                "Your engagement is impressive! Let's dive deep into this topic:",
                "Perfect! You're ready for some advanced-level detailed explanations:"
            ]
        }
    
    def generate_response(self, topic: str, emotion: str) -> str:
        """
        Generates an adaptive learning response based on topic and emotion.
        """
        emotion = emotion.lower()
        topic_lower = topic.lower()
        
        # Emotion-based learning responses following the chart
        responses = {
            'confused': f"""I see you're feeling confused about {topic}. Let me explain this in a simpler way.

**📚 Understanding {topic.title()} - Simple Explanation:**

{self._get_topic_explanation(topic, 'confused')}

**🎯 Step-by-Step Learning:**
{self._get_topic_steps(topic, 'confused')}

**💡 Common Mistakes to Avoid:**
{self._get_topic_mistakes(topic, 'confused')}

**📝 Practice Exercise:**
{self._get_topic_exercise(topic, 'confused')}

**✅ Success Tips:**
{self._get_topic_tips(topic, 'confused')}

Take your time - confusion is the first step to understanding!""",
            
            'frustrated': f"""I understand you're feeling frustrated with {topic}. You've got this! Let's try a different approach.

**🌟 Encouragement First:**
- Every expert was once a beginner
- Frustration means you're challenging yourself
- This feeling is temporary and normal

**🔄 Alternative Approach for {topic.title()}:**
- **Different perspective:** Look at it from another angle
- **Break it down:** Smaller, manageable steps
- **Visual learning:** Use diagrams or examples
- **Hands-on practice:** Learn by doing

**🎯 Success Strategy:**
1. Take a short break (5-10 minutes)
2. Come back with fresh eyes
3. Try the simplest example first
4. Celebrate small wins
5. Remember why you started learning {topic}

**💪 You Can Do This!**
Frustration is just your brain growing stronger. Keep going!""",
            
            'bored': f"""Feeling a bit bored with {topic}? Let's make this more interesting with a fun quiz!

**🎮 {topic.title()} Quiz Challenge!**

{self._get_topic_specific_quiz(topic)}

---
**🎯 Quick Answers:**
{self._get_quiz_answers(topic)}

**🏆 Score Yourself:**
- 5 correct: You're a {topic} expert!
- 3-4 correct: Good job! Keep practicing!
- 1-2 correct: Keep learning, you'll get there!
- 0 correct: Time to start studying {topic}!

**🎪 Next Challenge:**
Try this fun {topic} exercise: Create a simple project using what you've learned!

**💡 Pro Tip:** Turn learning into a game - set points for each correct answer and compete with friends!""",
            
            'happy': f"""Great to see you're enjoying {topic}! Let's dive into some more challenging content.

**🎉 Your Positive Energy is Perfect for:**
- Advanced concepts and complex problems
- Creative projects and innovations
- Teaching others what you've learned
- Exploring cutting-edge applications

**🚀 Advanced {topic.title()} Topics:**
- **Expert Level:** Complex problem-solving
- **Real Applications:** Industry-standard projects
- **Innovation:** Create something new
- **Integration:** Combine with other fields

**🎯 Challenge Yourself:**
1. **Advanced Project:** [Challenging {topic} project]
2. **Teach Someone:** Explain concepts to others
3. **Explore Frontiers:** Latest developments in {topic}
4. **Create & Share:** Build something impressive
5. **Join Community:** Connect with other enthusiasts

**🌟 Next Level:**
Your enthusiasm will take you far! Let's explore advanced {topic} concepts that will really challenge and excite you.

**🏆 Achievement Goal:**
Complete this advanced {topic} challenge: [Expert-level task]""",
            
            'engaged': f"""Perfect! You're clearly engaged and ready to learn. Let's explore some advanced concepts in {topic}.

**🎯 Your Focus is Ideal for:**
- Deep understanding of complex topics
- Professional-level applications
- Research and exploration
- Mastery and expertise

**🚀 Professional {topic.title()} Content:**
- **Expert Concepts:** Industry-standard knowledge
- **Real-world Problems:** Practical applications
- **Advanced Techniques:** Professional methods
- **Integration Skills:** Combining multiple areas

**🎓 Mastery Path:**
1. **Deep Dive:** Advanced theory and practice
2. **Professional Project:** [Industry-level project]
3. **Research:** Explore cutting-edge developments
4. **Networking:** Connect with professionals
5. **Innovation:** Create something groundbreaking

**💼 Professional Applications:**
- **Industry Standards:** Best practices in {topic}
- **Case Studies:** Real-world examples
- **Problem-Solving:** Complex challenges
- **Innovation:** Pushing boundaries

**🏆 Excellence Goal:**
Your engagement and focus will make you an expert in {topic}. Let's work towards mastery!

**🌟 Expert Challenge:**
Complete this professional {topic} project: [Master-level task]""",
            
            'neutral': f"""Let's explore {topic} together!

**📚 Understanding {topic.title()}:**
- Start with the basics and build your knowledge step by step
- Focus on understanding core concepts
- Practice with simple examples

**🎯 Learning Approach:**
- **Foundation:** Learn the fundamental principles
- **Practice:** Work through basic exercises
- **Application:** Try real-world examples
- **Review:** Regularly check your understanding

**📝 Simple Exercise:**
Start with this basic {topic} exercise: [Beginner-friendly task]

**💡 Learning Tips:**
1. Take your time to understand each concept
2. Don't hesitate to ask questions
3. Practice regularly for better retention
4. Connect new knowledge to what you already know

Let's build your {topic} knowledge together!"""
        }
        
        return responses.get(emotion, f"Here's some learning content about {topic}.")
    
    def _get_topic_explanation(self, topic: str, emotion: str) -> str:
        """Get topic-specific explanation based on emotion"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """Python is a high-level programming language that's easy to read and write.
- **Variables:** Store data like labeled boxes
- **Functions:** Reusable code blocks that perform specific tasks
- **Loops:** Repeat actions without writing the same code multiple times
- **Conditionals:** Make decisions in your code (if/else statements)
- **Data Types:** Different kinds of data (numbers, text, lists)"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            if 'trig' in topic_lower or 'trigonometry' in topic_lower:
                return """🔹 What is Trigonometry?

Trigonometry is the branch of mathematics that studies the relationship between angles and sides of triangles.

It is mainly based on right-angled triangles.

1️⃣ **Basic Trigonometric Ratios**

For a right-angled triangle:

**sin θ = Opposite / Hypotenuse**

**cos θ = Adjacent / Hypotenuse**

**tan θ = Opposite / Adjacent**

🔁 **Reciprocal Ratios**

**cosec θ = 1 / sin θ**

**sec θ = 1 / cos θ**

**cot θ = 1 / tan θ**

2️⃣ **Important Trigonometric Identities**
🔹 **Pythagorean Identities**

**sin²θ + cos²θ = 1**

**1 + tan²θ = sec²θ**

**1 + cot²θ = cosec²θ**

3️⃣ **Standard Values Table**
|θ|0°|30°|45°|60°|90°|
|---|---|---|---|---|---|
|**sin θ**|0|1/2|√2/2|√3/2|1|
|**cos θ**|1|√3/2|√2/2|1/2|0|
|**tan θ**|0|1/√3|1|√3|∞|

4️⃣ **Trigonometric Formulas**
🔹 **Complementary Angles**

**sin(90° − θ) = cos θ**

**cos(90° − θ) = sin θ**

**tan(90° − θ) = cot θ**

5️⃣ **Applications of Trigonometry**

- **Height and distance problems**
- **Engineering**
- **Physics**
- **Navigation**
- **Computer graphics**"""
            else:
                return """Mathematics is the study of numbers, patterns, and relationships.
- **Arithmetic:** Basic operations (+, -, ×, ÷)
- **Algebra:** Using letters to represent unknown numbers
- **Geometry:** Study of shapes and their properties
- **Statistics:** Understanding data and patterns
- **Problem-Solving:** Using math to find solutions"""
        
        elif 'science' in topic_lower:
            return """Science is the systematic study of the natural world.
- **Scientific Method:** Observe, hypothesize, test, conclude
- **Physics:** Study of matter, energy, and their interactions
- **Chemistry:** Study of substances and their reactions
- **Biology:** Study of living organisms
- **Experiments:** Testing ideas to discover truths"""
        
        else:
            return f"""{topic.title()} is a field of study that helps us understand the world better.
- **Core Concepts:** Fundamental principles and theories
- **Applications:** How it's used in real life
- **Skills:** What you'll learn by studying it
- **Importance:** Why it matters in today's world"""
    
    def _get_topic_steps(self, topic: str, emotion: str) -> str:
        """Get step-by-step learning for topic"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """1. **Start with variables:** Learn to store and retrieve data
2. **Master functions:** Create reusable code blocks
3. **Understand loops:** Learn to repeat actions efficiently
4. **Practice conditionals:** Make decisions in code
5. **Build small projects:** Apply what you've learned"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """1. **Master arithmetic:** Perfect +, -, ×, ÷ operations
2. **Learn algebra basics:** Understand variables and equations
3. **Study geometry:** Learn about shapes and angles
4. **Practice word problems:** Apply math to real situations
5. **Use visual aids:** Draw diagrams to understand concepts"""
        
        elif 'science' in topic_lower:
            return """1. **Learn scientific method:** The process of scientific discovery
2. **Start with basics:** Choose physics, chemistry, or biology
3. **Do simple experiments:** Test ideas hands-on
4. **Record observations:** Write down what you notice
5. **Ask questions:** Stay curious about how things work"""
        
        else:
            return f"""1. **Start with basics:** Learn fundamental concepts of {topic}
2. **Practice regularly:** Work on problems daily
3. **Apply knowledge:** Use concepts in real situations
4. **Ask questions:** Don't be afraid to seek help
5. **Build projects:** Create something using what you've learned"""
    
    def _get_topic_mistakes(self, topic: str, emotion: str) -> str:
        """Get common mistakes to avoid for topic"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """- **Not practicing enough:** Code skills improve with regular practice
- **Giving up too soon:** Programming challenges take time to solve
- **Not reading error messages:** Errors are learning opportunities
- **Copying without understanding:** Make sure you know why code works"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """- **Skipping steps:** Math problems need systematic approach
- **Not checking work:** Always verify your calculations
- **Memorizing without understanding:** Focus on concepts, not just formulas
- **Giving up on hard problems:** Break them into smaller parts"""
        
        elif 'science' in topic_lower:
            return """- **Not following scientific method:** Systematic approach works best
- **Ignoring observations:** Details matter in science
- **Making assumptions:** Base conclusions on evidence
- **Not asking questions:** Curiosity drives scientific discovery"""
        
        else:
            return f"""- **Rushing through basics:** {topic} requires solid foundation
- **Not practicing enough:** Skills develop with regular use
- **Working in isolation:** Connect with others learning {topic}
- **Giving up too easily:** Mastery takes time and patience"""
    
    def _get_topic_exercise(self, topic: str, emotion: str) -> str:
        """Get practice exercise for topic"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """Write a simple calculator program that:
- Takes two numbers as input
- Performs +, -, ×, ÷ operations
- Shows the results
- Handles basic errors gracefully"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """Solve these 5 problems:
1. 15 + 27 × 3 = ?
2. What is 25% of 80?
3. Find the missing number: 5, 10, 15, ?, 25
4. Solve for x: 2x + 5 = 25
5. What's the area of a rectangle with length 8 and width 6?"""
        
        elif 'science' in topic_lower:
            return """Design a simple experiment:
1. **Question:** What happens when you mix oil and water?
2. **Hypothesis:** The oil will float on water
3. **Materials:** Clear glass, water, cooking oil
4. **Procedure:** Pour water, then slowly add oil
5. **Observation:** Record what you see happen"""
        
        else:
            return f"""Create a simple project related to {topic}:
1. Research the basic concepts
2. Plan a small demonstration
3. Gather necessary materials
4. Execute your plan
5. Document what you learned"""
    
    def _get_topic_tips(self, topic: str, emotion: str) -> str:
        """Get success tips for topic"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """- **Code daily:** Even 15 minutes makes a big difference
- **Read other people's code:** Learn from different approaches
- **Break problems down:** Complex issues become simple
- **Use documentation:** Don't be afraid to look up help
- **Join coding communities:** Learn from others"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """- **Show your work:** Teachers can see your thought process
- **Practice mental math:** Quick calculations save time
- **Draw diagrams:** Visualize problems to understand them
- **Learn multiple methods:** Different approaches for different problems
- **Use real examples:** Connect math to everyday life"""
        
        elif 'science' in topic_lower:
            return """- **Stay curious:** Ask "why" and "how" about everything
- **Keep a lab notebook:** Document your experiments
- **Learn from failures:** Failed experiments teach too
- **Work with others:** Science is often collaborative
- **Stay updated:** Science discoveries happen all the time"""
        
        else:
            return f"""- **Stay consistent:** Regular practice with {topic} builds mastery
- **Connect to interests:** Find aspects of {topic} that excite you
- **Teach others:** Explaining concepts deepens your understanding
- **Use multiple resources:** Books, videos, and practice
- **Set goals:** Work toward specific achievements in {topic}"""
    
    def _get_topic_specific_quiz(self, topic: str) -> str:
        """Generate topic-specific quiz questions"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """**Question 1:** What does `print("Hello")` do in Python?
A) Prints "Hello" to the screen
B) Stores "Hello" in memory
C) Deletes "Hello" from the program
D) Creates a file named "Hello"

**Question 2:** Which symbol is used for comments in Python?
A) //
B) #
C) /* */
D) --

**Question 3:** What is a variable in Python?
A) A container for storing data
B) A mathematical operation
C) A type of loop
D) A function name

**Question 4:** How do you start a for loop in Python?
A) for i in range(5):
B) for i = 0 to 5
C) loop i from 0 to 5
D) repeat i 5 times

**Question 5:** What does `len([1,2,3])` return?
A) 3
B) [1,2,3]
C) 1
D) An error"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """**Question 1:** What is 2 + 2 × 3?
A) 12
B) 8
C) 10
D) 6

**Question 2:** What is the square root of 16?
A) 2
B) 4
C) 8
D) 16

**Question 3:** What is 15% of 200?
A) 15
B) 30
C) 45
D) 60

**Question 4:** What is the next number in the sequence: 2, 4, 8, 16, ?
A) 20
B) 24
C) 32
D) 64

**Question 5:** What is the perimeter of a square with side length 5?
A) 10
B) 15
C) 20
D) 25"""
        
        elif 'science' in topic_lower:
            return """**Question 1:** What is H₂O commonly known as?
A) Oxygen
B) Hydrogen
C) Water
D) Carbon dioxide

**Question 2:** What planet is closest to the Sun?
A) Venus
B) Earth
C) Mercury
D) Mars

**Question 3:** What is the largest organ in the human body?
A) Heart
B) Brain
C) Liver
D) Skin

**Question 4:** What gas do plants breathe in?
A) Oxygen
B) Nitrogen
C) Carbon dioxide
D) Hydrogen

**Question 5:** What is the speed of light?
A) 300,000 km/s
B) 150,000 km/s
C) 500,000 km/s
D) 1,000,000 km/s"""
        
        else:
            return f"""**Question 1:** What is the main purpose of {topic}?
A) To make things complicated
B) To solve problems efficiently  
C) To waste time
D) To confuse people

**Question 2:** Which of these is a key concept in {topic}?
A) Magic spells
B) Basic principles and logic
C) Random guessing
D) Nothing important

**Question 3:** How can {topic} be used in real life?
A) Never, it's useless
B) In many practical applications
C) Only in school
D) Just for fun

**Question 4:** What's the best way to learn {topic}?
A) Never practice
B) Through hands-on exercises
C) Just read once
D) Give up quickly

**Question 5:** Why is {topic} important to learn?
A) It's not important at all
B) It helps develop critical thinking
C) Only for exams
D) No reason"""
    
    def _get_quiz_answers(self, topic: str) -> str:
        """Get answers for topic-specific quiz"""
        topic_lower = topic.lower()
        
        if 'python' in topic_lower or 'programming' in topic_lower:
            return """1) A) Prints "Hello" to the screen
2) B) #
3) A) A container for storing data
4) A) for i in range(5):
5) A) 3"""
        
        elif 'math' in topic_lower or 'mathematics' in topic_lower:
            return """1) B) 8
2) B) 4
3) B) 30
4) C) 32
5) C) 20"""
        
        elif 'science' in topic_lower:
            return """1) C) Water
2) C) Mercury
3) D) Skin
4) C) Carbon dioxide
5) A) 300,000 km/s"""
        
        else:
            return f"""1) B) To solve problems efficiently
2) B) Basic principles and logic  
3) B) In many practical applications
4) B) Through hands-on exercises
5) B) It helps develop critical thinking"""
    
    def _initialize_learning_content(self) -> Dict[str, Dict[str, str]]:
        """
        Initializes the learning content database.
        
        Returns:
            Dict[str, Dict[str, str]]: Nested dictionary of topic -> emotion -> content
        """
        content = {
            'python programming': {
                'confused': """
Python is a programming language that's designed to be simple and readable. Think of it like giving instructions to a computer in plain English.

**Basic Example:**
```python
print("Hello, World!")
```
This just tells the computer to display "Hello, World!" on the screen.

**Key Concepts:**
- Variables: Like boxes to store information (name = "John")
- Functions: Reusable blocks of code
- Loops: Ways to repeat actions

Python is great for beginners because its code reads like regular sentences!
                """,
                'frustrated': """
**Stay Positive! You're Learning a Valuable Skill!**

Python programming might seem tough now, but every expert was once a beginner. Let's break it down:

**Step 1: Understand the Goal**
Python helps us tell computers what to do.

**Step 2: Start Simple**
Begin with basic commands like `print()` to display text.

**Step 3: Practice One Concept at a Time**
- Today: Just learn variables
- Tomorrow: Try functions
- Next week: Explore loops

**Remember:** Every error message is just the computer trying to help you fix something. Programming is problem-solving, and you're building problem-solving muscles!

**You CAN do this!** 💪
                """,
                'bored': """
**Quick Python Quiz! Test Your Knowledge:**

**Question 1:** What does `print("Hello")` do in Python?
A) Saves "Hello" to memory
B) Displays "Hello" on screen  
C) Deletes "Hello" from the program
D) Nothing - it's just a comment

**Question 2:** Which is a valid variable name?
A) 2myvar
B) my-var
C) my_var
D) my var

**Question 3:** What's the output of: `x = 5; print(x + 3)`
A) 5
B) 8
C) "53"
D) Error

**Answers:** 1-B, 2-C, 3-B

How did you do? Ready for more Python challenges?
                """,
                'happy': """
**Great! Let's Explore Some Intermediate Python Concepts!**

Since you're feeling good about Python, let's dive into some interesting features:

**List Comprehensions:**
Instead of writing:
```python
squares = []
for i in range(10):
    squares.append(i * i)
```

You can write:
```python
squares = [i * i for i in range(10)]
```

**Lambda Functions:**
Quick, anonymous functions:
```python
multiply = lambda x, y: x * y
result = multiply(5, 3)  # Returns 15
```

**Try This Challenge:**
Write a list comprehension that creates a list of even numbers from 1 to 20.

**Fun Fact:** Python is named after "Monty Python's Flying Circus," not the snake!
                """,
                'engaged': """
**Excellent! Advanced Python Concepts for Deep Understanding!**

**Decorators:**
Modify functions without changing their source code:
```python
def timing_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Function took {time.time() - start} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done"
```

**Generators and Yield:**
Memory-efficient iteration:
```python
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci_generator()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1
```

**Metaclasses:**
Classes that create classes - the ultimate Python power tool!

**Advanced Challenge:** Implement a decorator that caches function results (memoization).

**Real-world Application:** These concepts are used in frameworks like Django and Flask!
                """
            },
            'machine learning basics': {
                'confused': """
Machine Learning is teaching computers to learn from data, like how you learn from experience.

**Simple Example:**
Imagine teaching a computer to recognize cats:
1. Show it thousands of cat pictures (training data)
2. It learns patterns (ears, whiskers, fur)
3. When shown a new picture, it guesses "cat" or "not cat"

**Key Ideas:**
- Training: Teaching with examples
- Prediction: Making educated guesses
- Accuracy: How often it's right

ML is like having a very fast student who can look at millions of examples!
                """,
                'frustrated': """
**Don't Give Up! ML is Complex but Rewarding!**

**Step 1: Remember the Goal**
ML helps computers make predictions from data.

**Step 2: Break It Down**
- Start with understanding what "data" means
- Learn what "training" looks like
- See how "prediction" works

**Step 3: Use Analogies**
ML is like teaching a toddler:
- Show them many examples (training)
- They learn to recognize patterns
- They can identify new things (prediction)

**You're Learning Something Amazing!** Every concept you master brings you closer to building intelligent systems. Keep going! 🚀
                """,
                'bored': """
**Machine Learning Quiz Time!**

**Question 1:** What is Machine Learning?
A) Building machines that learn like humans
B) Programming robots to do specific tasks
C) Creating websites with machine code
D) Fixing broken machines

**Question 2:** In ML, what is "training data"?
A) Data used to test the model
B) Data used to teach the model
C) Data that is always correct
D) Data that comes from training videos

**Question 3:** What does a ML model "predict"?
A) The future
B) Weather patterns
C) Outcomes based on patterns
D) Lottery numbers

**Answers:** 1-A, 2-B, 3-C

Ready to dive deeper into how ML actually works?
                """,
                'happy': """
**Fantastic! Let's Explore ML Algorithms!**

**Types of Machine Learning:**

1. **Supervised Learning:**
   - Learning with labeled examples
   - Like studying with answer keys
   - Example: Spam email detection

2. **Unsupervised Learning:**
   - Finding patterns in unlabeled data
   - Like grouping similar things together
   - Example: Customer segmentation

3. **Reinforcement Learning:**
   - Learning through trial and error
   - Like training a pet with treats
   - Example: Game playing AI

**Try This:** Think about how Netflix recommends movies. What type of ML do you think it uses?

**Fun Fact:** The term "Machine Learning" was coined in 1959!
                """,
                'engaged': """
**Outstanding! Deep Dive into ML Architecture!**

**Neural Networks: The Brain of AI**
```python
# Simplified neural network concept
import numpy as np

class SimpleNeuron:
    def __init__(self, inputs):
        self.weights = np.random.random(inputs)
        self.bias = np.random.random()
    
    def forward(self, x):
        return np.dot(x, self.weights) + self.bias

# Create a neuron with 3 inputs
neuron = SimpleNeuron(3)
output = neuron.forward([1, 0, 1])
```

**Backpropagation: How Networks Learn**
1. Make a prediction
2. Calculate the error
3. Adjust weights to reduce error
4. Repeat millions of times

**Advanced Concepts:**
- **Convolutional Neural Networks (CNNs):** For image recognition
- **Recurrent Neural Networks (RNNs):** For sequential data
- **Transformers:** For natural language processing

**Cutting-Edge Challenge:** Research how GPT models use attention mechanisms - it's revolutionizing NLP!

**Real-world Impact:** These technologies power everything from your phone's face recognition to medical diagnosis systems!
                """
            },
            'data structures': {
                'confused': """
Data Structures are different ways to organize and store information in a computer.

**Think of it like organizing your room:**
- **Array:** Like a bookshelf with numbered slots
- **List:** Like a shopping list you can add to or remove from
- **Dictionary:** Like a phone book (name → number)

**Simple Example:**
```python
# Array (list in Python)
numbers = [1, 2, 3, 4, 5]

# Dictionary
phone_book = {"Alice": "555-1234", "Bob": "555-5678"}
```

Different structures are good for different tasks, just like you organize different things differently!
                """,
                'frustrated': """
**You Can Master This! Data Structures Are Building Blocks!**

**Step 1: Why Do We Need Them?**
Computers need organized ways to store and find information quickly.

**Step 2: Start With the Basics**
- **Arrays:** Ordered collections with numbered positions
- **Lists:** Flexible collections you can change
- **Dictionaries:** Key-value pairs for quick lookups

**Step 3: Practice One at a Time**
Today: Just understand arrays
Tomorrow: Try using lists
Later: Explore dictionaries

**Remember:** Every programmer uses these daily. You're learning fundamental skills that will serve you forever! 💪
                """,
                'bored': """
**Data Structures Quiz Challenge!**

**Question 1:** What is a data structure?
A) A way to organize and store data
B) A programming language
C) A type of computer hardware
D) A database system

**Question 2:** In an array [10, 20, 30, 40], what is at index 2?
A) 10
B) 20
C) 30
D) 40

**Question 3:** Which is best for storing name-phone number pairs?
A) Array
B) List
C) Dictionary
D) Stack

**Answers:** 1-A, 2-C, 3-C

How did you do? Ready to learn about more complex structures like trees and graphs?
                """,
                'happy': """
**Great! Let's Explore Advanced Data Structures!**

**Stacks and Queues:**
- **Stack:** Last In, First Out (LIFO) - like a stack of plates
- **Queue:** First In, First Out (FIFO) - like a line at the bank

**Trees: Hierarchical Data**
```python
# Binary Tree concept
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Create a simple tree
root = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
```

**Try This Challenge:** 
Write down the order you'd visit nodes in a tree (in-order traversal).

**Fun Fact:** The file system on your computer is a tree structure!
                """,
                'engaged': """
**Excellent! Advanced Data Structure Algorithms!**

**Hash Tables: The Magic Behind Fast Lookups**
```python
class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def hash_function(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self.hash_function(key)
        self.table[index].append((key, value))
```

**Graph Algorithms: Network Analysis**
- **Breadth-First Search (BFS):** Find shortest paths
- **Depth-First Search (DFS):** Explore all paths
- **Dijkstra's Algorithm:** Find optimal routes

**Advanced Challenge:** Implement a priority queue using a heap data structure.

**Real-World Applications:**
- Social networks use graphs for friend connections
- GPS uses graph algorithms for routing
- Databases use B-trees for efficient indexing
- Compilers use hash tables for symbol tables

**Cutting Edge:** Learn about probabilistic data structures like Bloom filters used in big data systems!
                """
            }
        }
        
        # Add content for other topics with similar structure
        content.update(self._get_additional_topics_content())
        
        return content
    
    def _get_additional_topics_content(self) -> Dict[str, Dict[str, str]]:
        """
        Returns content for additional learning topics.
        
        Returns:
            Dict[str, Dict[str, str]]: Additional topic content
        """
        # This would contain content for other topics like:
        # - Web Development
        # - Database Systems
        # - Computer Networks
        # - Artificial Intelligence
        # - Software Engineering
        
        # For brevity, returning a simplified structure
        return {
            'web development': self._create_topic_content(
                "Web Development",
                "HTML, CSS, and JavaScript",
                "Building websites and web applications"
            ),
            'database systems': self._create_topic_content(
                "Database Systems",
                "SQL and data organization",
                "Storing and retrieving data efficiently"
            ),
            'computer networks': self._create_topic_content(
                "Computer Networks",
                "TCP/IP and network protocols",
                "How computers communicate"
            ),
            'artificial intelligence': self._create_topic_content(
                "Artificial Intelligence",
                "AI concepts and applications",
                "Creating intelligent systems"
            ),
            'software engineering': self._create_topic_content(
                "Software Engineering",
                "Software development principles",
                "Building reliable software systems"
            )
        }
    
    def _create_topic_content(self, topic_name: str, basics: str, description: str) -> Dict[str, str]:
        """
        Creates standardized content for a topic.
        
        Args:
            topic_name (str): Name of the topic
            basics (str): Basic concepts
            description (str): Topic description
            
        Returns:
            Dict[str, str]: Emotion-based content for the topic
        """
        return {
            'confused': f"""
{topic_name} can seem complex at first, but let's break it down to basics.

**What is {topic_name}?**
{description}

**Basic Concepts:**
{basics}

**Simple Example:**
Start with the fundamentals and build up gradually. Every expert started exactly where you are now!

**Key Idea:** Focus on understanding one concept at a time.
            """,
            'frustrated': f"""
**Stay Positive! {topic_name} is a Valuable Skill!**

Learning {topic_name} takes time, and frustration is normal. Here's how to succeed:

**Step 1: Remember Your "Why"**
You're learning {topic_name} because it's valuable and in-demand.

**Step 2: Break It Down**
- Focus on one small concept today
- Practice that concept until it feels comfortable
- Move to the next concept tomorrow

**Step 3: Celebrate Small Wins**
Every line of code you understand is progress!
Every concept you master is a victory!

**You're Building Something Amazing!** 💪
            """,
            'bored': f"""
**{topic_name} Quick Quiz!**

**Question 1:** What is the main purpose of {topic_name.lower()}?
A) {description}
B) To make programming harder
C) To replace all other technologies
D) Only for expert programmers

**Question 2:** Why learn {topic_name.lower()}?
A) It's widely used in industry
B) It teaches valuable problem-solving skills
C) It opens career opportunities
D) All of the above

**Answer:** 2-D (All of the above!)

Ready to dive deeper into {topic_name}?
            """,
            'happy': f"""
**Great! Let's Explore Intermediate {topic_name}!**

Since you're enjoying {topic_name}, let's look at some practical applications:

**Real-World Uses:**
- Building actual projects
- Solving real problems
- Creating things people use every day

**Next Steps:**
- Try building a small project
- Explore advanced features
- Connect with other learners

**Challenge Idea:** Think of a small project you could build with {topic_name} skills!

**Fun Fact:** Many successful tech companies started with people just like you learning these concepts!
            """,
            'engaged': f"""
**Excellent! Advanced {topic_name} Concepts!**

Your engagement is perfect for exploring deep, technical content:

**Advanced Topics:**
- Industry best practices
- Performance optimization
- Scalability considerations
- Security implications

**Professional Development:**
- How experts approach problems
- Common pitfalls and how to avoid them
- Tools and frameworks professionals use

**Cutting-Edge Challenge:** Research the latest developments in {topic_name} and share what you discover!

**Career Impact:** These advanced concepts separate beginners from professionals and open doors to exciting opportunities!
            """
        }
    
    def _get_default_content(self) -> Dict[str, str]:
        """
        Returns default content when topic is not found.
        
        Returns:
            Dict[str, str]: Default emotion-based content
        """
        return {
            'confused': "Let's start with the basics. Every complex topic can be broken down into simple, understandable parts.",
            'frustrated': "Learning is challenging but rewarding. Take a deep breath and let's approach this step by step.",
            'bored': "Let's try a quick quiz to make things more interesting and test your understanding!",
            'happy': "Great! Since you're feeling positive, let's explore some more challenging aspects of this topic.",
            'engaged': "Perfect! Your focus and engagement make this the ideal time to dive into advanced concepts."
        }
    
    def _get_fallback_content(self, emotion: str) -> str:
        """
        Returns fallback content when specific emotion content is not found.
        
        Args:
            emotion (str): The emotion for fallback content
            
        Returns:
            str: Fallback content
        """
        fallbacks = {
            'confused': "Let me explain this concept in a simpler way that's easier to understand.",
            'frustrated': "Don't worry! Every expert was once a beginner. Let's break this down together.",
            'bored': "Let's make this more interesting with some interactive content!",
            'happy': "Wonderful! Let's build on your positive momentum with some engaging material.",
            'engaged': "Excellent! Your focus is perfect for learning some advanced concepts."
        }
        
        return fallbacks.get(emotion, "Here's some learning content for you.")
    
    def get_available_topics(self) -> List[str]:
        """
        Returns a list of all available learning topics.
        
        Returns:
            List[str]: List of topic names
        """
        return list(self.learning_content.keys())
    
    def add_topic_content(self, topic: str, emotion: str, content: str) -> bool:
        """
        Adds custom content for a specific topic and emotion.
        
        Args:
            topic (str): Topic name
            emotion (str): Emotion category
            content (str): Learning content
            
        Returns:
            bool: True if content was added successfully
        """
        try:
            topic_lower = topic.lower()
            emotion_lower = emotion.lower()
            
            if topic_lower not in self.learning_content:
                self.learning_content[topic_lower] = {}
            
            self.learning_content[topic_lower][emotion_lower] = content
            return True
            
        except Exception:
            return False
