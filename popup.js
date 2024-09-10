let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateDisplay() {
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        chrome.notifications.create({
          type: 'basic',
          title: 'Pomodoro Timer',
          message: 'Time is up!'
        });
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
