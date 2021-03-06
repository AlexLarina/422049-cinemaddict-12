import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {createStatsItems, sortgenresByFrequency} from "../lib/statistics.js";
import {capitalize} from "../lib/util.js";
import {StatsFilterType} from "../lib/const.js";
import {appointUserRank} from "../lib/rank.js";

import Smart from "./smart.js";

const renderChart = (statisticCtx, films) => {
  const genres = sortgenresByFrequency(films);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genres).map((genre) => capitalize(genre)),
      datasets: [{
        data: Object.values(genres),
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


const createStatsTemplate = (films, filterType) => {
  const {amount, duration, topGenre} = createStatsItems(films);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${appointUserRank(films)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${filterType === StatsFilterType.ALL ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${filterType === StatsFilterType.TODAY ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${filterType === StatsFilterType.WEEK ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${filterType === StatsFilterType.MONTH ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${filterType === StatsFilterType.YEAR ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">
            ${amount} <span class="statistic__item-description">movies</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${duration.format(`H`)} <span class="statistic__item-description">h</span> ${duration.format(`mm`)} <span class="statistic__item-description">m</span>
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

export default class Stats extends Smart {
  constructor(films, filterType) {
    super();

    this._films = films;
    this._filterType = filterType;
    this._chart = null;

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
    return createStatsTemplate(this._films, this._filterType);
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
