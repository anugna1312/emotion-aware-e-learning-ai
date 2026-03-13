// Camera and Audio Fix Helper
window.fixCameraAudio = {
    
    // Enhanced camera start with better error handling
    async startCamera() {
        try {
            console.log('Starting camera with enhanced error handling...');
            
            // Check browser support
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera not supported in this browser');
            }
            
            // Try multiple camera configurations
            const configs = [
                { video: { width: 640, height: 480, facingMode: 'user' } },
                { video: { width: 320, height: 240, facingMode: 'user' } },
                { video: true },
                { video: { facingMode: 'environment' } },
                { video: { facingMode: 'user' } }
            ];
            
            let stream = null;
            let lastError = null;
            
            for (let i = 0; i < configs.length; i++) {
                try {
                    console.log(`Trying camera config ${i + 1}:`, configs[i]);
                    stream = await navigator.mediaDevices.getUserMedia(configs[i]);
                    console.log('Camera started with config:', configs[i]);
                    break;
                } catch (error) {
                    console.log(`Config ${i + 1} failed:`, error);
                    lastError = error;
                    continue;
                }
            }
            
            if (!stream) {
                throw lastError || new Error('All camera configurations failed');
            }
            
            // Set video stream
            const video = document.getElementById('webcam');
            if (video) {
                video.srcObject = stream;
                
                // Wait for video to load
                video.onloadedmetadata = () => {
                    video.play();
                    console.log('Camera video playing');
                    
                    // Update UI
                    const startBtn = document.getElementById('startWebcam');
                    const stopBtn = document.getElementById('stopWebcam');
                    const captureBtn = document.getElementById('captureFace');
                    
                    if (startBtn) startBtn.disabled = true;
                    if (stopBtn) stopBtn.disabled = false;
                    if (captureBtn) captureBtn.disabled = false;
                };
            }
            
            return stream;
            
        } catch (error) {
            console.error('Camera failed:', error);
            
            // Show helpful error message
            const errorMsg = this.getCameraErrorMessage(error);
            alert(errorMsg);
            
            throw error;
        }
    },

    // Capture face from camera
    captureFace() {
        try {
            console.log('Capturing face...');
            
            const video = document.getElementById('webcam');
            const canvas = document.getElementById('faceCanvas');
            
            if (!video || !canvas) {
                throw new Error('Video or canvas element not found');
            }
            
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            
            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to base64
            const imageData = canvas.toDataURL('image/jpeg');
            console.log('Face captured, image data length:', imageData.length);
            
            // Store for emotion detection
            if (window.emotionLearningSystem) {
                window.emotionLearningSystem.capturedImage = imageData;
                window.emotionLearningSystem.checkAnalyzeButton();
            }
            
            // Show success message
            this.showStatus('Face captured successfully!', 'success');
            
            return imageData;
            
        } catch (error) {
            console.error('Face capture failed:', error);
            this.showStatus('Face capture failed: ' + error.message, 'danger');
            throw error;
        }
    },
    
    async startMicrophone() {
        try {
            console.log('Starting microphone with enhanced error handling...');
            
            // Check browser support
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Microphone not supported in this browser');
            }
            
            // Try multiple audio configurations
            const configs = [
                { audio: { echoCancellation: true, noiseSuppression: true } },
                { audio: { echoCancellation: false, noiseSuppression: false } },
                { audio: true }
            ];
            
            let stream = null;
            let lastError = null;
            
            for (let i = 0; i < configs.length; i++) {
                try {
                    console.log(`Trying audio config ${i + 1}:`, configs[i]);
                    stream = await navigator.mediaDevices.getUserMedia(configs[i]);
                    console.log('Microphone started with config:', configs[i]);
                    break;
                } catch (error) {
                    console.log(`Audio config ${i + 1} failed:`, error);
                    lastError = error;
                    continue;
                }
            }
            
            if (!stream) {
                throw lastError || new Error('All microphone configurations failed');
            }
            
            // Setup media recorder
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioBase64 = await this.blobToBase64(audioBlob);
                
                // Store for emotion detection
                if (window.emotionLearningSystem) {
                    window.emotionLearningSystem.recordedAudio = audioBase64;
                    window.emotionLearningSystem.checkAnalyzeButton();
                }
                
                // Show audio playback
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioPlayback = document.getElementById('audioPlayback');
                if (audioPlayback) {
                    audioPlayback.src = audioUrl;
                    audioPlayback.style.display = 'block';
                }
                
                // Update UI
                const playBtn = document.getElementById('playRecording');
                if (playBtn) playBtn.disabled = false;
                
                this.showStatus('Audio recorded successfully!', 'success');
            };
            
            // Store recorder globally
            window.audioRecorder = mediaRecorder;
            window.audioStream = stream;
            window.audioChunks = audioChunks;
            
            return stream;
            
        } catch (error) {
            console.error('Microphone failed:', error);
            
            // Show helpful error message
            const errorMsg = this.getMicrophoneErrorMessage(error);
            alert(errorMsg);
            
            throw error;
        }
    },

    // Start audio recording
    startAudioRecording() {
        try {
            console.log('Starting audio recording...');
            
            if (!window.audioRecorder) {
                throw new Error('Audio recorder not initialized');
            }
            
            window.audioRecorder.start();
            console.log('Audio recording started');
            
            // Update UI
            const startBtn = document.getElementById('startRecording');
            const stopBtn = document.getElementById('stopRecording');
            
            if (startBtn) startBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            
            this.showStatus('Recording audio...', 'info');
            
        } catch (error) {
            console.error('Start recording failed:', error);
            this.showStatus('Start recording failed: ' + error.message, 'danger');
        }
    },

    // Stop audio recording
    stopAudioRecording() {
        try {
            console.log('Stopping audio recording...');
            
            if (!window.audioRecorder) {
                throw new Error('Audio recorder not initialized');
            }
            
            window.audioRecorder.stop();
            console.log('Audio recording stopped');
            
            // Update UI
            const startBtn = document.getElementById('startRecording');
            const stopBtn = document.getElementById('stopRecording');
            
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            
        } catch (error) {
            console.error('Stop recording failed:', error);
            this.showStatus('Stop recording failed: ' + error.message, 'danger');
        }
    },

    // Convert blob to base64
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    },

    // Show status message
    showStatus(message, type) {
        const statusContainer = document.getElementById('statusContainer');
        if (statusContainer) {
            statusContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                const alert = statusContainer.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }
    },
    
    getCameraErrorMessage(error) {
        const errorMessages = {
            'NotAllowedError': 'Camera permission denied! Please:\n1. Click the camera icon in address bar\n2. Select "Allow"\n3. Refresh the page',
            'NotFoundError': 'No camera found! Please connect a camera and try again.',
            'NotReadableError': 'Camera is being used by another app! Please close other camera apps.',
            'OverconstrainedError': 'Camera does not support required settings! Trying different settings...',
            'TypeError': 'Camera API not supported! Please try a different browser.',
            'default': 'Camera access failed! Please:\n1. Check camera permissions\n2. Close other camera apps\n3. Refresh the page\n4. Try different browser'
        };
        
        return errorMessages[error.name] || errorMessages['default'];
    },
    
    getMicrophoneErrorMessage(error) {
        const errorMessages = {
            'NotAllowedError': 'Microphone permission denied! Please:\n1. Click the microphone icon in address bar\n2. Select "Allow"\n3. Refresh the page',
            'NotFoundError': 'No microphone found! Please connect a microphone and try again.',
            'NotReadableError': 'Microphone is being used by another app! Please close other audio apps.',
            'OverconstrainedError': 'Microphone does not support required settings! Trying different settings...',
            'TypeError': 'Microphone API not supported! Please try a different browser.',
            'default': 'Microphone access failed! Please:\n1. Check microphone permissions\n2. Close other audio apps\n3. Refresh the page\n4. Try different browser'
        };
        
        return errorMessages[error.name] || errorMessages['default'];
    },
    
    // Test permissions
    async testPermissions() {
        try {
            // Test camera
            const cameraStream = await this.startCamera();
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                console.log('Camera permission: ✅ OK');
            }
        } catch (error) {
            console.log('Camera permission: ❌ FAILED');
        }
        
        try {
            // Test microphone
            const micStream = await this.startMicrophone();
            if (micStream) {
                micStream.getTracks().forEach(track => track.stop());
                console.log('Microphone permission: ✅ OK');
            }
        } catch (error) {
            console.log('Microphone permission: ❌ FAILED');
        }
    }
};

// Auto-test permissions when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Testing camera and microphone permissions...');
    window.fixCameraAudio.testPermissions();
});
