// Получаем элементы DOM
const coinImage = document.getElementById('coin-image');
const countElement = document.getElementById('count');
const levelElement = document.getElementById('level');
const xpElement = document.getElementById('xp');
const xpToNextLevelElement = document.getElementById('xp-to-next-level');
const upgradeClickPowerButton = document.getElementById('upgrade-click-power');
const upgradeAutoClickButton = document.getElementById('upgrade-auto-click');

// Инициализируем переменные
let count = 0;
let level = 1;
let xp = 0;
let xpToNextLevel = 100;
let clickPower = 1; // Сила клика
let autoClickRate = 0; // Скорость автоматического клика

// Обновляем текст в HTML
updateStats();

// Обработчик клика по монете
coinImage.addEventListener('click', () => {
    count += clickPower;
    xp += clickPower;
    checkLevelUp();
    updateStats();
});

// Функция проверки повышения уровня
function checkLevelUp() {
    if (xp >= xpToNextLevel) {
        level++;
        xp -= xpToNextLevel;
        xpToNextLevel *= 1.5; // Увеличиваем опыт для следующего уровня
        updateStats();
    }
}

// Функция обновления статистики
function updateStats() {
    countElement.textContent = count;
    levelElement.textContent = level;
    xpElement.textContent = xp;
    xpToNextLevelElement.textContent = xpToNextLevel;
}

// Обработчики для улучшений
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
        }, 1000); // Автоклик каждые 1 секунду
    }
});