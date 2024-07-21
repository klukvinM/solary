// script.js
let solCount = 0;
let clickMultiplier = 1;
let solPerSecond = 0;
const solCounter = document.getElementById('sol-count');
const clickerSun = document.getElementById('clicker-sun');
const upgradesContainer = document.getElementById('upgrades');
const clickSound = document.getElementById('clickSound');
const upgradeSound = document.getElementById('upgradeSound');

function updateSolCount() {
    solCounter.textContent = solCount;
}

clickerSun.addEventListener('click', () => {
    solCount += clickMultiplier;
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
            const multiplier = parseInt(upgrade.dataset.multiplier);
            clickMultiplier *= multiplier;
            if (multiplier === 2) {
                upgrade.classList.add('disabled');
            } else {
                upgrade.dataset.cost = cost * 2;
                upgrade.querySelector('.cost').textContent = cost * 2;
            }
        } else if (upgradeType === 'passive') {
            const solPerSec = parseInt(upgrade.dataset.solPerSecond);
            solPerSecond += solPerSec;
            upgrade.dataset.cost = Math.round(cost * 1.5);
            upgrade.querySelector('.cost').textContent = Math.round(cost * 1.5);
            upgrade.dataset.solPerSecond = solPerSec * 2; 
            upgrade.querySelector('p:last-of-type').textContent = `Generates ${solPerSec * 2} SOL per second.`;
        }

        checkUpgrades(); 
    } else {
        alert("Not enough Solarium for this upgrade!");
    }
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
        Once upon a time, in the vast expanse of the digital cosmos, a new star began to shine - Solarium. Born from the energy of a thousand suns and the dreams of a decentralized future, Solarium is not just another crypto coin; it's a beacon of hope, innovation, and community.

        Tired of the limitations of traditional finance, a group of visionary developers set out to create a currency that was as limitless as the universe itself. They envisioned a world where financial freedom was a right, not a privilege, and where everyone had the opportunity to reach for the stars.

        And so, Solarium was born - a cryptocurrency designed for the people, by the people. With its robust technology, unwavering community support, and commitment to transparency, Solarium is poised to revolutionize the way we think about money and empower individuals around the globe. Join us on this incredible journey as we explore the boundless possibilities of the Solarium galaxy!
    `;
}