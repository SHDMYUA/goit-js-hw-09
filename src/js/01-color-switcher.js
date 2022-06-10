const refs = {
  main: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  }

const COLOR_DELAY = 1000;
let timeoutId = null;

//add listeners to the buttons abd body
refs.startBtn.addEventListener('click', getRandomHexColor);
refs.stopBtn.addEventListener('click', onBtnStopClick);

// function random color
function getRandomHexColor() {
timeoutId = setInterval(() => {
  let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
  refs.main.style.background = color;
  refs.startBtn.disabled = true;
  },
  COLOR_DELAY);
  }

//remove Timeout by 'click' "disable"-button 
function onBtnStopClick() {
refs.startBtn.disabled = false;
clearInterval(timeoutId);
}
