let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalItems = items.length;
const playPauseButton = document.querySelector('.play-pause');
const imageContainer = document.querySelector('.image-container');

// Event delegation for dot clicks
document.querySelector('.carousel-indicators').addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        showSlide(slideIndex);
        pauseAutoPlay();
    }
});

// Show slide function with index parameter
function showSlide(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }

    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    items[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Refactored function to handle slide change
function changeSlide(step) {
    showSlide(currentIndex + step);
}

// Play and pause functions
function startAutoPlay() {
    autoPlayInterval = setInterval(() => changeSlide(1), 3000);
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
}

function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
    playPauseButton.innerHTML = '<i class="fas fa-play"></i> Play';
}

// Event listener for the play/pause button
playPauseButton.addEventListener('click', function() {
    if (this.innerHTML.includes('Play')) {
        startAutoPlay();
    } else {
        pauseAutoPlay();
    }
});

// Event listeners for navigation buttons
document.querySelector('.next').addEventListener('click', () => {
    changeSlide(1);
    pauseAutoPlay();
});

document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(-1);
    pauseAutoPlay();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        changeSlide(1);
        pauseAutoPlay();
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
        pauseAutoPlay();
    }
});

// Initialize the first slide and pause autoplay by default
let autoPlayInterval;
showSlide(currentIndex);
pauseAutoPlay();
