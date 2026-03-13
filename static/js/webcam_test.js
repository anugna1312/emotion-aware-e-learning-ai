// Simple Webcam Test
document.addEventListener('DOMContentLoaded', function() {
    console.log('Webcam test loaded');
    
    // Test webcam button
    const startWebcamBtn = document.getElementById('startWebcam');
    console.log('Start webcam button found:', startWebcamBtn);
    
    if (startWebcamBtn) {
        // Remove old handlers
        const newBtn = startWebcamBtn.cloneNode(true);
        startWebcamBtn.parentNode.replaceChild(newBtn, startWebcamBtn);
        
        // Add simple click handler
        newBtn.addEventListener('click', async function(e) {
            console.log('Webcam button clicked!');
            e.preventDefault();
            
            // Change button state
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Starting...';
            this.disabled = true;
            
            try {
                console.log('Requesting camera permission...');
                
                // Simple camera request
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true,
                    audio: false 
                });
                
                console.log('Camera permission granted!');
                
                // Get video element
                const video = document.getElementById('webcam');
                if (video) {
                    video.srcObject = stream;
                    
                    video.onloadedmetadata = () => {
                        video.play();
                        console.log('Video playing!');
                        
                        // Update buttons
                        this.innerHTML = '<i class="fas fa-video me-2"></i>Camera Active';
                        this.disabled = true;
                        
                        const stopBtn = document.getElementById('stopWebcam');
                        const captureBtn = document.getElementById('captureFace');
                        
                        if (stopBtn) {
                            stopBtn.disabled = false;
                        }
                        if (captureBtn) {
                            captureBtn.disabled = false;
                        }
                        
                        // Show success
                        alert('✅ Camera started successfully! Click "Capture Emotion" to take a photo.');
                    };
                } else {
                    console.error('Video element not found!');
                    throw new Error('Video element not found');
                }
                
            } catch (error) {
                console.error('Camera error:', error);
                
                // Reset button
                this.innerHTML = '<i class="fas fa-video me-2"></i>Start Webcam';
                this.disabled = false;
                
                // Show helpful error
                let errorMsg = 'Camera access failed!\n\n';
                
                if (error.name === 'NotAllowedError') {
                    errorMsg += 'Please allow camera permission:\n';
                    errorMsg += '1. Click the camera icon 📷 in the address bar\n';
                    errorMsg += '2. Select "Allow"\n';
                    errorMsg += '3. Refresh the page and try again';
                } else if (error.name === 'NotFoundError') {
                    errorMsg += 'No camera found!\n\n';
                    errorMsg += 'Please connect a camera and try again.';
                } else if (error.name === 'NotReadableError') {
                    errorMsg += 'Camera is being used by another app!\n\n';
                    errorMsg += 'Please close other camera apps and try again.';
                } else {
                    errorMsg += 'Error: ' + error.message;
                }
                
                alert(errorMsg);
            }
        });
        
        console.log('Webcam button handler added');
    } else {
        console.error('Start webcam button not found!');
        alert('Webcam button not found! Please refresh the page.');
    }
    
    // Test function
    window.testWebcam = function() {
        console.log('Testing webcam...');
        const btn = document.getElementById('startWebcam');
        if (btn) {
            btn.click();
        } else {
            console.error('Webcam button not found!');
        }
    };
    
    // Auto-test after 2 seconds
    setTimeout(() => {
        console.log('Auto-testing webcam button...');
        const btn = document.getElementById('startWebcam');
        if (btn) {
            console.log('Webcam button exists and is ready');
        } else {
            console.error('Webcam button not found!');
        }
    }, 2000);
});
