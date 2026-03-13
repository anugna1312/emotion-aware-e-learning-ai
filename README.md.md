# Multimodal Emotion-Based Adaptive Learning System

**Final Year Major Project - Computer Science Engineering**

A sophisticated web-based application that detects user emotions through text, face, and audio inputs, and provides adaptive learning content based on the detected emotional state.

## 🧠 Project Overview

This system creates a personalized learning experience by:

1. **Detecting Emotions**: Analyzes user input through three modalities
   - Text Analysis: NLP-based emotion detection from written responses
   - Face Detection: Computer vision analysis of facial expressions
   - Audio Detection: Speech emotion recognition from voice recordings

2. **Emotion Mapping**: Converts raw emotions to 5 standardized categories:
   - Confused
   - Frustrated  
   - Bored
   - Happy
   - Engaged

3. **Adaptive Learning**: Generates personalized content based on detected emotions:
   - **Confused** → Simple explanations with basic examples
   - **Frustrated** → Motivational encouragement + step-by-step guidance
   - **Bored** → Interactive quizzes and engaging content
   - **Happy** → Moderately challenging explanations
   - **Engaged** → Advanced-level detailed content

## 🎯 Key Features

### Frontend
- **Modern UI**: Bootstrap 5 with responsive design
- **Interactive Interface**: Real-time emotion detection feedback
- **Multi-modal Input**: Seamless switching between text, face, and audio modes
- **Visual Feedback**: Progress indicators and confidence scores
- **Mobile Responsive**: Works on all device sizes

### Backend
- **RESTful API**: Clean Flask-based architecture
- **Modular Design**: Separate modules for each detection type
- **Emotion Mapping**: Intelligent conversion of raw emotions
- **Learning Engine**: Dynamic content generation
- **Error Handling**: Robust error management and user feedback

### Detection Capabilities
- **Text Emotion Detection**: Keyword-based NLP analysis
- **Face Emotion Detection**: Computer vision with OpenCV
- **Audio Emotion Detection**: Speech analysis and feature extraction

## 🏗️ Technical Architecture

```
├── app.py                    # Main Flask application
├── emotion_mapping.py        # Emotion standardization module
├── learning_engine.py        # Adaptive content generation
├── text_emotion_detector.py  # Text-based emotion analysis
├── face_emotion_detector.py  # Face expression analysis
├── audio_emotion_detector.py # Speech emotion recognition
├── templates/
│   └── index.html           # Main web interface
├── static/
│   ├── css/
│   │   └── style.css        # Custom styling
│   └── js/
│       └── main.js          # Frontend functionality
└── requirements.txt          # Python dependencies
```

## 🚀 Installation and Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Modern web browser with webcam/microphone support

### Step 1: Clone/Download the Project
```bash
# If using git
git clone <repository-url>
cd "multimodal-emotion-learning"

# Or extract the project files to your desired location
```

### Step 2: Create Virtual Environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

### Step 5: Access the Application
Open your web browser and navigate to:
```
http://localhost:5000
```

## 📖 Usage Guide

### 1. Select Learning Topic
Choose from available topics like:
- Python Programming
- Machine Learning Basics
- Data Structures
- Web Development
- Database Systems
- And more...

### 2. Choose Detection Mode
- **Text Mode**: Type your thoughts, questions, or feelings
- **Face Mode**: Allow webcam access and capture your expression
- **Audio Mode**: Record your voice speaking about the topic

### 3. Analyze and Learn
Click "Analyze Emotion & Generate Response" to receive:
- Detected emotion with confidence score
- Personalized learning content adapted to your emotional state

## 🔧 API Endpoints

### Detect Emotion
```http
POST /detect_emotion
Content-Type: application/json

{
  "topic": "Python Programming",
  "mode": "text|face|audio",
  "text": "I'm confused about variables",
  "image": "base64_encoded_image",
  "audio": "base64_encoded_audio"
}
```

**Response:**
```json
{
  "detected_emotion": "confused",
  "adaptive_learning_response": "Let me explain variables in a simple way...",
  "timestamp": "2024-01-01T12:00:00"
}
```

### Health Check
```http
GET /health
```

## 🧪 Testing

### Manual Testing
1. Start the application
2. Open browser to `http://localhost:5000`
3. Test each detection mode with sample inputs
4. Verify emotion mapping and content generation

### Automated Testing
```bash
# Run tests (if implemented)
pytest tests/
```

## 🔬 Technical Implementation Details

### Emotion Detection Algorithms

#### Text Analysis
- Keyword-based sentiment analysis
- Intensity modifier detection
- Negation handling
- Context-aware scoring

#### Face Detection
- Haar cascade face detection
- Feature extraction (eye position, mouth curvature, etc.)
- Rule-based emotion classification
- Real-time processing capability

#### Audio Analysis
- Pitch and energy extraction
- Spectral feature analysis
- Speech rate calculation
- Pattern matching for emotion classification

### Emotion Mapping Logic
The system uses a comprehensive mapping dictionary to convert raw model outputs to the 5 standardized emotions:

```python
emotion_mapping = {
    'angry': 'frustrated',
    'sad': 'frustrated', 
    'neutral': 'bored',
    'excited': 'engaged',
    'surprised': 'confused',
    # ... more mappings
}
```

### Learning Content Generation
The adaptive engine maintains a structured database of content for each topic-emotion combination, ensuring consistent and appropriate responses.

## 🎨 Design Principles

### User Experience
- **Intuitive Interface**: Clear visual hierarchy and navigation
- **Immediate Feedback**: Real-time status updates and progress indicators
- **Accessibility**: WCAG compliant design with keyboard navigation
- **Responsive Design**: Optimized for all screen sizes

### Technical Excellence
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Graceful degradation and user feedback
- **Performance**: Optimized for real-time processing
- **Scalability**: Designed for future enhancements

## 🔮 Future Enhancements

### Planned Features
1. **Advanced ML Models**: Integration with state-of-the-art emotion recognition models
2. **Multi-language Support**: Support for languages beyond English
3. **User Profiles**: Personalized learning history and progress tracking
4. **Collaborative Learning**: Multi-user sessions and group activities
5. **Mobile App**: Native mobile application development

### Technical Improvements
1. **Real-time Processing**: WebSocket integration for live emotion detection
2. **Cloud Deployment**: Scalable cloud infrastructure
3. **Database Integration**: Persistent storage for user data
4. **Analytics Dashboard**: Learning analytics and insights
5. **API Documentation**: Comprehensive OpenAPI/Swagger documentation

## 🤝 Contributing

### Development Guidelines
1. Follow PEP 8 Python style guidelines
2. Write comprehensive docstrings
3. Include unit tests for new features
4. Update documentation for API changes

### Code Structure
- Use meaningful variable and function names
- Implement proper error handling
- Follow modular design principles
- Maintain backward compatibility

## 📄 License

This project is developed for educational purposes as part of a Final Year Major Project. Please ensure proper attribution if using or modifying this code.

## 🙏 Acknowledgments

- **OpenCV Team**: For computer vision libraries
- **Flask Community**: For the web framework
- **Bootstrap Team**: For responsive UI components
- **Python Community**: For the extensive ecosystem of libraries

## 📞 Support

For questions, issues, or contributions:

1. **Documentation**: Refer to this README and code comments
2. **Issues**: Report bugs or request features through the issue tracker
3. **Discussions**: Join technical discussions for implementation details

---

**Project Developed By:** Computer Science Engineering Student  
**Project Type:** Final Year Major Project  
**Academic Year:** 2023-2024

---

*This project demonstrates the practical application of artificial intelligence, computer vision, and natural language processing in creating adaptive educational systems.*
