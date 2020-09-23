import {remove, render} from "../lib/render.js";
import StatsView from "../view/stats.js";

export default class Stats {
  constructor(statsContainer, films) {
    this._statsContainer = statsContainer;
    this._films = films;

    //this._films = films.slice().filter((film) => film.isWatched);

    // this._statsComponent = new StatsView(this._films);
    this._statsComponent = null;

    this._handlePeriodChange = this._handlePeriodChange.bind(this);

    // this._statsComponent.setStatPeriodChangeHandler(this._handlePeriodChange);
  }

  init() {
    //let films = this._filmsModel.getFilms();
    this._films = this._films.slice().filter((film) => film.isWatched);
    //console.log(films);
    this._statsComponent = new StatsView(this._films);
    this._statsComponent.setStatPeriodChangeHandler(this._handlePeriodChange);
    this._renderStatsBoard();
  }

  destroy() {
    remove(this._statsComponent);
  }

  _filterWatched(films) {
    return films.slice().filter((film) => film.isWatched)
  }

  _handlePeriodChange(filterType) {
    console.log(filterType);
    this._clearStatsBoard();

    if (filterType === `week`) {
      const lastWeek = Date.now() / 1000 - 7 * 24 * 60 * 60;

      films = this._filterByPeriod(lastWeek, films);
      this.init(films);
    }
    // setTimeout(() => {
    //   this.init(this._films);
    // }, 2000);
  }

  _renderStatsBoard() {
    render(this._statsContainer, this._statsComponent);
  }

  _clearStatsBoard() {
    remove(this._statsComponent);
  }

  _filterByPeriod(dateFrom, films) {
    films.filter((film) => {
      let watchingDate = new Date(film.watchingDate);
      return watchingDate >= dateFrom && watchingDate <= Date.now();
    });
  }

}
