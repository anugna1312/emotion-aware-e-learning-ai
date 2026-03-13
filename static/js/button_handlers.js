// Button Handlers for Camera and Audio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Button handlers loaded');
    
    // Camera button handlers
    const startWebcamBtn = document.getElementById('startWebcam');
    const stopWebcamBtn = document.getElementById('stopWebcam');
    const captureFaceBtn = document.getElementById('captureFace');
    
    if (startWebcamBtn) {
        startWebcamBtn.addEventListener('click', async function() {
            console.log('Start webcam clicked');
            try {
                await window.fixCameraAudio.startCamera();
            } catch (error) {
                console.error('Start webcam error:', error);
            }
        });
    }
    
    if (stopWebcamBtn) {
        stopWebcamBtn.addEventListener('click', function() {
            console.log('Stop webcam clicked');
            try {
                if (window.audioStream) {
                    window.audioStream.getTracks().forEach(track => track.stop());
                    window.audioStream = null;
                }
                
                const video = document.getElementById('webcam');
                if (video) {
                    video.srcObject = null;
                }
                
                // Update UI
                if (startWebcamBtn) startWebcamBtn.disabled = false;
                if (stopWebcamBtn) stopWebcamBtn.disabled = true;
                if (captureFaceBtn) captureFaceBtn.disabled = true;
                
                window.fixCameraAudio.showStatus('Camera stopped', 'info');
            } catch (error) {
                console.error('Stop webcam error:', error);
            }
        });
    }
    
    if (captureFaceBtn) {
        captureFaceBtn.addEventListener('click', function() {
            console.log('Capture face clicked');
            try {
                window.fixCameraAudio.captureFace();
            } catch (error) {
                console.error('Capture face error:', error);
            }
        });
    }
    
    // Audio button handlers
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const playRecordingBtn = document.getElementById('playRecording');
    
    if (startRecordingBtn) {
        startRecordingBtn.addEventListener('click', async function() {
            console.log('Start recording clicked');
            try {
                // Initialize microphone if not already done
                if (!window.audioRecorder) {
                    await window.fixCameraAudio.startMicrophone();
                }
                window.fixCameraAudio.startAudioRecording();
            } catch (error) {
                console.error('Start recording error:', error);
            }
        });
    }
    
    if (stopRecordingBtn) {
        stopRecordingBtn.addEventListener('click', function() {
            console.log('Stop recording clicked');
            try {
                window.fixCameraAudio.stopAudioRecording();
            } catch (error) {
                console.error('Stop recording error:', error);
            }
        });
    }
    
    if (playRecordingBtn) {
        playRecordingBtn.addEventListener('click', function() {
            console.log('Play recording clicked');
            try {
                const audioPlayback = document.getElementById('audioPlayback');
                if (audioPlayback && audioPlayback.src) {
                    audioPlayback.play();
                    window.fixCameraAudio.showStatus('Playing recording...', 'info');
                } else {
                    window.fixCameraAudio.showStatus('No recording to play', 'warning');
                }
            } catch (error) {
                console.error('Play recording error:', error);
            }
        });
    }
    
    console.log('Button handlers initialized');
});
