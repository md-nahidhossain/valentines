// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('successPopup');

// Move NO button on hover/click attempt
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('click', moveButton);
noBtn.addEventListener('touchstart', moveButton);

// Also handle mouse move to make it trickier
document.addEventListener('mousemove', function(e) {
    const rect = noBtn.getBoundingClientRect();
    const btnCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    
    // Check if mouse is getting close to the button
    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenter.x, 2) + 
        Math.pow(e.clientY - btnCenter.y, 2)
    );
    
    // If mouse is very close (within 100px), move the button
    if (distance < 100) {
        moveButton();
    }
});

function moveButton() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate new random position
    // Keep button within viewport bounds with some padding
    const maxX = viewportWidth - btnRect.width - 50;
    const maxY = viewportHeight - btnRect.height - 50;
    
    // Generate random positions
    let newX = Math.random() * maxX + 25;
    let newY = Math.random() * maxY + 25;
    
    // Make sure it doesn't overlap with YES button
    const yesRect = yesBtn.getBoundingClientRect();
    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;
    
    // Keep distance from YES button
    const distanceFromYes = Math.sqrt(
        Math.pow(newX + btnRect.width/2 - yesCenterX, 2) + 
        Math.pow(newY + btnRect.height/2 - yesCenterY, 2)
    );
    
    // If too close to YES button, try again
    if (distanceFromYes < 150) {
        newX = Math.random() * maxX + 25;
        newY = Math.random() * maxY + 25;
    }
    
    // Apply the new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '100';
    
    // Add some fun effects
    noBtn.style.transform = 'scale(1.1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
    noBtn.style.transition = 'all 0.2s ease';
}

// YES button click handler
yesBtn.addEventListener('click', function() {
    showPopup();
});

function showPopup() {
    popup.classList.add('active');
    
    // Add confetti effect
    createConfetti();
}

function closePopup() {
    popup.classList.remove('active');
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#FF69B4', '#98D8C8', '#F7DC6F'];
    const shapes = ['❤️', '💕', '💖', '💗', '✨', '🌸'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.zIndex = '2000';
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some fun text change on NO button hover
noBtn.addEventListener('mouseover', function() {
    const messages = ['Nope!', 'Try again!', 'Catch me!', 'Too slow!', 'Haha!', 'Nice try!'];
    const icons = ['😏', '😜', '🤭', '😊', '😄', '🙈'];
    const randomIndex = Math.floor(Math.random() * messages.length);
    
    this.querySelector('.btn-text').textContent = messages[randomIndex];
    this.querySelector('.btn-icon').textContent = icons[randomIndex];
});

// Make YES button pulse animation even more enticing
yesBtn.addEventListener('mouseover', function() {
    this.style.animation = 'pulse 0.5s ease-in-out infinite';
});

yesBtn.addEventListener('mouseout', function() {
    this.style.animation = '';
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(pulseStyle);

// Initialize - ensure NO button starts in correct position
function initNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Reset to original position in container
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'none';
}

// Reset button on page load
window.addEventListener('load', initNoButton);
