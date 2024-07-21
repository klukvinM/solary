// script.js
let solCount = 0;
const solCounter = document.getElementById('sol-count');
const clickerSun = document.getElementById('clicker-sun');

clickerSun.addEventListener('click', () => {
    solCount++;
    solCounter.textContent = solCount;
});

function revealMore() {
    const storyElement = document.getElementById('story');
    storyElement.innerHTML = `
        Once upon a time, in the vast expanse of the digital cosmos, a new star began to shine - Solarium. Born from the energy of a thousand suns and the dreams of a decentralized future, Solarium is not just another crypto coin; it's a beacon of hope, innovation, and community.

        Tired of the limitations of traditional finance, a group of visionary developers set out to create a currency that was as limitless as the universe itself. They envisioned a world where financial freedom was a right, not a privilege, and where everyone had the opportunity to reach for the stars.

        And so, Solarium was born - a cryptocurrency designed for the people, by the people. With its robust technology, unwavering community support, and commitment to transparency, Solarium is poised to revolutionize the way we think about money and empower individuals around the globe. Join us on this incredible journey as we explore the boundless possibilities of the Solarium galaxy!
    `;
}