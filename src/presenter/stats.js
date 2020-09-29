import {remove, render} from "../lib/render.js";
import {PeriodsFromNow} from "../lib/statistics.js";
import {StatsFilterType} from "../lib/const.js";
import StatsView from "../view/stats.js";

export default class Stats {
  constructor(statsContainer, filmsModel) {
    this._statsContainer = statsContainer;
    this._filmsModel = filmsModel;

    this._statsComponent = null;
    this._handlePeriodChange = this._handlePeriodChange.bind(this);
  }

  init(filterType = StatsFilterType.ALL) {
    // очищаем доску
    this._clearStatsBoard();
    // фильтруем фильмы
    const films = this._filtrateByPeriodType(
        filterType,
        this._getWatchedFilms(
            this._filmsModel.getFilms()
        )
    );

    // создаем новую вьюшку
    this._statsComponent = new StatsView(films, filterType);
    this._statsComponent.setStatPeriodChangeHandler(this._handlePeriodChange);
    // отрисовываем новую вьюшку
    this._renderStatsBoard();
  }

  destroy() {
    remove(this._statsComponent);
  }

  _getWatchedFilms(films) {
    return films.slice().filter((film) => film.isWatched);
  }

  _filterWatched(films) {
    return films.slice().filter((film) => film.isWatched);
  }

  _handlePeriodChange(filterType) {
    this.init(filterType);
  }

  _renderStatsBoard() {
    render(this._statsContainer, this._statsComponent);
  }

  _clearStatsBoard() {
    if (this._statsComponent) {
      remove(this._statsComponent);
    }
  }

  _filtrateFilms(films, dateFrom) {
    return films.filter((film) => {
      const watchingDate = new Date(film.watchingDate).getTime();
      return watchingDate >= dateFrom && watchingDate <= Date.now();
    });
  }

  _filtrateByPeriodType(periodFilterType, films) {
    // @TO-DO не нравится в кейсе all
    switch (periodFilterType) {
      case StatsFilterType.ALL:
        return films;

      case StatsFilterType.TODAY:
        films = this._filtrateFilms(films, PeriodsFromNow.TODAY);
        break;

      case StatsFilterType.WEEK:
        films = this._filtrateFilms(films, PeriodsFromNow.LAST_WEEK);
        break;

      case StatsFilterType.MONTH:
        films = this._filtrateFilms(films, PeriodsFromNow.LAST_MONTH);
        break;

      case StatsFilterType.YEAR:
        films = this._filtrateFilms(films, PeriodsFromNow.LAST_YEAR);
        break;
    }

    return films;
  }

}
