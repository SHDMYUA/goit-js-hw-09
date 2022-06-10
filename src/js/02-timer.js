import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    dateTimeInput: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("[data-start]"),
    daysValue: document.querySelector("span[data-days]"),
    hoursValue: document.querySelector("span[data-hours]"),
    minutesValue: document.querySelector("span[data-minutes]"),
    secondsValue: document.querySelector("span[data-seconds]"),
}

// convertation ms to days, hours, min and sec
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day) < 10 ? addLeadingZero(Math.floor(ms / day)) : Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)) ;

  return { days, hours, minutes, seconds };
}

const CURRENT_DATE = new Date();
let SELECTED_DATE = new Date();

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < CURRENT_DATE) {
            Notiflix.Notify.failure('It is countDown timer, Please choose a date in the future');
        } else {
            refs.btnStart.disabled = false;
            SELECTED_DATE = selectedDates[0];
      }
  },
};

flatpickr(refs.dateTimeInput, options);
require("flatpickr/dist/themes/material_green.css");

refs.btnStart.addEventListener('click', startTimer);

function startTimer() {
    refs.btnStart.disabled = true;
    refs.dateTimeInput.disabled = true;
    getDeltaTime();
}

function getDeltaTime() {
    timerId = setInterval(() => {
        let delta = SELECTED_DATE - Date.now();
        const dateOffset = convertMs(delta);
        
        if (delta <= 0) {
             clearInterval(timerId);
        } else {
            clockView(dateOffset);
        }
        }, 1000);
}

function clockView(dateOffset) {
    refs.daysValue.textContent = dateOffset.days;
    refs.hoursValue.textContent = dateOffset.hours;
    refs.minutesValue.textContent = dateOffset.minutes;
    refs.secondsValue.textContent = dateOffset.seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

