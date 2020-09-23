import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

import {getMostFrequentElement, getElementsFrequency, capitalize} from "../lib/util.js";

import SmartView from "./smart.js";

const createGenresArray = (films) => {
  let genresArray = [];
  films.forEach((film) => genresArray.push(...film.genres));
  return genresArray;
};

const renderChart = (statisticCtx, films) => {
  const genresArray = createGenresArray(films);
  const genresDictionary = getElementsFrequency(genresArray);

  let genresSortedByFrequency = Object
    .entries(genresDictionary)
    .sort((a, b) => b[1] - a[1]);

  genresSortedByFrequency = Object.fromEntries(genresSortedByFrequency);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genresSortedByFrequency).map((genre) => capitalize(genre)),
      datasets: [{
        data: Object.values(genresSortedByFrequency),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsTemplate = (films) => {
  const filmsCount = films.length;
  let totalTimeMinutes = films.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
  totalTimeMinutes = moment
    .utc()
    .startOf(`day`)
    .add({
      minutes: totalTimeMinutes
    });

  const genresArray = createGenresArray(films);
  const topGenre = capitalize(getMostFrequentElement(genresArray));

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">
            ${filmsCount} <span class="statistic__item-description">movies</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${totalTimeMinutes.format(`H`)} <span class="statistic__item-description">h</span> ${totalTimeMinutes.format(`mm`)} <span class="statistic__item-description">m</span>
            </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Stats extends SmartView {
  constructor(films) {
    super();

    this._films = films;
    this._chart = null;

    // зачем это тут ?
    this._setChart();

    this._statPeriodChangeHandler = this._statPeriodChangeHandler.bind(this);
  }

  _statPeriodChangeHandler(evt) {
    if (evt.target.name !== `statistic-filter`) {
      return;
    }

    evt.preventDefault();
    this._callback.periodChangeHandler(evt.target.value);
  }

  getTemplate() {
    return createStatsTemplate(this._films);
  }

  removeElement() {
    super.removeElement();

    if (this._chart !== null) {
      this._chart = null;
    }
  }

  restoreHandlers() {
    this._setChart();
  }

  _setChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._chart = renderChart(statisticCtx, this._films);
  }

  setStatPeriodChangeHandler(callback) {
    this._callback.periodChangeHandler = callback;

    this
      .getElement()
      .querySelector(`.statistic__filters`)
      .addEventListener(`change`, this._statPeriodChangeHandler);
  }
}
