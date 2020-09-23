import {remove, render} from "../lib/render.js";
import {SortType, MAX_CARDS_SHOWN_PER_STEP, UpdateType} from "../lib/const.js";
import {sortByDate, sortByRating} from "../lib/sort.js";
import {filtrate} from "../lib/filter.js";

import FilmBoardView from "../view/film-board.js";
import EmptyView from "../view/empty.js";

import FilmPresenter from "../presenter/film.js";

export default class FilmList {
  constructor(filmListContainer, sortComponent, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;

    this._filmPresenter = {};

    this._filmBoardComponent = new FilmBoardView();
    this._emptyComponent = new EmptyView();
    this._sortComponent = sortComponent;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderFilmBoard();
  }

  destroy() {
    this._clearFilmList();

    remove(this._filmBoardComponent);
    // ???
    remove(this._emptyComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filtrate[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.getFilms().slice().sort(sortByRating);
    }

    return filteredFilms;
  }

  _renderFilm(filmItem) {
    const filmPresenter = new FilmPresenter(
        this._filmBoardComponent.getContainer(),
        this._filmListContainer,
        this._handleViewAction,
        this._handleModeChange
    );

    filmPresenter.init(filmItem);
    this._filmPresenter[filmItem.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((filmItem) => this._renderFilm(filmItem));
  }

  _renderEmptyBoard() {
    render(this._filmListContainer, this._emptyComponent);
  }

  _clearFilmList() {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());
    this._filmPresenter = {};

    // @ TO-DO зачем его удалять, если он будет null. Добавить проверку ?
    remove(this._emptyComponent);

    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;

    if (filmCount > MAX_CARDS_SHOWN_PER_STEP) {
      this._displayShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }

  }

  _handleViewAction(updateType, update) {
    this._filmsModel.updateFilm(updateType, update);
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.FILTER:
        this._clearFilmList();
        this._renderFilmBoard();
        break;
    }
  }

  _handleSortTypeClick(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearFilmList();
    this._renderFilmBoard();
  }

  _renderFilmBoard() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, MAX_CARDS_SHOWN_PER_STEP));

    if (filmCount === 0) {
      this._renderEmptyBoard();
      return;
    }

    render(this._filmListContainer, this._filmBoardComponent);
    this._renderFilms(films);

    if (filmCount > MAX_CARDS_SHOWN_PER_STEP) {
      this._handleLoadMoreButtonClick(this._filmItems);
    } else {
      this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }

    this._sortComponent.setSortTypeClickHandler(this._handleSortTypeClick);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(
        filmCount,
        this._renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP
    );

    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._filmBoardComponent.setShowMoreClickHandler(() => {
      this._renderFilms(films);

      this._renderedFilmCount = newRenderedFilmCount;

      if (this._renderedFilmCount >= filmCount) {
        this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
      }
    });
  }

  _hideShowMoreButton(button) {
    button.setAttribute(`style`, `display: none;`);
  }

  _displayShowMoreButton(button) {
    button.removeAttribute(`style`);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
