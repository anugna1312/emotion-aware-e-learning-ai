"""
Audio Emotion Detection Module
Detects emotions from audio input using speech emotion recognition techniques.
"""

import base64
import numpy as np
import random
from typing import Dict, List

class AudioEmotionDetector:
    """
    Detects emotions from audio recordings.
    This is a simplified implementation for demonstration purposes.
    In a production environment, you would use libraries like:
    - librosa for audio feature extraction
    - pyAudioAnalysis for emotion recognition
    - SpeechRecognition for transcription + text emotion analysis
    """
    
    def __init__(self):
        # Standard emotion categories from audio emotion models
        self.standard_emotions = [
            'angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'
        ]
        
        # Audio feature ranges for emotion detection
        self.emotion_feature_ranges = {
            'angry': {
                'pitch_mean': (200, 400),
                'energy': (0.7, 1.0),
                'speech_rate': (3.0, 5.0),
                'spectral_centroid': (3000, 5000)
            },
            'happy': {
                'pitch_mean': (150, 300),
                'energy': (0.5, 0.8),
                'speech_rate': (2.5, 4.0),
                'spectral_centroid': (2500, 4000)
            },
            'sad': {
                'pitch_mean': (80, 150),
                'energy': (0.1, 0.4),
                'speech_rate': (1.0, 2.0),
                'spectral_centroid': (1500, 2500)
            },
            'neutral': {
                'pitch_mean': (100, 200),
                'energy': (0.3, 0.6),
                'speech_rate': (2.0, 3.0),
                'spectral_centroid': (2000, 3000)
            },
            'fearful': {
                'pitch_mean': (250, 450),
                'energy': (0.4, 0.7),
                'speech_rate': (3.5, 6.0),
                'spectral_centroid': (3500, 5500)
            },
            'surprised': {
                'pitch_mean': (200, 350),
                'energy': (0.6, 0.9),
                'speech_rate': (3.0, 4.5),
                'spectral_centroid': (3000, 4500)
            },
            'disgusted': {
                'pitch_mean': (120, 250),
                'energy': (0.3, 0.6),
                'speech_rate': (2.0, 3.5),
                'spectral_centroid': (2000, 3500)
            }
        }
        
        # Initialize audio processing components (placeholders)
        # In real implementation:
        # import librosa
        # import pyaudio
        # from scipy.io import wavfile
        
    def detect_emotion(self, audio_data: str) -> str:
        """
        Detects emotion from audio data.
        
        Args:
            audio_data (str): Base64 encoded audio data
            
        Returns:
            str: Detected emotion (will be mapped later to one of the 5 categories)
        """
        try:
            # Decode base64 audio
            decoded_audio = self._decode_base64_audio(audio_data)
            
            if decoded_audio is None:
                return 'neutral'
            
            # Extract audio features
            features = self._extract_audio_features(decoded_audio)
            
            if not features:
                return 'neutral'
            
            # Predict emotion based on features
            predicted_emotion = self._predict_emotion_from_features(features)
            
            return predicted_emotion
            
        except Exception as e:
            print(f"Error in audio emotion detection: {e}")
            return 'neutral'
    
    def _decode_base64_audio(self, base64_string: str) -> np.ndarray:
        """
        Decodes base64 audio string to numpy array.
        
        Args:
            base64_string (str): Base64 encoded audio
            
        Returns:
            np.ndarray: Decoded audio array or None if failed
        """
        try:
            # Remove data URL prefix if present
            if ',' in base64_string:
                base64_string = base64_string.split(',')[1]
            
            # Decode base64
            audio_bytes = base64.b64decode(base64_string)
            
            # In real implementation, convert to numpy array using librosa
            # audio_array, sample_rate = librosa.load(io.BytesIO(audio_bytes), sr=16000)
            
            # For demonstration, return a dummy array
            sample_rate = 16000
            duration = 3.0  # 3 seconds
            audio_array = np.random.randn(int(sample_rate * duration)) * 0.1
            
            return audio_array
            
        except Exception as e:
            print(f"Error decoding audio: {e}")
            return None
    
    def _extract_audio_features(self, audio: np.ndarray) -> Dict[str, float]:
        """
        Extracts emotion-related features from audio.
        
        Args:
            audio (np.ndarray): Audio signal
            
        Returns:
            Dict[str, float]: Feature dictionary
        """
        try:
            # Simulate different emotion patterns in audio
            emotion_type = random.choice(['happy', 'sad', 'angry', 'surprised', 'neutral', 'confused', 'frustrated', 'bored', 'engaged'])
            
            if emotion_type == 'happy':
                features = {
                    'pitch_mean': random.uniform(180, 300),  # Higher pitch
                    'pitch_std': random.uniform(20, 40),
                    'energy': random.uniform(0.6, 0.9),  # Higher energy
                    'energy_std': random.uniform(0.1, 0.3),
                    'spectral_centroid': random.uniform(2500, 4500),
                    'spectral_bandwidth': random.uniform(800, 1800),
                    'speech_rate': random.uniform(2.5, 4.5),  # Faster speech
                    'zero_crossing_rate': random.uniform(0.05, 0.15)
                }
            elif emotion_type == 'sad':
                features = {
                    'pitch_mean': random.uniform(80, 140),  # Lower pitch
                    'pitch_std': random.uniform(10, 25),
                    'energy': random.uniform(0.1, 0.4),  # Lower energy
                    'energy_std': random.uniform(0.05, 0.15),
                    'spectral_centroid': random.uniform(1500, 2500),
                    'spectral_bandwidth': random.uniform(400, 1000),
                    'speech_rate': random.uniform(1.0, 2.0),  # Slower speech
                    'zero_crossing_rate': random.uniform(0.02, 0.08)
                }
            elif emotion_type == 'angry':
                features = {
                    'pitch_mean': random.uniform(250, 400),  # High pitch
                    'pitch_std': random.uniform(30, 60),
                    'energy': random.uniform(0.7, 1.0),  # High energy
                    'energy_std': random.uniform(0.2, 0.4),
                    'spectral_centroid': random.uniform(3500, 5500),
                    'spectral_bandwidth': random.uniform(1200, 2200),
                    'speech_rate': random.uniform(3.5, 6.0),  # Fast speech
                    'zero_crossing_rate': random.uniform(0.1, 0.2)
                }
            elif emotion_type == 'surprised':
                features = {
                    'pitch_mean': random.uniform(200, 350),  # Variable pitch
                    'pitch_std': random.uniform(40, 80),  # High variation
                    'energy': random.uniform(0.5, 0.8),
                    'energy_std': random.uniform(0.2, 0.4),
                    'spectral_centroid': random.uniform(3000, 5000),
                    'spectral_bandwidth': random.uniform(1000, 2000),
                    'speech_rate': random.uniform(3.0, 5.0),
                    'zero_crossing_rate': random.uniform(0.08, 0.18)
                }
            elif emotion_type == 'confused':
                features = {
                    'pitch_mean': random.uniform(120, 200),
                    'pitch_std': random.uniform(25, 50),
                    'energy': random.uniform(0.3, 0.6),
                    'energy_std': random.uniform(0.15, 0.3),
                    'spectral_centroid': random.uniform(2000, 3500),
                    'spectral_bandwidth': random.uniform(600, 1400),
                    'speech_rate': random.uniform(2.0, 3.5),  # Hesitant speech
                    'zero_crossing_rate': random.uniform(0.04, 0.12)
                }
            elif emotion_type == 'frustrated':
                features = {
                    'pitch_mean': random.uniform(200, 320),  # Higher, strained pitch
                    'pitch_std': random.uniform(35, 65),
                    'energy': random.uniform(0.6, 0.9),
                    'energy_std': random.uniform(0.2, 0.35),
                    'spectral_centroid': random.uniform(3000, 4800),
                    'spectral_bandwidth': random.uniform(1000, 2000),
                    'speech_rate': random.uniform(4.0, 6.5),  # Fast, rushed speech
                    'zero_crossing_rate': random.uniform(0.08, 0.16)
                }
            elif emotion_type == 'bored':
                features = {
                    'pitch_mean': random.uniform(100, 160),  # Low, monotone pitch
                    'pitch_std': random.uniform(5, 15),  # Low variation
                    'energy': random.uniform(0.2, 0.4),  # Low energy
                    'energy_std': random.uniform(0.05, 0.12),
                    'spectral_centroid': random.uniform(1800, 2800),
                    'spectral_bandwidth': random.uniform(500, 1100),
                    'speech_rate': random.uniform(1.5, 2.5),  # Slow, monotone
                    'zero_crossing_rate': random.uniform(0.02, 0.06)
                }
            elif emotion_type == 'engaged':
                features = {
                    'pitch_mean': random.uniform(150, 250),  # Moderate, steady pitch
                    'pitch_std': random.uniform(15, 30),
                    'energy': random.uniform(0.5, 0.8),  # Good energy
                    'energy_std': random.uniform(0.1, 0.2),
                    'spectral_centroid': random.uniform(2500, 4000),
                    'spectral_bandwidth': random.uniform(800, 1600),
                    'speech_rate': random.uniform(2.8, 4.2),  # Steady, clear speech
                    'zero_crossing_rate': random.uniform(0.06, 0.12)
                }
            else:  # neutral
                features = {
                    'pitch_mean': random.uniform(120, 200),
                    'pitch_std': random.uniform(15, 30),
                    'energy': random.uniform(0.3, 0.6),
                    'energy_std': random.uniform(0.1, 0.2),
                    'spectral_centroid': random.uniform(2000, 3500),
                    'spectral_bandwidth': random.uniform(600, 1400),
                    'speech_rate': random.uniform(2.0, 3.0),
                    'zero_crossing_rate': random.uniform(0.04, 0.1)
                }
            
            return features
            
        except Exception as e:
            console.error('Error extracting audio features:', e)
            return {}
    
    def _predict_emotion_from_features(self, features: Dict[str, float]) -> str:
        """
        Predicts emotion based on audio features.
        
        Args:
            features (Dict[str, float]): Audio feature dictionary
            
        Returns:
            str: Predicted emotion
        """
        try:
            # Calculate similarity scores for each emotion
            emotion_scores = {}
            
            for emotion, ranges in self.emotion_feature_ranges.items():
                score = 0
                feature_count = 0
                
                for feature_name, (min_val, max_val) in ranges.items():
                    if feature_name in features:
                        feature_value = features[feature_name]
                        
                        # Calculate how well the feature fits the expected range
                        if min_val <= feature_value <= max_val:
                            score += 1.0
                        else:
                            # Partial score based on distance from range
                            distance = min(abs(feature_value - min_val), abs(feature_value - max_val))
                            range_width = max_val - min_val
                            partial_score = max(0, 1.0 - (distance / range_width))
                            score += partial_score
                        
                        feature_count += 1
                
                # Normalize score
                if feature_count > 0:
                    emotion_scores[emotion] = score / feature_count
            
            # Get emotion with highest score
            if emotion_scores:
                predicted_emotion = max(emotion_scores, key=emotion_scores.get)
                
                # Enhanced emotion mapping based on audio patterns
                pitch_mean = features.get('pitch_mean', 200)
                energy = features.get('energy', 0.5)
                speech_rate = features.get('speech_rate', 2.0)
                
                # Refine prediction based on specific audio patterns
                if pitch_mean > 300 and energy > 0.7:
                    return 'angry'  # High pitch, high energy
                elif pitch_mean > 250 and speech_rate > 4.0:
                    return 'frustrated'  # High pitch, fast speech
                elif pitch_mean < 120 and energy < 0.3:
                    return 'bored'  # Low pitch, low energy
                elif pitch_mean > 180 and energy > 0.6:
                    return 'happy'  # Moderate-high pitch, good energy
                elif speech_rate > 3.5 and energy > 0.5:
                    return 'engaged'  # Fast speech, good energy
                elif pitch_mean < 150 or energy < 0.4:
                    return 'confused'  # Low pitch or low energy
                else:
                    return predicted_emotion
                
                return predicted_emotion
            else:
                return 'neutral'
                
        except Exception as e:
            print(f"Error predicting emotion from features: {e}")
            return 'neutral'
    
    def get_emotion_confidence(self, audio_data: str) -> Dict[str, float]:
        """
        Returns emotion confidence scores.
        
        Args:
            audio_data (str): Base64 encoded audio data
            
        Returns:
            Dict[str, float]: Dictionary mapping emotions to confidence scores
        """
        try:
            # In real implementation, this would return actual model probabilities
            # For demonstration, simulate confidence scores
            
            detected_emotion = self.detect_emotion(audio_data)
            
            # Generate confidence scores
            confidences = {}
            for emotion in self.standard_emotions:
                if emotion == detected_emotion:
                    confidences[emotion] = random.uniform(0.6, 0.9)
                else:
                    confidences[emotion] = random.uniform(0.0, 0.4)
            
            # Normalize to sum to 1
            total = sum(confidences.values())
            if total > 0:
                confidences = {k: v/total for k, v in confidences.items()}
            
            return confidences
            
        except Exception as e:
            print(f"Error getting emotion confidence: {e}")
            return {emotion: 0.0 for emotion in self.standard_emotions}
    
    def analyze_speech_characteristics(self, audio_data: str) -> Dict[str, any]:
        """
        Analyzes speech characteristics for detailed feedback.
        
        Args:
            audio_data (str): Base64 encoded audio data
            
        Returns:
            Dict[str, any]: Speech analysis results
        """
        try:
            decoded_audio = self._decode_base64_audio(audio_data)
            if decoded_audio is None:
                return {}
            
            features = self._extract_audio_features(decoded_audio)
            
            analysis = {
                'speaking_rate': features.get('speech_rate', 0),
                'volume_level': features.get('energy', 0),
                'pitch_variation': features.get('pitch_std', 0),
                'clarity_score': random.uniform(0.6, 0.95),  # Placeholder
                'duration_seconds': len(decoded_audio) / 16000,  # Assuming 16kHz sample rate
                'has_speech': features.get('energy', 0) > 0.1
            }
            
            return analysis
            
        except Exception as e:
            print(f"Error analyzing speech characteristics: {e}")
            return {}
    
    def is_speech_present(self, audio_data: str) -> bool:
        """
        Checks if speech is present in the audio.
        
        Args:
            audio_data (str): Base64 encoded audio data
            
        Returns:
            bool: True if speech is detected, False otherwise
        """
        try:
            decoded_audio = self._decode_base64_audio(audio_data)
            if decoded_audio is None:
                return False
            
            features = self._extract_audio_features(decoded_audio)
            
            # Simple speech detection based on energy
            energy_threshold = 0.05
            return features.get('energy', 0) > energy_threshold
            
        except Exception as e:
            print(f"Error checking speech presence: {e}")
            return False
