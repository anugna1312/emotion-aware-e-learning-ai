"""
Multimodal Emotion-Based Adaptive Learning System
Final Year Major Project
Main Flask Application
"""

from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

# Import custom modules
from emotion_mapping import EmotionMapper
from learning_engine import LearningEngine
from text_emotion_detector import TextEmotionDetector
from face_emotion_detector import FaceEmotionDetector
from audio_emotion_detector import AudioEmotionDetector

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize components
emotion_mapper = EmotionMapper()
learning_engine = LearningEngine()
text_detector = TextEmotionDetector()
face_detector = FaceEmotionDetector()
audio_detector = AudioEmotionDetector()

# Learning topics available
LEARNING_TOPICS = [
    "Python Programming",
    "Machine Learning Basics",
    "Data Structures",
    "Web Development",
    "Database Systems",
    "Computer Networks",
    "Artificial Intelligence",
    "Software Engineering"
]

@app.route('/')
def index():
    """Main page of the application"""
    return render_template('index.html')

@app.route('/detect_emotion', methods=['POST'])
def detect_emotion():
    """
    API endpoint to detect emotion based on selected mode
    Returns: JSON with detected emotion and adaptive learning response
    """
    try:
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        topic = data.get('topic', '')
        detection_mode = data.get('mode', '')
        
        if not topic or not detection_mode:
            return jsonify({'error': 'Topic and detection mode are required'}), 400
        
        if detection_mode not in ['text', 'face', 'audio']:
            return jsonify({'error': 'Invalid detection mode'}), 400
        
        # Detect emotion based on mode
        raw_emotion = None
        
        if detection_mode == 'text':
            text_input = data.get('text', '')
            if not text_input:
                return jsonify({'error': 'Text input is required for text detection'}), 400
            raw_emotion = text_detector.detect_emotion(text_input)
            
        elif detection_mode == 'face':
            # Face detection would process image data
            # For now, we'll simulate with a placeholder
            image_data = data.get('image', '')
            if not image_data:
                return jsonify({'error': 'Image data is required for face detection'}), 400
            raw_emotion = face_detector.detect_emotion(image_data)
            
        elif detection_mode == 'audio':
            # Audio detection would process audio data
            # For now, we'll simulate with a placeholder
            audio_data = data.get('audio', '')
            if not audio_data:
                return jsonify({'error': 'Audio data is required for audio detection'}), 400
            raw_emotion = audio_detector.detect_emotion(audio_data)
        
        # Map raw emotion to one of the 5 allowed emotions
        mapped_emotion = emotion_mapper.map_emotion(raw_emotion)
        
        # Generate adaptive learning response
        learning_response = learning_engine.generate_response(topic, mapped_emotion)
        
        return jsonify({
            'detected_emotion': mapped_emotion,
            'adaptive_learning_response': learning_response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    print("Starting Emotion Aware Personalized E-Learning Using Generative AI...")
    print("Access the application at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
