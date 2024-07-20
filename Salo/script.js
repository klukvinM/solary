// Get DOM elements
const coinImage = document.getElementById('coin-image');
const countElement = document.getElementById('count');
const levelElement = document.getElementById('level');
const xpElement = document.getElementById('xp');
const xpToNextLevelElement = document.getElementById('xp-to-next-level');
const upgradeClickPowerButton = document.getElementById('upgrade-click-power');
const upgradeAutoClickButton = document.getElementById('upgrade-auto-click');

// Initialize variables
let count = 0;
let level = 1;
let xp = 0;
let xpToNextLevel = 100;
let clickPower = 1; // Click power
let autoClickRate = 0; // Auto click rate

// Update text in HTML
updateStats();

// Click handler for the coin
coinImage.addEventListener('click', () => {
    count += clickPower;
    xp += clickPower;
    checkLevelUp();
    updateStats();
});

// Function to check for level up
function checkLevelUp() {
    if (xp >= xpToNextLevel) {
        level++;
        xp -= xpToNextLevel;
        xpToNextLevel *= 1.5; // Increase experience for next level
        updateStats();
    }
}

// Function to update stats
function updateStats() {
    countElement.textContent = count;
    levelElement.textContent = level;
    xpElement.textContent = xp;
    xpToNextLevelElement.textContent = xpToNextLevel;
}

// Handlers for upgrades
upgradeClickPowerButton.addEventListener('click', () => {
    if (count >= 10) {
        count -= 10;
        clickPower++;
        updateStats();
    }
});

upgradeAutoClickButton.addEventListener('click', () => {
    if (count >= 50) {
        count -= 50;
        autoClickRate++;
        setInterval(() => {
            count += autoClickRate;
            xp += autoClickRate;
            checkLevelUp();
            updateStats();
        }, 1000); // Auto click every 1 second
    }
});

// Automatic carousel scrolling (optional)
let currentSlide = 1;
const totalSlides = document.querySelectorAll('.carousel-item').length;

setInterval(() => {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }
    document.getElementById(`carousel-${currentSlide}`).checked = true;
}, 5000); // Change slide every 5 seconds (5000 milliseconds) 