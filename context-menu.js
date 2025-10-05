// Custom Right-Click Context Menu
class ContextMenu {
    constructor() {
        this.menu = null;
        this.selectedText = '';
        this.init();
    }

    init() {
        // Create context menu
        this.createMenu();
        
        // Add event listeners
        document.addEventListener('contextmenu', (e) => this.showMenu(e));
        document.addEventListener('click', () => this.hideMenu());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideMenu();
        });
    }

    createMenu() {
        this.menu = document.createElement('div');
        this.menu.className = 'custom-context-menu';
        this.menu.innerHTML = `
            <div class="context-menu-item" id="copy-btn">
                <span class="context-icon">📋</span>
                <span class="context-text">Copy</span>
            </div>
        `;
        document.body.appendChild(this.menu);
    }

    showMenu(e) {
        e.preventDefault();
        
        // Get selected text
        this.selectedText = window.getSelection().toString();
        
        // Position menu
        const x = e.clientX;
        const y = e.clientY;
        
        this.menu.style.left = x + 'px';
        this.menu.style.top = y + 'px';
        this.menu.style.display = 'block';
        
        // Add click sound
        if (window.clickSound) {
            window.clickSound.playClickSound();
        }
        
        // Add click event to copy button
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.onclick = () => this.copyText();
    }

    hideMenu() {
        if (this.menu) {
            this.menu.style.display = 'none';
        }
    }

    copyText() {
        if (this.selectedText) {
            navigator.clipboard.writeText(this.selectedText).then(() => {
                // Show success feedback
                this.showCopyFeedback();
                
                // Add click sound
                if (window.clickSound) {
                    window.clickSound.playClickSound();
                }
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
        this.hideMenu();
    }

    showCopyFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = 'Copied!';
        document.body.appendChild(feedback);
        
        // Position feedback
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.background = 'rgba(6, 182, 212, 0.9)';
        feedback.style.color = 'white';
        feedback.style.padding = '10px 20px';
        feedback.style.borderRadius = '5px';
        feedback.style.zIndex = '100000';
        feedback.style.fontSize = '14px';
        feedback.style.fontWeight = '500';
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
}

// Initialize context menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContextMenu();
});
