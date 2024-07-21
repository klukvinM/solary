// script.js
let solCount = 0;
let clickValue = 1;
let solPerSecond = 0;

const solCounter = document.getElementById('sol-count');
const clickValueDisplay = document.getElementById('click-value');
const passiveIncomeDisplay = document.getElementById('passive-income');
const clickerSun = document.getElementById('clicker-sun');
const upgradesContainer = document.getElementById('upgrades');
const clickSound = document.getElementById('clickSound');
const upgradeSound = document.getElementById('upgradeSound');


function saveGameData() {
    localStorage.setItem('solCount', solCount);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('solPerSecond', solPerSecond);
    // Save other important game variables here
}

// Function to load game data from local storage
function loadGameData() {
    const savedSolCount = localStorage.getItem('solCount');
    const savedClickValue = localStorage.getItem('clickValue');
    const savedSolPerSecond = localStorage.getItem('solPerSecond');

    // Load other game variables

    if (savedSolCount) {
        solCount = parseInt(savedSolCount); // Load saved value if it exists
    }
    if (savedClickValue) {
        clickValue = parseInt(savedClickValue);
    }
    if (savedSolPerSecond) {
        solPerSecond = parseInt(savedSolPerSecond);
    }
    // Load other variables 
}

// Call saveGameData() at regular intervals (e.g., every 5 seconds)
setInterval(saveGameData, 5000); // Save every 5 seconds

// Call loadGameData() when the page loads
window.addEventListener('load', loadGameData); 

function updateSolCount() {
    solCounter.textContent = solCount;
}

function updateClickValue() {
    clickValueDisplay.textContent = clickValue;
}

function updatePassiveIncome() {
    passiveIncomeDisplay.textContent = solPerSecond;
}

clickerSun.addEventListener('click', () => {
    solCount += clickValue;
    updateSolCount();
    clickSound.currentTime = 0;
    clickSound.play();
    checkUpgrades();
});

upgradesContainer.addEventListener('click', (event) => {
    const upgrade = event.target.closest('.upgrade');
    if (upgrade) {
        handleUpgrade(upgrade);
    }
});

function handleUpgrade(upgrade) {
    const cost = parseInt(upgrade.dataset.cost);
    const upgradeType = upgrade.dataset.upgradeType;

    if (solCount >= cost) {
        solCount -= cost;
        upgradeSound.currentTime = 0;
        upgradeSound.play();
        updateSolCount();

        if (upgradeType === 'click') {
            handleClickUpgrade(upgrade, cost);
        } else if (upgradeType === 'passive') {
            handlePassiveUpgrade(upgrade, cost);
        }

        checkUpgrades();
    } else {
        alert("Not enough Solarium for this upgrade!");
    }
}

function handleClickUpgrade(upgrade, cost) {
  const multiplier = parseInt(upgrade.dataset.multiplier);
  clickValue *= multiplier;
  updateClickValue();

  if (multiplier === 2) {
      upgrade.classList.add('disabled');
  } else {
      upgrade.dataset.cost = Math.round(cost * 1.8); 
      upgrade.querySelector('.cost').textContent = upgrade.dataset.cost;
  }
}

function handlePassiveUpgrade(upgrade, cost) {
  const solPerSec = parseInt(upgrade.dataset.solPerSecond);
  solPerSecond += solPerSec;
  updatePassiveIncome();

  upgrade.dataset.cost = Math.round(cost * 1.5); 
  upgrade.querySelector('.cost').textContent = upgrade.dataset.cost;

  upgrade.dataset.solPerSecond = solPerSec * 2; 
  upgrade.querySelector('p:last-of-type').textContent = `Generates ${upgrade.dataset.solPerSecond} SOL per second.`;
}

function checkUpgrades() {
    const upgrades = document.querySelectorAll('.upgrade');
    upgrades.forEach(upgrade => {
        const cost = parseInt(upgrade.dataset.cost);
        if (solCount >= cost) {
            upgrade.classList.remove('disabled');
        } else {
            upgrade.classList.add('disabled');
        }
    });
}

setInterval(() => {
    solCount += solPerSecond;
    updateSolCount();
}, 1000);

checkUpgrades(); 

function revealMore() {
    const storyElement = document.getElementById('story');
    storyElement.innerHTML = `
        Once upon a time, in the vast expanse of the digital cosmos, a new star began to shine - Solarium. <span class="highlight">Born from the energy of a thousand suns</span> and the dreams of a decentralized future, Solarium is not just another crypto coin; it's a beacon of hope, innovation, and community.

        Tired of the limitations of traditional finance, a group of visionary developers set out to create a currency that was as limitless as the universe itself. They envisioned a world where financial freedom was a right, not a privilege, and where everyone had the opportunity to reach for the stars.

        And so, Solarium was born - a cryptocurrency designed for the people, by the people. With its robust technology, unwavering community support, and commitment to transparency, Solarium is poised to revolutionize the way we think about money and empower individuals around the globe. Join us on this incredible journey as we explore the boundless possibilities of the Solarium galaxy!
    `;
}