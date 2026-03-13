// Quick Test Button Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quick test fix loaded');
    
    // Find the test button
    const testBtn = document.getElementById('testBtn');
    console.log('Test button found:', testBtn);
    
    if (testBtn) {
        // Remove old event listeners
        testBtn.replaceWith(testBtn.cloneNode(true));
        
        // Get the new button
        const newTestBtn = document.getElementById('testBtn');
        
        // Add new click handler
        newTestBtn.addEventListener('click', function(e) {
            console.log('Quick Test clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            // Show loading
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Testing...';
            this.disabled = true;
            
            // Prepare test data
            const topic = document.getElementById('topicInput').value.trim() || 'Python Programming';
            const mode = document.querySelector('.mode-btn.active')?.getAttribute('data-mode') || 'text';
            
            let testData = {
                topic: topic,
                mode: mode
            };
            
            // Add mode-specific data
            if (mode === 'text') {
                testData.text = 'I am feeling happy and excited to learn new things!';
            } else if (mode === 'face') {
                testData.image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A';
            } else if (mode === 'audio') {
                testData.audio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
            }
            
            console.log('Sending test data:', testData);
            
            // Make API call
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
                
                // Reset button
                this.innerHTML = '<i class="fas fa-test me-2"></i>Quick Test';
                this.disabled = false;
                
                if (result.detected_emotion) {
                    alert('✅ Test successful! Emotion detected: ' + result.detected_emotion);
                    
                    // Show results
                    const resultsPanel = document.getElementById('resultsPanel');
                    if (resultsPanel) {
                        resultsPanel.style.display = 'block';
                        
                        // Update emotion display
                        const emotionElement = document.getElementById('detectedEmotion');
                        if (emotionElement) {
                            emotionElement.textContent = result.detected_emotion;
                        }
                        
                        // Update response display
                        const responseElement = document.getElementById('learningResponse');
                        if (responseElement && result.adaptive_learning_response) {
                            responseElement.innerHTML = result.adaptive_learning_response.replace(/\n/g, '<br>');
                        }
                    }
                    
                    // Show success message
                    showStatus('Test successful!', 'success');
                } else {
                    alert('❌ Test failed: ' + (result.error || 'Unknown error'));
                    showStatus('Test failed: ' + (result.error || 'Unknown error'), 'danger');
                }
            })
            .catch(error => {
                console.error('Test error:', error);
                
                // Reset button
                this.innerHTML = '<i class="fas fa-test me-2"></i>Quick Test';
                this.disabled = false;
                
                alert('❌ Test error: ' + error.message);
                showStatus('Test error: ' + error.message, 'danger');
            });
        });
        
        console.log('Quick Test button handler added');
    } else {
        console.error('Test button not found!');
    }
    
    // Helper function to show status
    function showStatus(message, type) {
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
    }
    
    // Test function
    window.testQuickTest = function() {
        console.log('Testing Quick Test button...');
        const btn = document.getElementById('testBtn');
        if (btn) {
            btn.click();
        } else {
            console.error('Quick Test button not found!');
        }
    };
});
