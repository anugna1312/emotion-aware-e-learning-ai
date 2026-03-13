// Simple Mode Button Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mode fix loaded');
    
    // Find all mode buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    console.log('Found mode buttons:', modeButtons.length);
    
    // Add click handlers to each button
    modeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Mode button clicked:', this);
            
            // Get the mode
            const mode = this.getAttribute('data-mode');
            console.log('Mode:', mode);
            
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
                showInputPanel('text');
            } else if (mode === 'face') {
                this.classList.add('active', 'btn-success');
                showInputPanel('face');
            } else if (mode === 'audio') {
                this.classList.add('active', 'btn-warning');
                showInputPanel('audio');
            }
            
            console.log('Mode switched to:', mode);
        });
    });
    
    // Function to show input panel
    function showInputPanel(mode) {
        console.log('Showing panel for mode:', mode);
        
        // Hide all panels
        const panels = document.querySelectorAll('.input-panel');
        panels.forEach(panel => panel.style.display = 'none');
        
        // Show selected panel
        const selectedPanel = document.getElementById(mode + 'InputPanel');
        if (selectedPanel) {
            selectedPanel.style.display = 'block';
            console.log('Panel shown:', mode + 'InputPanel');
        } else {
            console.error('Panel not found:', mode + 'InputPanel');
        }
    }
    
    // Test function
    window.testModeButtons = function() {
        console.log('Testing mode buttons...');
        const buttons = document.querySelectorAll('.mode-btn');
        console.log('Buttons found:', buttons.length);
        
        buttons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn);
            console.log(`Data mode:`, btn.getAttribute('data-mode'));
            console.log(`Classes:`, btn.className);
        });
    };
    
    // Auto-test
    setTimeout(testModeButtons, 1000);
});
