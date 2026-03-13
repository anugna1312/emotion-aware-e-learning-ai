// Complete Fix for All Issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('Complete fix loaded');
    
    // Fix detection mode buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    console.log('Found mode buttons:', modeButtons.length);
    
    modeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Mode button clicked:', this);
            
            const mode = this.getAttribute('data-mode');
            if (!mode) {
                console.error('No data-mode found!');
                return;
            }
            
            // Remove active from all buttons
            modeButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning');
                btn.classList.add('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning');
            });
            
            // Add active to clicked button
            this.classList.remove('btn-outline-primary', 'btn-outline-success', 'btn-outline-warning');
            
            if (mode === 'text') {
                this.classList.add('active', 'btn-primary');
                showPanel('textInputPanel');
            } else if (mode === 'face') {
                this.classList.add('active', 'btn-success');
                showPanel('faceInputPanel');
            } else if (mode === 'audio') {
                this.classList.add('active', 'btn-warning');
                showPanel('audioInputPanel');
            }
            
            console.log('Mode switched to:', mode);
        });
    });
    
    // Show panel function
    function showPanel(panelId) {
        const panels = document.querySelectorAll('.input-panel');
        panels.forEach(panel => panel.style.display = 'none');
        
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
            targetPanel.style.display = 'block';
            console.log('Panel shown:', panelId);
        }
    }
    
    // Enhanced camera button with better error handling
    const startWebcamBtn = document.getElementById('startWebcam');
    
    if (startWebcamBtn) {
        startWebcamBtn.addEventListener('click', async function(e) {
            console.log('Enhanced webcam button clicked');
            e.preventDefault();
            
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Requesting Permission...';
            this.disabled = true;
            
            try {
                // Check if camera is already active
                const video = document.getElementById('webcam');
                if (video && video.srcObject) {
                    console.log('Camera already active');
                    return;
                }
                
                console.log('Requesting camera permission...');
                
                // Request camera with multiple fallback options
                const constraints = [
                    { 
                        video: { 
                            width: { ideal: 640 },
                            height: { ideal: 480 },
                            facingMode: 'user'
                        } 
                    },
                    { 
                        video: { 
                            width: { ideal: 320 },
                            height: { ideal: 240 }
                        } 
                    },
                    { 
                        video: true 
                    },
                    { 
                        video: { 
                            facingMode: 'environment' 
                        } 
                    }
                ];
                
                let stream = null;
                let lastError = null;
                
                // Try each constraint option
                for (let i = 0; i < constraints.length; i++) {
                    try {
                        console.log(`Trying camera option ${i + 1}:`, constraints[i]);
                        stream = await navigator.mediaDevices.getUserMedia(constraints[i]);
                        console.log('Camera permission granted with option:', constraints[i]);
                        break; // Success!
                    } catch (error) {
                        console.log(`Camera option ${i + 1} failed:`, error);
                        lastError = error;
                        continue; // Try next option
                    }
                }
                
                if (stream) {
                    // Success - set up video
                    const video = document.getElementById('webcam');
                    if (video) {
                        video.srcObject = stream;
                        
                        video.onloadedmetadata = () => {
                            video.play();
                            console.log('Camera video playing successfully');
                            
                            // Update UI
                            this.innerHTML = '<i class="fas fa-video"></i>Camera Active';
                            this.disabled = true;
                            
                            const stopBtn = document.getElementById('stopWebcam');
                            const captureBtn = document.getElementById('captureFace');
                            
                            if (stopBtn) stopBtn.disabled = false;
                            if (captureBtn) captureBtn.disabled = false;
                            
                            showMessage('Camera started successfully! Click "Capture Emotion" to take a photo.', 'success');
                        };
                    }
                } else {
                    // All options failed
                    console.error('All camera options failed. Last error:', lastError);
                    
                    // Reset button
                    this.innerHTML = '<i class="fas fa-video"></i>Start Webcam';
                    this.disabled = false;
                    
                    // Show detailed error message
                    let errorMsg = 'Camera access failed!\n\n';
                    
                    if (lastError) {
                        switch(lastError.name) {
                            case 'NotAllowedError':
                                errorMsg += '❌ PERMISSION DENIED\n\n';
                                errorMsg += '🔧 **How to Fix:**\n';
                                errorMsg += '1. Look for camera icon 📷 in browser address bar\n';
                                errorMsg += '2. Click the camera icon\n';
                                errorMsg += '3. Select "Allow"\n';
                                errorMsg += '4. Refresh the page\n';
                                errorMsg += '5. Try again';
                                break;
                            case 'NotFoundError':
                                errorMsg += '❌ NO CAMERA FOUND\n\n';
                                errorMsg += '🔧 **How to Fix:**\n';
                                errorMsg += '1. Connect a camera to your computer\n';
                                errorMsg += '2. Make sure camera is working in other apps\n';
                                errorMsg += '3. Restart your browser\n';
                                errorMsg += '4. Try again';
                                break;
                            case 'NotReadableError':
                                errorMsg += '❌ CAMERA IN USE\n\n';
                                errorMsg += '🔧 **How to Fix:**\n';
                                errorMsg += '1. Close all other apps using camera\n';
                                errorMsg += '2. Close all browser tabs except this one\n';
                                errorMsg += '3. Restart your browser\n';
                                errorMsg += '4. Try again';
                                break;
                            case 'OverconstrainedError':
                                errorMsg += '❌ CAMERA SETTINGS ISSUE\n\n';
                                errorMsg += '🔧 **How to Fix:**\n';
                                errorMsg += '1. Try a different browser\n';
                                errorMsg += '2. Use basic camera settings\n';
                                errorMsg += '3. Restart your computer\n';
                                break;
                            default:
                                errorMsg += `❌ CAMERA ERROR: ${lastError.message}\n\n`;
                                errorMsg += '🔧 **How to Fix:**\n';
                                errorMsg += '1. Refresh the page\n';
                                errorMsg += '2. Try a different browser\n';
                                errorMsg += '3. Check your camera settings\n';
                                errorMsg += '4. Contact support if issue persists';
                        }
                    } else {
                        errorMsg += '❌ UNKNOWN CAMERA ERROR\n\n';
                        errorMsg += '🔧 **How to Fix:**\n';
                        errorMsg += '1. Refresh the page\n';
                        errorMsg += '2. Try a different browser\n';
                        errorMsg += '3. Check if camera is connected\n';
                        errorMsg += '4. Restart your computer';
                    }
                    
                    alert(errorMsg);
                    showMessage('Camera access failed. Please check the error message above.', 'danger');
                }
                
            } catch (error) {
                console.error('Camera button error:', error);
                this.innerHTML = '<i class="fas fa-video"></i>Start Webcam';
                this.disabled = false;
                showMessage('Camera button error: ' + error.message, 'danger');
            }
        });
    }
    
    // Fix capture button
    const captureFaceBtn = document.getElementById('captureFace');
    if (captureFaceBtn) {
        captureFaceBtn.addEventListener('click', function() {
            console.log('Capture face clicked');
            
            const video = document.getElementById('webcam');
            const canvas = document.getElementById('faceCanvas');
            
            if (!video || !canvas) {
                alert('Video or canvas not found!');
                return;
            }
            
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageData = canvas.toDataURL('image/jpeg');
            console.log('Face captured');
            
            // Store for analysis
            if (window.emotionLearningSystem) {
                window.emotionLearningSystem.capturedImage = imageData;
            }
            
            showMessage('Face captured successfully!', 'success');
        });
    }
    
    // Fix stop webcam button
    const stopWebcamBtn = document.getElementById('stopWebcam');
    if (stopWebcamBtn) {
        stopWebcamBtn.addEventListener('click', function() {
            console.log('Stop webcam clicked');
            
            const video = document.getElementById('webcam');
            if (video && video.srcObject) {
                const stream = video.srcObject;
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
            
            this.innerHTML = '<i class="fas fa-video"></i>Start Webcam';
            this.disabled = false;
            
            const startBtn = document.getElementById('startWebcam');
            const captureBtn = document.getElementById('captureFace');
            
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            if (captureBtn) captureBtn.disabled = true;
            
            showMessage('Camera stopped', 'info');
        });
    }
    
    // Fix audio buttons
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', async function() {
            console.log('Start recording clicked');
            
            this.innerHTML = '<i class="fas fa-microphone fa-spin"></i>Recording...';
            this.disabled = true;
            
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: { echoCancellation: true, noiseSuppression: true },
                    video: false 
                });
                
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];
                
                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };
                
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const reader = new FileReader();
                    
                    reader.onload = () => {
                        const audioBase64 = reader.result;
                        
                        if (window.emotionLearningSystem) {
                            window.emotionLearningSystem.recordedAudio = audioBase64;
                        }
                        
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audioPlayback = document.getElementById('audioPlayback');
                        if (audioPlayback) {
                            audioPlayback.src = audioUrl;
                            audioPlayback.style.display = 'block';
                        }
                        
                        const playBtn = document.getElementById('playRecording');
                        if (playBtn) playBtn.disabled = false;
                        
                        showMessage('Audio recorded successfully!', 'success');
                    };
                    
                    reader.readAsDataURL(audioBlob);
                };
                
                window.audioRecorder = mediaRecorder;
                window.audioStream = stream;
                window.audioChunks = audioChunks;
                
                mediaRecorder.start();
                console.log('Recording started');
                
                if (stopRecordingBtn) stopRecordingBtn.disabled = false;
                
            } catch (error) {
                console.error('Audio error:', error);
                this.innerHTML = '<i class="fas fa-microphone"></i>Start Recording';
                this.disabled = false;
                
                let errorMsg = 'Microphone access failed!\n\n';
                if (error.name === 'NotAllowedError') {
                    errorMsg += 'Please allow microphone permission:\n';
                    errorMsg += '1. Click microphone icon 🎤 in address bar\n';
                    errorMsg += '2. Select "Allow"\n';
                    errorMsg += '3. Refresh page';
                } else if (error.name === 'NotFoundError') {
                    errorMsg += 'No microphone found!\n\n';
                    errorMsg += 'Please connect a microphone and try again.';
                } else {
                    errorMsg += 'Error: ' + error.message;
                }
                
                alert(errorMsg);
            }
        });
    }
    
    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', function() {
            console.log('Stop recording clicked');
            
            if (window.audioRecorder && window.audioRecorder.state !== 'inactive') {
                window.audioRecorder.stop();
                console.log('Recording stopped');
            }
            
            this.innerHTML = '<i class="fas fa-microphone"></i>Start Recording';
            this.disabled = true;
            
            if (startRecordingBtn) startRecordingBtn.disabled = false;
            
            showMessage('Recording stopped', 'info');
        });
    }
    
    // Fix analyze button
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            console.log('Analyze clicked');
            
            // Get current mode and data
            const topic = document.getElementById('topicInput').value.trim();
            const mode = document.querySelector('.mode-btn.active')?.getAttribute('data-mode') || 'text';
            
            let inputData = { topic, mode };
            
            if (mode === 'text') {
                inputData.text = document.getElementById('textInput').value.trim();
            } else if (mode === 'face') {
                inputData.image = window.emotionLearningSystem?.capturedImage;
            } else if (mode === 'audio') {
                inputData.audio = window.emotionLearningSystem?.recordedAudio;
            }
            
            console.log('Analyzing with data:', inputData);
            
            // Show loading
            this.innerHTML = '<i class="fas fa-brain fa-spin"></i>Analyzing...';
            this.disabled = true;
            
            // Send to server
            fetch('/detect_emotion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Analysis result:', result);
                
                // Reset button
                this.innerHTML = '<i class="fas fa-brain"></i>Analyze Emotion & Generate Response';
                this.disabled = false;
                
                if (result.detected_emotion) {
                    // Show results
                    const resultsPanel = document.getElementById('resultsPanel');
                    if (resultsPanel) {
                        resultsPanel.style.display = 'block';
                        
                        const emotionElement = document.getElementById('detectedEmotion');
                        const responseElement = document.getElementById('learningResponse');
                        
                        if (emotionElement) emotionElement.textContent = result.detected_emotion;
                        if (responseElement) responseElement.innerHTML = result.adaptive_learning_response?.replace(/\n/g, '<br>') || '';
                    }
                    
                    showMessage('Analysis completed successfully!', 'success');
                } else {
                    showMessage('Analysis failed: ' + (result.error || 'Unknown error'), 'danger');
                }
            })
            .catch(error => {
                console.error('Analysis error:', error);
                
                // Reset button
                this.innerHTML = '<i class="fas fa-brain"></i>Analyze Emotion & Generate Response';
                this.disabled = false;
                
                showMessage('Analysis error: ' + error.message, 'danger');
            });
        });
    }
    
    // Show message function
    function showMessage(message, type) {
        const statusContainer = document.getElementById('statusContainer');
        if (statusContainer) {
            statusContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            setTimeout(() => {
                const alert = statusContainer.querySelector('.alert');
                if (alert) alert.remove();
            }, 5000);
        }
    }
    
    // Enable analyze button when data is available
    function checkAnalyzeButton() {
        const topic = document.getElementById('topicInput').value.trim();
        const mode = document.querySelector('.mode-btn.active')?.getAttribute('data-mode');
        
        let canAnalyze = false;
        
        if (topic && mode) {
            if (mode === 'text') {
                const textInput = document.getElementById('textInput').value.trim();
                canAnalyze = textInput.length > 0;
            } else if (mode === 'face') {
                canAnalyze = window.emotionLearningSystem?.capturedImage !== null;
            } else if (mode === 'audio') {
                canAnalyze = window.emotionLearningSystem?.recordedAudio !== null;
            }
        }
        
        if (analyzeBtn) {
            analyzeBtn.disabled = !canAnalyze;
        }
    }
    
    // Monitor input changes
    document.getElementById('topicInput')?.addEventListener('input', checkAnalyzeButton);
    document.getElementById('textInput')?.addEventListener('input', checkAnalyzeButton);
    
    // Initialize emotion learning system
    window.emotionLearningSystem = {
        capturedImage: null,
        recordedAudio: null
    };
    
    console.log('Complete fix initialized');
});
