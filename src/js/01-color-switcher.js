function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let colorId = null;

startBtn.addEventListener('click', startChange);
stopBtn.addEventListener('click', stopChange);
stopBtn.disabled = true;

function startChange() {
  changeBgClr();
  colorId = setInterval(changeBgClr, 1000);
}

function changeBgClr() {
  document.body.style.backgroundColor = getRandomHexColor();
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChange() {
  clearInterval(colorId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
