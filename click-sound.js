// Click Sound Effect
class ClickSound {
    constructor() {
        this.audioContext = null;
        this.initAudio();
    }

    initAudio() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playClickSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Create a short, pleasant click sound
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playHoverSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Create a subtle hover sound
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    playTypeSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Create a typewriter-like sound
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.08);

        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.08);
    }

    playDeleteSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Create a delete/backspace sound
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.06);

        gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.06);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.06);
    }
}

// Initialize click sound globally
window.clickSound = new ClickSound();

// Add click sounds to buttons and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click sound to all buttons
    const buttons = document.querySelectorAll('button, .btn, .nav-item a, .project-link, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Play click sound
            clickSound.playClickSound();
        });

        // Add hover sound for buttons
        button.addEventListener('mouseenter', function() {
            clickSound.playHoverSound();
        });
    });

    // Add click sound to navigation menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            clickSound.playClickSound();
        });
    }

    // Add typing sounds to form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            clickSound.playClickSound();
        });

        // Typing sound
        input.addEventListener('input', function() {
            clickSound.playTypeSound();
        });

        // Delete/backspace sound
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                clickSound.playDeleteSound();
            }
        });
    });

    // Add click sound to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('click', function() {
            clickSound.playClickSound();
        });
    });

    // Add click sound to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            clickSound.playClickSound();
        });
    });
});

// Add keyboard sound for accessibility
document.addEventListener('keydown', function(e) {
    // Play sound for Enter and Space key presses on interactive elements
    if ((e.key === 'Enter' || e.key === ' ') && 
        (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn') || e.target.classList.contains('nav-item'))) {
        clickSound.playClickSound();
    }
});
