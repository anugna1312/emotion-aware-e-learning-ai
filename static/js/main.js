/**
 * Multimodal Emotion-Based Adaptive Learning System
 * Main JavaScript functionality
 */

class EmotionLearningSystem {
    constructor() {
        this.currentMode = null;
        this.webcamStream = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.capturedImage = null;
        this.recordedAudio = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        console.log('Initializing event listeners...'); // Debug log
        
        // Topic input
        document.getElementById('topicInput').addEventListener('input', () => {
            this.checkAnalyzeButton();
        });

        // Detection mode selection - using simple buttons
        const modeButtons = document.querySelectorAll('.mode-btn');
        console.log('Found mode buttons:', modeButtons.length); // Debug log
        
        if (modeButtons.length === 0) {
            console.error('No mode buttons found! Check HTML class names.');
            alert('Detection mode buttons not found! Please refresh the page.');
        }
        
        modeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log('Button clicked:', e.currentTarget); // Debug
                const mode = e.currentTarget.getAttribute('data-mode');
                console.log('Mode detected:', mode); // Debug
                
                if (!mode) {
                    console.error('No data-mode attribute found!');
                    return;
                }
                
                // Remove active class from all buttons
                modeButtons.forEach(btn => {
                    btn.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning');
                    btn.classList.add('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning');
                });
                
                // Add active class and solid color to clicked button
                e.currentTarget.classList.remove('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning');
                
                if (mode === 'text') {
                    e.currentTarget.classList.add('active', 'btn-primary');
                } else if (mode === 'face') {
                    e.currentTarget.classList.add('active', 'btn-success');
                } else if (mode === 'audio') {
                    e.currentTarget.classList.add('active', 'btn-warning');
                }
                
                console.log('Calling handleModeChange with mode:', mode);
                this.handleModeChange(mode);
            });
        });

        // Analyze button
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeEmotion();
        });

        // Test button
        document.getElementById('testBtn').addEventListener('click', () => {
            console.log('Test button clicked'); // Debug
            alert('Test button clicked!'); // Debug alert
            this.testEmotionDetection();
        });

        // Webcam controls
        document.getElementById('startWebcam').addEventListener('click', () => {
            this.startWebcam();
        });

        document.getElementById('stopWebcam').addEventListener('click', () => {
            this.stopWebcam();
        });

        document.getElementById('captureFace').addEventListener('click', () => {
            this.captureFace();
        });

        // Audio recording controls
        document.getElementById('startRecording').addEventListener('click', () => {
            this.startAudioRecording();
        });

        document.getElementById('stopRecording').addEventListener('click', () => {
            this.stopAudioRecording();
        });

        document.getElementById('playRecording').addEventListener('click', () => {
            this.playRecording();
        });
    }

    handleModeChange(mode) {
        console.log('Mode changed to:', mode); // Debug log
        this.currentMode = mode;
        
        // Hide all input panels
        document.querySelectorAll('.input-panel').forEach(panel => {
            panel.style.display = 'none';
        });

        // Show relevant input panel
        switch(mode) {
            case 'text':
                document.getElementById('textInputPanel').style.display = 'block';
                console.log('Showing text input panel'); // Debug log
                break;
            case 'face':
                document.getElementById('faceInputPanel').style.display = 'block';
                console.log('Showing face input panel'); // Debug log
                break;
            case 'audio':
                document.getElementById('audioInputPanel').style.display = 'block';
                console.log('Showing audio input panel'); // Debug log
                break;
        }

        this.checkAnalyzeButton();
    }

    checkAnalyzeButton() {
        const topic = document.getElementById('topicInput').value.trim();
        const analyzeBtn = document.getElementById('analyzeBtn');
        
        console.log('Checking analyze button:', {
            topic: topic,
            currentMode: this.currentMode,
            capturedImage: this.capturedImage,
            recordedAudio: this.recordedAudio
        }); // Debug log
        
        let canAnalyze = false;
        
        if (topic && this.currentMode) {
            switch(this.currentMode) {
                case 'text':
                    const textInput = document.getElementById('textInput').value.trim();
                    canAnalyze = textInput.length > 0;
                    console.log('Text mode - input:', textInput, 'canAnalyze:', canAnalyze);
                    break;
                case 'face':
                    canAnalyze = this.capturedImage !== null;
                    console.log('Face mode - capturedImage:', this.capturedImage, 'canAnalyze:', canAnalyze);
                    break;
                case 'audio':
                    canAnalyze = this.recordedAudio !== null;
                    console.log('Audio mode - recordedAudio:', this.recordedAudio, 'canAnalyze:', canAnalyze);
                    break;
            }
        } else {
            console.log('Cannot analyze - missing topic or mode');
        }

        console.log('Final canAnalyze:', canAnalyze);
        analyzeBtn.disabled = !canAnalyze;
        
        // Force enable for testing
        if (topic && this.currentMode) {
            analyzeBtn.disabled = false;
            console.log('Force enabled analyze button');
        }
    }

    async analyzeEmotion() {
        const topic = document.getElementById('topicInput').value.trim();
        let inputData = {};

        // Collect input data based on mode
        switch(this.currentMode) {
            case 'text':
                inputData.text = document.getElementById('textInput').value.trim();
                break;
            case 'face':
                inputData.image = this.capturedImage;
                break;
            case 'audio':
                inputData.audio = this.recordedAudio;
                break;
        }

        // Show loading modal
        const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
        loadingModal.show();

        try {
            const response = await fetch('/detect_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    mode: this.currentMode,
                    ...inputData
                })
            });

            const result = await response.json();

            if (response.ok) {
                this.displayResults(result);
                this.showStatus('Analysis completed successfully!', 'success');
            } else {
                throw new Error(result.error || 'Analysis failed');
            }

        } catch (error) {
            console.error('Error analyzing emotion:', error);
            this.showStatus(`Error: ${error.message}`, 'danger');
        } finally {
            loadingModal.hide();
        }
    }

    displayResults(result) {
        const resultsPanel = document.getElementById('resultsPanel');
        const detectedEmotion = document.getElementById('detectedEmotion');
        const confidenceScore = document.getElementById('confidenceScore');
        const timestamp = document.getElementById('timestamp');
        const learningResponse = document.getElementById('learningResponse');

        // Display detected emotion
        const emotionClass = `badge-${result.detected_emotion}`;
        detectedEmotion.innerHTML = `
            <span class="badge ${emotionClass} fs-6">
                <i class="fas fa-smile me-2"></i>${this.capitalizeFirst(result.detected_emotion)}
            </span>
        `;

        // Display confidence (simulated for demo)
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
        confidenceScore.innerHTML = `
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${confidence}%"></div>
            </div>
            <small class="text-muted">${confidence}% confidence</small>
        `;

        // Display timestamp
        const analysisTime = new Date(result.timestamp).toLocaleTimeString();
        timestamp.innerHTML = `<small class="text-muted">${analysisTime}</small>`;

        // Display learning response
        learningResponse.innerHTML = `
            <div class="learning-content">
                ${this.formatLearningResponse(result.adaptive_learning_response)}
            </div>
        `;

        // Show results panel
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth' });
    }

    formatLearningResponse(response) {
        // Convert markdown-like formatting to HTML
        let formatted = response
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/^### (.*$)/gm, '<h6>$1</h6>')
            .replace(/^## (.*$)/gm, '<h5>$1</h5>')
            .replace(/^# (.*$)/gm, '<h4>$1</h4>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');

        return formatted;
    }

    // Show loading modal
    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
    loadingModal.show();

    try {
        const response = await fetch('/detect_emotion', {
            this.webcamStream.getTracks().forEach(track => track.stop());
            document.getElementById('webcam').srcObject = null;
            this.webcamStream = null;

            document.getElementById('startWebcam').disabled = false;
            document.getElementById('stopWebcam').disabled = true;
            document.getElementById('captureFace').disabled = true;

            this.showStatus('Webcam stopped', 'info');
        }
    }

    captureFace() {
        const video = document.getElementById('webcam');
        const canvas = document.getElementById('faceCanvas');
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        this.capturedImage = canvas.toDataURL('image/jpeg');
        this.checkAnalyzeButton();

        this.showStatus('Face captured successfully', 'success');

        // Show captured image preview
        const preview = document.createElement('img');
        preview.src = this.capturedImage;
        preview.style.width = '100px';
        preview.style.height = '75px';
        preview.style.borderRadius = '10px';
        preview.style.border = '2px solid #007bff';
        
        const existingPreview = document.querySelector('.captured-preview');
        if (existingPreview) {
            existingPreview.remove();
        }

        preview.className = 'captured-preview mt-2';
        document.getElementById('captureFace').parentNode.appendChild(preview);
    }

    // Audio recording functionality
    async startAudioRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                this.recordedAudio = await this.blobToBase64(audioBlob);
                
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioPlayback = document.getElementById('audioPlayback');
                audioPlayback.src = audioUrl;
                audioPlayback.style.display = 'block';

                document.getElementById('playRecording').disabled = false;
                this.checkAnalyzeButton();

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            
            document.getElementById('startRecording').disabled = true;
            document.getElementById('stopRecording').disabled = false;

            // Start visualizer animation
            document.querySelector('.audio-visualizer').classList.add('recording');

            this.showStatus('Recording started', 'success');

        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showStatus('Error accessing microphone. Please check permissions.', 'danger');
        }
    }

    stopAudioRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            
            document.getElementById('startRecording').disabled = false;
            document.getElementById('stopRecording').disabled = true;

            // Stop visualizer animation
            document.querySelector('.audio-visualizer').classList.remove('recording');

            this.showStatus('Recording stopped', 'info');
        }
    }

    playRecording() {
        const audioPlayback = document.getElementById('audioPlayback');
        audioPlayback.play();
    }

    // Utility functions
    async blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showStatus(message, type) {
        const statusContainer = document.getElementById('statusMessages');
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show status-message`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        statusContainer.appendChild(alertDiv);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Cleanup on page unload
    cleanup() {
        this.stopWebcam();
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.stopAudioRecording();
        }
    }

    // Test method for quick emotion detection
    testEmotionDetection() {
        console.log('Testing emotion detection...');
        
        // Get current topic from input
        const topic = document.getElementById('topicInput').value.trim() || 'Python Programming';
        
        // Get current mode
        const mode = this.currentMode || 'text';
        
        // Dynamic test data based on mode
        let testData = {
            topic: topic,
            mode: mode
        };

        // Add mode-specific test data
        if (mode === 'text') {
            const textInput = document.getElementById('textInput').value.trim() || 'I am feeling happy and excited to learn!';
            testData.text = textInput;
        } else if (mode === 'face') {
            // For face mode, simulate different emotions randomly
            if (this.capturedImage) {
                testData.image = this.capturedImage;
            } else {
                // Simulate face detection with random emotion
                testData.image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';
            }
        } else if (mode === 'audio') {
            if (this.recordedAudio) {
                testData.audio = this.recordedAudio;
            } else {
                // Simulate audio with random emotion
                testData.audio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
            }
        }

        console.log('Sending test data:', testData);
        
        // Use fetch with .then() instead of async/await
        fetch('/detect_emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        })
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(result => {
            console.log('Test result:', result);
            
            if (result.detected_emotion) {
                alert('✅ Test successful! Emotion detected: ' + result.detected_emotion);
                this.displayResults(result);
                this.showStatus('Test successful!', 'success');
            } else {
                alert('❌ Test failed: ' + (result.error || 'Unknown error'));
                this.showStatus('Test failed: ' + (result.error || 'Unknown error'), 'danger');
            }
        })
        .catch(error => {
            console.error('Test error:', error);
            alert('❌ Test error: ' + error.message);
            this.showStatus('Test error: ' + error.message, 'danger');
        });
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.emotionLearningSystem = new EmotionLearningSystem();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.emotionLearningSystem) {
        window.emotionLearningSystem.cleanup();
    }
});

// Test method for quick emotion detection
window.testEmotionDetection = async function() {
    console.log('Testing emotion detection...');
    
    const testData = {
        topic: 'Python Programming',
        mode: 'text',
        text: 'I am confused about variables'
    };

    try {
        const response = await fetch('/detect_emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();
        console.log('Test result:', result);
        
        if (response.ok) {
            alert('Test successful! Emotion detected: ' + result.detected_emotion);
        } else {
            alert('Test failed: ' + result.error);
        }
    } catch (error) {
        console.error('Test error:', error);
        alert('Test error: ' + error.message);
    }
};

// Add some interactive visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Animate bars on hover for audio visualizer
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.addEventListener('mouseenter', () => {
            bar.style.height = Math.random() * 80 + 20 + 'px';
        });
        
        bar.addEventListener('mouseleave', () => {
            bar.style.height = '20px';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
