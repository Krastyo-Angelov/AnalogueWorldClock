import { utcToZonedTime } from 'date-fns-tz';

class Clock {
  constructor(el) {
    this.clockEl = el;
    this.UI = {};
    this.initializeClock();
  }

  updateClock = () => {
    // Getting time
    const date = new Date();
    const now = utcToZonedTime(date, this.clockEl.dataset.locale);
    // const date = now.getDate();
    const seconds =
      ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * 360;
    const minutes = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
    const hours = ((now.getHours() + now.getMinutes() / 60) / 12) * 360;

    //   UI Update
    let ending = '';
    switch (now.getDate()) {
      case 1:
        ending = '-ви';
        break;
      case 2:
        ending = '-ри';
        break;
      case 7:
        ending = '-ми';
        break;
      case 8:
        ending = '-ми';
        break;
      case 2:
        ending = '-ри';
        break;
      case 21:
        ending = '-ви';
        break;
      case 22:
        ending = '-ри';
        break;
      case 27:
        ending = '-ми';
        break;
      case 28:
        ending = '-ми';
        break;
      case 31:
        ending = '-ви';
        break;
      default:
        ending = '-ти';
    }

    let month = '';
    switch (now.getMonth() + 1) {
      case 1:
        month = 'януари';
        break;
      case 2:
        month = 'февруари';
        break;
      case 3:
        month = 'март';
        break;
      case 4:
        month = 'април';
        break;
      case 5:
        month = 'май';
        break;
      case 6:
        month = 'юни';
        break;
      case 7:
        month = 'юли';
        break;
      case 8:
        month = 'август';
        break;
      case 9:
        month = 'септември';
        break;
      case 10:
        month = 'октомври';
        break;
      case 11:
        month = 'ноември';
        break;
      case 12:
        month = 'декември';
        break;
    }

    this.UI.date.textContent = now.getDate() + ending;
    this.UI.month.textContent = month;
    this.UI.am_pm.textContent = now.getHours() > 12 ? `предиобед` : `следобед`;
    this.UI.second.style.transform = `rotate(${seconds}deg)`;
    this.UI.minute.style.transform = `rotate(${minutes}deg)`;
    this.UI.hour.style.transform = `rotate(${hours}deg)`;
    requestAnimationFrame(this.updateClock);
  };

  initializeClock() {
    this.clockEl.innerHTML = `<svg
        class="clockface"
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
        >
        <circle class="ring ring--seconds" r="145" pathlength="60" />
        <circle class="ring ring--hours" r="145" pathlength="12" />
        <circle class="ring ring--center" r="3" />
        <text x="35" y="-15" class="date">23</text>
        <text x="35" y="5" class="month">април</text>
        <text x="35" y="22" class="am-pm">am</text>
        <line class="hand hand--minute" x1="0" y1="2" x2="0" y2="-110" />
        <line class="hand hand--hour" x1="0" y1="2" x2="0" y2="-60" />
        <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-130" />
      </svg>`;
    this.UI.date = this.clockEl.querySelector('.date');
    this.UI.am_pm = this.clockEl.querySelector('.am-pm');
    this.UI.month = this.clockEl.querySelector('.month');
    this.UI.second = this.clockEl.querySelector('.hand--second');
    this.UI.minute = this.clockEl.querySelector('.hand--minute');
    this.UI.hour = this.clockEl.querySelector('.hand--hour');
    requestAnimationFrame(this.updateClock);
  }
}

const clocks = document.querySelectorAll('.clock');
clocks.forEach(el => new Clock(el));
