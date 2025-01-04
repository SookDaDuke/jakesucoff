document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Crest functionality
    const crestOverlay = document.getElementById('crest-overlay');
    const randomCrest = document.getElementById('random-crest');
    
    // Array of all crest filenames
    const crests = Array.from({length: 73}, (_, i) => `crests/Crest ${i + 1}.png`);
    crests.push('crests/Crest i like 1.png', 'crests/Crest i like 2.png');

    // Function to get random crest
    function getRandomCrest() {
        const randomIndex = Math.floor(Math.random() * crests.length);
        return crests[randomIndex];
    }

    // Load random crest
    function loadCrest() {
        if (!crestOverlay || !randomCrest) return;
        
        // Reset state
        document.body.classList.remove('content-visible');
        randomCrest.classList.remove('loaded');
        crestOverlay.style.display = 'flex';
        
        const crestUrl = getRandomCrest();
        randomCrest.src = crestUrl;
        
        randomCrest.onload = () => {
            randomCrest.classList.add('loaded');
            addInteractionListeners();
        };
    }

    // Handle user interactions
    function addInteractionListeners() {
        const handleInteraction = () => {
            document.body.classList.add('content-visible');
            setTimeout(() => {
                if (crestOverlay) {
                    crestOverlay.style.display = 'none';
                }
            }, 1500);
            
            // Remove event listeners
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            if (crestOverlay) {
                crestOverlay.removeEventListener('click', handleInteraction);
            }
        };

        // Add event listeners
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        if (crestOverlay) {
            crestOverlay.addEventListener('click', handleInteraction);
        }
    }

    // Initialize if we're on the homepage
    if (window.location.pathname.endsWith('/') || 
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.includes('/jakesucoff')) {
    loadCrest();
}
});
