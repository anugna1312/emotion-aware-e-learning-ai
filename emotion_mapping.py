"""
Emotion Mapping Module
Maps raw emotion detection outputs to the 5 specified emotion categories:
- Confused
- Frustrated
- Bored
- Happy
- Engaged
"""

class EmotionMapper:
    """
    Maps various emotion model outputs to the 5 allowed emotion categories.
    This ensures consistency across all detection modalities.
    """
    
    def __init__(self):
        # Define the 5 allowed emotions
        self.allowed_emotions = ['confused', 'frustrated', 'bored', 'happy', 'engaged', 'neutral']
        
        # Mapping dictionary for common emotion model outputs
        # Keys are common emotions from various models, values are our 5 categories
        self.emotion_mapping = {
            # Direct mappings (already match our categories)
            'confused': 'confused',
            'frustrated': 'frustrated',
            'bored': 'bored',
            'happy': 'happy',
            'engaged': 'engaged',
            
            # Negative emotions -> map to frustrated or confused
            'angry': 'frustrated',
            'sad': 'frustrated',
            'disgusted': 'frustrated',
            'fear': 'confused',
            'anxious': 'confused',
            'worried': 'confused',
            'stressed': 'frustrated',
            'annoyed': 'frustrated',
            'irritated': 'frustrated',
            
            # Neutral/low engagement -> map to bored (but keep some as neutral for variety)
            'neutral': 'neutral',
            'calm': 'neutral',
            'relaxed': 'neutral',
            'sleepy': 'bored',
            'tired': 'bored',
            'uninterested': 'bored',
            'apathetic': 'bored',
            
            # Positive emotions -> map to happy or engaged
            'excited': 'engaged',
            'joyful': 'happy',
            'pleased': 'happy',
            'satisfied': 'happy',
            'content': 'happy',
            'enthusiastic': 'engaged',
            'interested': 'engaged',
            'curious': 'engaged',
            'focused': 'engaged',
            'attentive': 'engaged',
            'motivated': 'engaged',
            
            # Other common emotions
            'surprised': 'confused',  # Surprise often indicates confusion
            'shocked': 'confused',
            'embarrassed': 'frustrated',
            'guilty': 'frustrated',
            'proud': 'happy',
            'hopeful': 'engaged',
            'grateful': 'happy'
        }
    
    def map_emotion(self, raw_emotion):
        """
        Maps a raw emotion string to one of the 5 allowed emotions.
        
        Args:
            raw_emotion (str): The raw emotion output from detection models
            
        Returns:
            str: One of the 5 allowed emotions: 'confused', 'frustrated', 'bored', 'happy', 'engaged'
        """
        if not raw_emotion:
            return 'bored'  # Default emotion when no emotion detected
        
        # Convert to lowercase and strip whitespace
        emotion = str(raw_emotion).lower().strip()
        
        # Direct mapping lookup
        if emotion in self.emotion_mapping:
            return self.emotion_mapping[emotion]
        
        # Fuzzy matching for partial matches
        for key, value in self.emotion_mapping.items():
            if key in emotion or emotion in key:
                return value
        
        # If no match found, default to 'bored' (neutral state)
        return 'bored'
    
    def is_valid_emotion(self, emotion):
        """
        Checks if an emotion is one of the 5 allowed emotions.
        
        Args:
            emotion (str): Emotion to check
            
        Returns:
            bool: True if emotion is valid, False otherwise
        """
        return emotion.lower() in self.allowed_emotions
    
    def get_allowed_emotions(self):
        """
        Returns the list of allowed emotions.
        
        Returns:
            list: List of 5 allowed emotion strings
        """
        return self.allowed_emotions.copy()
    
    def add_custom_mapping(self, raw_emotion, mapped_emotion):
        """
        Adds a custom emotion mapping.
        
        Args:
            raw_emotion (str): Raw emotion to map from
            mapped_emotion (str): Target emotion (must be one of the 5 allowed)
            
        Returns:
            bool: True if mapping was added successfully, False otherwise
        """
        if mapped_emotion.lower() in self.allowed_emotions:
            self.emotion_mapping[raw_emotion.lower()] = mapped_emotion.lower()
            return True
        return False
