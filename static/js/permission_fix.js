// Camera Permission Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Permission fix loaded');
    
    // Enhanced webcam button with better permission handling
    const startWebcamBtn = document.getElementById('startWebcam');
    
    if (startWebcamBtn) {
        startWebcamBtn.addEventListener('click', async function(e) {
            console.log('Enhanced webcam button clicked');
            e.preventDefault();
            
            // Check if camera is already active
            const video = document.getElementById('webcam');
            if (video && video.srcObject) {
                console.log('Camera already active');
                return;
            }
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Requesting Permission...';
            this.disabled = true;
            
            try {
                // First check if getUserMedia is supported
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error('Camera not supported in this browser');
                }
                
                console.log('Requesting camera permission...');
                
                // Request camera permission with specific constraints
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        facingMode: 'user'
                    },
                    audio: false
                });
                
                console.log('Camera permission granted!');
                
                // Set video stream
                if (video) {
                    video.srcObject = stream;
                    
                    // Wait for video to load
                    video.onloadedmetadata = () => {
                        video.play();
                        console.log('Camera video playing');
                        
                        // Update UI
                        this.innerHTML = '<i class="fas fa-video me-2"></i>Camera Active';
                        this.disabled = true;
                        
                        const stopBtn = document.getElementById('stopWebcam');
                        const captureBtn = document.getElementById('captureFace');
                        
                        if (stopBtn) stopBtn.disabled = false;
                        if (captureBtn) captureBtn.disabled = false;
                        
                        // Show success message
                        showSuccessMessage('Camera started successfully! Click "Capture Emotion" to take a photo.');
                    };
                } else {
                    throw new Error('Video element not found');
                }
                
            } catch (error) {
                console.error('Camera permission error:', error);
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Handle specific errors
                handleCameraError(error);
            }
        });
    }
    
    // Handle camera errors with helpful messages
    function handleCameraError(error) {
        let message = '';
        let instructions = '';
        
        switch (error.name) {
            case 'NotAllowedError':
                message = 'Camera permission denied!';
                instructions = `
To fix this:
1. Look for the camera icon 📷 in your browser's address bar
2. Click on it and select "Allow"
3. Refresh the page and try again
4. If you don't see the icon, go to browser settings → Privacy → Camera
                `;
                break;
                
            case 'NotFoundError':
                message = 'No camera found!';
                instructions = `
To fix this:
1. Make sure your camera is connected
2. Check if your camera is working in other apps
3. Try a different USB port
4. Restart your computer if needed
                `;
                break;
                
            case 'NotReadableError':
                message = 'Camera is being used by another app!';
                instructions = `
To fix this:
1. Close all other apps that use camera (Zoom, Skype, etc.)
2. Close all browser tabs except this one
3. Refresh the page and try again
4. Restart your browser if needed
                `;
                break;
                
            case 'OverconstrainedError':
                message = 'Camera does not support required settings!';
                instructions = `
Trying different camera settings...
Please wait and try again in a moment.
                `;
                break;
                
            case 'TypeError':
                message = 'Camera API not supported!';
                instructions = `
To fix this:
1. Try a different browser (Chrome, Firefox, Edge)
2. Update your browser to the latest version
3. Try using a computer instead of a mobile device
                `;
                break;
                
            default:
                message = 'Camera access failed!';
                instructions = `Error: ${error.message}\n\nPlease try refreshing the page.`;
        }
        
        // Show detailed error message
        alert(`${message}\n\n${instructions}`);
    }
    
    // Show success message
    function showSuccessMessage(message) {
        const statusContainer = document.getElementById('statusContainer');
        if (statusContainer) {
            statusContainer.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="fas fa-check-circle me-2"></i>${message}
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
    }
    
    // Test function
    window.testCameraPermission = function() {
        console.log('Testing camera permission...');
        const btn = document.getElementById('startWebcam');
        if (btn) {
            btn.click();
        } else {
            console.error('Camera button not found!');
        }
    };
    
    console.log('Permission fix initialized');
});
