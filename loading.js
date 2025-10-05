// Loading Screen Management
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadedResources = 0;
        this.totalResources = 0;
        this.minLoadingTime = 3000; // Minimum 3 seconds loading time
        this.startTime = Date.now();
        this.init();
    }

    init() {
        // Count total resources to load
        this.countResources();
        
        // Start loading process
        this.startLoading();
        
        // Ensure minimum loading time
        this.ensureMinimumTime();
    }

    countResources() {
        // Count images
        const images = document.querySelectorAll('img');
        this.totalResources += images.length;
        
        // Count scripts
        const scripts = document.querySelectorAll('script[src]');
        this.totalResources += scripts.length;
        
        // Count stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        this.totalResources += stylesheets.length;
        
        // Count fonts
        this.totalResources += 2; // Assuming 2 font families
        
        // Minimum resources
        if (this.totalResources < 5) {
            this.totalResources = 5;
        }
    }

    startLoading() {
        // Load images
        this.loadImages();
        
        // Load scripts
        this.loadScripts();
        
        // Load fonts
        this.loadFonts();
        
        // Simulate loading progress
        this.simulateProgress();
    }

    loadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                this.onResourceLoaded();
            } else {
                img.addEventListener('load', () => this.onResourceLoaded());
                img.addEventListener('error', () => this.onResourceLoaded());
            }
        });
    }

    loadScripts() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                this.onResourceLoaded();
            } else {
                script.addEventListener('load', () => this.onResourceLoaded());
                script.addEventListener('error', () => this.onResourceLoaded());
            }
        });
    }

    loadFonts() {
        // Check if fonts are loaded
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                this.onResourceLoaded();
                this.onResourceLoaded();
            });
        } else {
            // Fallback for older browsers
            setTimeout(() => {
                this.onResourceLoaded();
                this.onResourceLoaded();
            }, 1000);
        }
    }

    simulateProgress() {
        // Simulate loading progress even if resources load quickly
        const interval = setInterval(() => {
            if (this.loadedResources < this.totalResources) {
                this.onResourceLoaded();
            } else {
                clearInterval(interval);
            }
        }, 200);
    }

    onResourceLoaded() {
        this.loadedResources++;
        const progress = (this.loadedResources / this.totalResources) * 100;
        
        // Update loading text
        this.updateLoadingText(progress);
        
        // Check if everything is loaded
        if (this.loadedResources >= this.totalResources) {
            this.checkReadyToShow();
        }
    }

    updateLoadingText(progress) {
        const loadingText = document.querySelector('.loading-text p');
        if (loadingText) {
            if (progress < 30) {
                loadingText.textContent = 'Initializing...';
            } else if (progress < 60) {
                loadingText.textContent = 'Loading resources...';
            } else if (progress < 90) {
                loadingText.textContent = 'Almost ready...';
            } else {
                loadingText.textContent = 'Finalizing...';
            }
        }
    }

    ensureMinimumTime() {
        setTimeout(() => {
            this.checkReadyToShow();
        }, this.minLoadingTime);
    }

    checkReadyToShow() {
        const elapsedTime = Date.now() - this.startTime;
        
        if (this.loadedResources >= this.totalResources && elapsedTime >= this.minLoadingTime) {
            this.hideLoadingScreen();
        }
    }

    hideLoadingScreen() {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Hide loading screen
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.opacity = '0';
                this.loadingScreen.style.visibility = 'hidden';
                
                // Remove from DOM after transition
                setTimeout(() => {
                    if (this.loadingScreen && this.loadingScreen.parentNode) {
                        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                    }
                }, 800);
            }
        }, 500);
    }
}

// Initialize loading manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoadingManager();
});
