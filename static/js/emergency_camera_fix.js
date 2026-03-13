// Emergency Camera Fix - Direct and Simple
document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency Camera Fix Loading...');
    
    // Remove all existing event listeners
    const startBtn = document.getElementById('startWebcam');
    if (startBtn) {
        // Clone button to remove all event listeners
        const newBtn = startBtn.cloneNode(true);
        startBtn.parentNode.replaceChild(newBtn, startBtn);
        
        // Add simple, direct camera access
        newBtn.addEventListener('click', async function() {
            console.log('Emergency: Starting camera...');
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';
            this.disabled = true;
            
            try {
                // Most basic camera request
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true 
                });
                
                console.log('Emergency: Camera stream obtained!');
                
                const video = document.getElementById('webcam');
                if (video) {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                        console.log('Emergency: Video playing!');
                        
                        this.innerHTML = '<i class="fas fa-video"></i> Camera Active';
                        this.disabled = true;
                        
                        // Enable other buttons
                        const stopBtn = document.getElementById('stopWebcam');
                        const captureBtn = document.getElementById('captureFace');
                        if (stopBtn) stopBtn.disabled = false;
                        if (captureBtn) captureBtn.disabled = false;
                        
                        alert('✅ Camera started successfully!');
                    };
                }
                
            } catch (error) {
                console.error('Emergency: Camera failed:', error);
                
                this.innerHTML = '<i class="fas fa-video"></i> Start Webcam';
                this.disabled = false;
                
                // Simple error handling
                if (error.name === 'NotAllowedError') {
                    alert('❌ Camera Permission Denied!\n\nPlease:\n1. Click camera icon 📷 in address bar\n2. Select "Allow"\n3. Refresh page\n4. Try again');
                } else if (error.name === 'NotFoundError') {
                    alert('❌ No Camera Found!\n\nPlease:\n1. Connect a camera\n2. Check if camera works in other apps\n3. Try again');
                } else {
                    alert('❌ Camera Error: ' + error.message + '\n\nPlease try a different browser');
                }
            }
        });
    }
    
    // Fix stop button
    const stopBtn = document.getElementById('stopWebcam');
    if (stopBtn) {
        const newStopBtn = stopBtn.cloneNode(true);
        stopBtn.parentNode.replaceChild(newStopBtn, stopBtn);
        
        newStopBtn.addEventListener('click', function() {
            const video = document.getElementById('webcam');
            if (video && video.srcObject) {
                const stream = video.srcObject;
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
                
                const startBtn = document.getElementById('startWebcam');
                const captureBtn = document.getElementById('captureFace');
                
                if (startBtn) {
                    startBtn.innerHTML = '<i class="fas fa-video"></i> Start Webcam';
                    startBtn.disabled = false;
                }
                if (captureBtn) captureBtn.disabled = true;
                
                alert('✅ Camera stopped');
            }
        });
    }
    
    // Fix capture button
    const captureBtn = document.getElementById('captureFace');
    if (captureBtn) {
        const newCaptureBtn = captureBtn.cloneNode(true);
        captureBtn.parentNode.replaceChild(newCaptureBtn, captureBtn);
        
        newCaptureBtn.addEventListener('click', function() {
            console.log('Emergency: Capture button clicked');
            
            const video = document.getElementById('webcam');
            if (video && video.srcObject) {
                try {
                    // Create canvas
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth || 640;
                    canvas.height = video.videoHeight || 480;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0);
                    
                    // Convert to base64
                    const imageData = canvas.toDataURL('image/jpeg', 0.8);
                    console.log('Emergency: Image captured, size:', imageData.length);
                    
                    // Store image globally
                    window.capturedImage = imageData;
                    
                    // Show success message
                    alert('✅ Photo captured successfully!\n\nNow click "Analyze Emotion & Generate Response" button below');
                    
                    // Update button state
                    this.innerHTML = '<i class="fas fa-camera"></i> Photo Captured';
                    this.style.backgroundColor = '#28a745';
                    
                } catch (error) {
                    console.error('Emergency: Capture failed:', error);
                    alert('❌ Photo capture failed: ' + error.message);
                }
                
            } else {
                alert('❌ Please start camera first!\n\nClick "Start Webcam" button first');
            }
        });
    }
    
    console.log('Emergency Camera Fix Loaded!');
    
    // Fix main analyze button
    const analyzeBtn = document.querySelector('button[onclick*="analyzeEmotion"]');
    if (analyzeBtn) {
        // Remove existing onclick
        analyzeBtn.removeAttribute('onclick');
        
        // Add new event listener
        analyzeBtn.addEventListener('click', async function() {
            console.log('Emergency: Analyze button clicked');
            
            const topic = document.getElementById('topicInput')?.value || document.getElementById('topic')?.value;
            const mode = document.querySelector('input[name="detectionMode"]:checked')?.value;
            
            if (!topic) {
                alert('❌ Please enter a topic first!');
                return;
            }
            
            if (!mode) {
                alert('❌ Please select a detection mode!');
                return;
            }
            
            console.log('Emergency: Topic:', topic, 'Mode:', mode);
            
            if (mode === 'face') {
                if (!window.capturedImage) {
                    alert('❌ Please capture a photo first!\n\n1. Start camera\n2. Click "Capture Emotion"\n3. Then try again');
                    return;
                }
                
                // Send captured image for analysis
                await analyzeFaceEmotion(topic, window.capturedImage);
            } else if (mode === 'text') {
                const textInput = document.getElementById('textInput')?.value;
                if (!textInput) {
                    alert('❌ Please enter text first!');
                    return;
                }
                await analyzeTextEmotion(topic, textInput);
            } else if (mode === 'audio') {
                const audioData = window.capturedAudio;
                if (!audioData) {
                    alert('❌ Please record audio first!\n\n1. Click "Start Recording"\n2. Speak into microphone\n3. Click "Stop Recording"\n4. Then try again');
                    return;
                }
                await analyzeAudioEmotion(topic, audioData);
            }
        });
    }
    
    // Face emotion analysis function
    async function analyzeFaceEmotion(topic, imageData) {
        try {
            console.log('Emergency: Analyzing face emotion...');
            
            const response = await fetch('/detect_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    mode: 'face',
                    image: imageData
                })
            });
            
            const result = await response.json();
            console.log('Emergency: Analysis result:', result);
            
            if (result.error) {
                alert('❌ Analysis failed: ' + result.error);
            } else {
                // Display results
                displayResults(result.detected_emotion, result.adaptive_learning_response);
                alert('✅ Emotion analysis complete!\n\nDetected: ' + result.detected_emotion);
            }
            
        } catch (error) {
            console.error('Emergency: Analysis error:', error);
            alert('❌ Analysis failed: ' + error.message);
        }
    }
    
    // Text emotion analysis function
    async function analyzeTextEmotion(topic, text) {
        try {
            console.log('Emergency: Analyzing text emotion...');
            
            const response = await fetch('/detect_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    mode: 'text',
                    text: text
                })
            });
            
            const result = await response.json();
            console.log('Emergency: Text analysis result:', result);
            
            if (result.error) {
                alert('❌ Analysis failed: ' + result.error);
            } else {
                // Display results
                displayResults(result.detected_emotion, result.adaptive_learning_response);
                alert('✅ Emotion analysis complete!\n\nDetected: ' + result.detected_emotion);
            }
            
        } catch (error) {
            console.error('Emergency: Text analysis error:', error);
            alert('❌ Analysis failed: ' + error.message);
        }
    }
    
    // Audio emotion analysis function
    async function analyzeAudioEmotion(topic, audioData) {
        try {
            console.log('Emergency: Analyzing audio emotion...');
            
            const response = await fetch('/detect_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    mode: 'audio',
                    audio: audioData
                })
            });
            
            const result = await response.json();
            console.log('Emergency: Audio analysis result:', result);
            
            if (result.error) {
                alert('❌ Audio analysis failed: ' + result.error);
            } else {
                // Display results
                displayResults(result.detected_emotion, result.adaptive_learning_response);
                alert('✅ Audio emotion analysis complete!\n\nDetected: ' + result.detected_emotion);
            }
            
        } catch (error) {
            console.error('Emergency: Audio analysis error:', error);
            alert('❌ Audio analysis failed: ' + error.message);
        }
    }
    
    // Display results function
    function displayResults(emotion, response) {
        const emotionElement = document.getElementById('detectedEmotion');
        const responseElement = document.getElementById('learningResponse');
        
        if (emotionElement) {
            emotionElement.textContent = emotion.charAt(0).toUpperCase() + emotion.slice(1);
            emotionElement.className = 'emotion-badge emotion-' + emotion;
        }
        
        if (responseElement) {
            responseElement.innerHTML = response.replace(/\n/g, '<br>');
        }
        
        // Show results panel
        const resultsPanel = document.getElementById('resultsPanel');
        if (resultsPanel) {
            resultsPanel.style.display = 'block';
        }
    }
});
