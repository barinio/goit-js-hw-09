import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let selectedTimerTime = null;

refs.startBtn.addEventListener('click', timerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const timeNow = new Date();
    if (selectedDates[0].getTime() < timeNow.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    selectedTimerTime = selectedDates[0];
    refs.startBtn.disabled = false;
  },
};
const time = flatpickr(refs.timePicker, options);
let id = null;

function timerStart() {
  updateTime();
  id = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentTime = new Date();
  if (selectedTimerTime.getTime() < currentTime.getTime()) {
    clearInterval(id);
    return;
  }

  const timerTime = convertMs(
    selectedTimerTime.getTime() - currentTime.getTime()
  );

  refs.daysValue.textContent = formatTimeValue(timerTime.days);
  refs.hoursValue.textContent = formatTimeValue(timerTime.hours);
  refs.minutesValue.textContent = formatTimeValue(timerTime.minutes);
  refs.secondsValue.textContent = formatTimeValue(timerTime.seconds);
}

function formatTimeValue(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
