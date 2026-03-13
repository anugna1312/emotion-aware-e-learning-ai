"""
Text Emotion Detection Module
Analyzes text input to detect emotional states using NLP techniques.
"""

import re
from typing import Dict, List
import random

class TextEmotionDetector:
    """
    Detects emotions from text input using keyword-based analysis.
    This is a simplified implementation for demonstration purposes.
    In a production environment, you would use more sophisticated NLP models.
    """
    
    def __init__(self):
        # Emotion keywords for each category
        self.emotion_keywords = {
            'confused': [
                'confused', 'unclear', 'don\'t understand', 'lost', 'puzzled',
                'uncertain', 'what does', 'how does', 'why is', 'not sure',
                'difficult', 'complicated', 'hard to follow', 'unclear',
                'what do you mean', 'explain again', 'don\'t get it',
                'makes no sense', 'confusing', 'uncertain', 'ambiguous'
            ],
            'frustrated': [
                'frustrated', 'annoyed', 'stuck', 'can\'t', 'impossible',
                'difficult', 'hard', 'struggling', 'giving up', 'hate this',
                'too hard', 'can\'t do this', 'wrong', 'error', 'failed',
                'not working', 'broken', 'stupid', 'useless', 'waste of time',
                'angry', 'mad', 'irritated', 'upset', 'disappointed'
            ],
            'bored': [
                'bored', 'boring', 'uninteresting', 'dull', 'tedious',
                'monotonous', 'slow', 'unexciting', 'blah', 'whatever',
                'not interested', 'don\'t care', 'pointless', 'meaningless',
                'tired', 'sleepy', 'unengaged', 'apathetic', 'indifferent',
                'when will this end', 'can we move on', 'this is taking too long'
            ],
            'happy': [
                'happy', 'great', 'excellent', 'awesome', 'fantastic',
                'love this', 'amazing', 'wonderful', 'perfect', 'good',
                'nice', 'cool', 'fun', 'enjoy', 'like', 'pleased',
                'satisfied', 'glad', 'delighted', 'thrilled', 'excited',
                'finally', 'got it', 'understand now', 'makes sense'
            ],
            'engaged': [
                'interested', 'curious', 'want to know', 'fascinating',
                'tell me more', 'how about', 'what if', 'can we',
                'let\'s try', 'explore', 'discover', 'learn', 'understand',
                'focused', 'attentive', 'motivated', 'eager', 'enthusiastic',
                'ready', 'let\'s start', 'continue', 'next', 'proceed'
            ]
        }
        
        # Intensity modifiers
        self.intensity_words = {
            'very': 1.5,
            'extremely': 2.0,
            'really': 1.3,
            'so': 1.4,
            'quite': 1.2,
            'a bit': 0.7,
            'kind of': 0.8,
            'somewhat': 0.9,
            'slightly': 0.6
        }
        
        # Negation words
        self.negation_words = ['not', 'no', 'never', 'don\'t', 'doesn\'t', 'didn\'t', 'won\'t', 'can\'t']
    
    def detect_emotion(self, text: str) -> str:
        """
        Detects emotion from given text.
        
        Args:
            text (str): Input text to analyze
            
        Returns:
            str: Detected emotion (will be mapped later to one of 5 categories)
        """
        if not text or not text.strip():
            return 'neutral'
        
        # Preprocess text
        processed_text = text.lower().strip()
        
        # Quick keyword detection for speed - Enhanced with more keywords
        if any(word in processed_text for word in [
            'confused', 'unclear', 'don\'t understand', 'lost', 'puzzled', 'confusing', 
            'difficult', 'hard', 'struggle', 'help', 'what', 'how', 'why', 'explain',
            'don\'t get', 'don\'t know', 'uncertain', 'unsure', 'mixed up'
        ]):
            return 'confused'
        elif any(word in processed_text for word in [
            'frustrated', 'annoyed', 'stuck', 'can\'t', 'impossible', 'angry', 'mad',
            'irritated', 'upset', 'fed up', 'sick of', 'hate', 'worst', 'terrible',
            'useless', 'waste', 'giving up', 'quit', 'stop', 'can\'t do'
        ]):
            return 'frustrated'
        elif any(word in processed_text for word in [
            'bored', 'boring', 'uninteresting', 'tired', 'sleepy', 'dull', 'monotonous',
            'same old', 'routine', 'tedious', 'repetitive', 'slow', 'drag', 'blah',
            'don\'t care', 'whatever', 'meh', 'uninspired', 'not fun'
        ]):
            return 'bored'
        elif any(word in processed_text for word in [
            'happy', 'excited', 'great', 'love', 'enjoy', 'awesome', 'fantastic',
            'wonderful', 'amazing', 'excellent', 'perfect', 'brilliant', 'fun',
            'like', 'good', 'best', 'cool', 'nice', 'pleased', 'glad', 'cheerful'
        ]):
            return 'happy'
        elif any(word in processed_text for word in [
            'engaged', 'focused', 'interested', 'ready', 'excited', 'motivated',
            'eager', 'enthusiastic', 'curious', 'want to learn', 'looking forward',
            'can\'t wait', 'ready to start', 'let\'s begin', 'interested in'
        ]):
            return 'engaged'
        
        # Default to neutral if no keywords found
        return 'neutral'
    
    def _calculate_emotion_scores(self, text: str) -> Dict[str, float]:
        """
        Calculates emotion scores based on keyword matching.
        
        Args:
            text (str): Preprocessed text
            
        Returns:
            Dict[str, float]: Dictionary mapping emotions to scores
        """
        emotion_scores = {}
        
        # Check for negation
        has_negation = any(neg in text for neg in self.negation_words)
        
        # Calculate intensity modifier
        intensity = 1.0
        for word, modifier in self.intensity_words.items():
            if word in text:
                intensity = modifier
                break
        
        # Score each emotion
        for emotion, keywords in self.emotion_keywords.items():
            score = 0
            for keyword in keywords:
                # Count occurrences of keyword
                count = len(re.findall(r'\b' + re.escape(keyword) + r'\b', text))
                score += count
            
            # Apply intensity modifier
            score *= intensity
            
            # Apply negation (reduces the score)
            if has_negation:
                score *= 0.3
            
            emotion_scores[emotion] = score
        
        return emotion_scores
    
    def get_emotion_confidence(self, text: str) -> Dict[str, float]:
        """
        Returns emotion scores normalized to confidence values (0-1).
        
        Args:
            text (str): Input text to analyze
            
        Returns:
            Dict[str, float]: Dictionary mapping emotions to confidence scores
        """
        emotion_scores = self._calculate_emotion_scores(text.lower())
        
        if not emotion_scores or sum(emotion_scores.values()) == 0:
            return {emotion: 0.0 for emotion in self.emotion_keywords.keys()}
        
        # Normalize scores to 0-1 range
        max_score = max(emotion_scores.values())
        normalized_scores = {
            emotion: score / max_score if max_score > 0 else 0.0
            for emotion, score in emotion_scores.items()
        }
        
        return normalized_scores
    
    def add_custom_keywords(self, emotion: str, keywords: List[str]) -> bool:
        """
        Adds custom keywords for an emotion.
        
        Args:
            emotion (str): Emotion category
            keywords (List[str]): List of keywords to add
            
        Returns:
            bool: True if keywords were added successfully
        """
        if emotion.lower() in self.emotion_keywords:
            self.emotion_keywords[emotion.lower()].extend([k.lower() for k in keywords])
            return True
        return False
