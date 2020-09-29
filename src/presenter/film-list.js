import {remove, render} from "../lib/render.js";
import {SortType, MAX_CARDS_SHOWN_PER_STEP, UpdateType, ExtraBoardType} from "../lib/const.js";
import {sortByDate, sortByRating, sortByComments} from "../lib/sort.js";
import {filtrate} from "../lib/filter.js";

import FilmBoardView from "../view/film-board.js";
import EmptyBoardView from "../view/empty-board.js";
import LoadingView from "../view/loading.js";

import FilmPresenter from "../presenter/film.js";

export default class FilmList {
  constructor(filmListContainer, sortComponent, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmListContainer = filmListContainer;
    this._api = api;

    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;

    this._filmPresenter = {};
    this._isLoading = true;

    this._filmBoardComponent = new FilmBoardView();
    this._emptyComponent = new EmptyBoardView();
    this._loadingComponent = new LoadingView();
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
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  _renderFilm(filmItem, container) {
    const filmPresenter = new FilmPresenter(
        container,
        this._filmListContainer,
        this._handleViewAction,
        this._handleModeChange,
        this._api
    );

    filmPresenter.init(filmItem);
    this._filmPresenter[filmItem.id] = filmPresenter;
  }

  _renderFilms(films, container) {
    films.forEach((filmItem) => this._renderFilm(filmItem, container));
  }

  _renderExtraBoard(boardType, films) {
    const MAX_EXTRA_AMOUNT = 2;
    switch (boardType) {
      case ExtraBoardType.RATED:
        const mostRated = films
          .slice()
          .sort(sortByRating)
          .slice(0, MAX_EXTRA_AMOUNT);

        this._renderFilms(
            mostRated,
            this._filmBoardComponent.getRatedContainer()
        );
        break;
      case ExtraBoardType.COMMENTED:
        const mostCommented = films
          .slice()
          .sort(sortByComments)
          .slice(0, MAX_EXTRA_AMOUNT);

        this._renderFilms(
            mostCommented,
            this._filmBoardComponent.getCommentedContainer()
        );
        break;
    }
  }

  _renderEmptyBoard() {
    render(this._filmListContainer, this._emptyComponent);
  }

  _renderLoading() {
    render(this._filmListContainer, this._loadingComponent);
  }

  _clearFilmList() {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());
    this._filmPresenter = {};

    // @ TO-DO зачем его удалять, если он будет null. Добавить проверку ?
    remove(this._emptyComponent);
    remove(this._loadingComponent);

    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;

    if (filmCount > MAX_CARDS_SHOWN_PER_STEP) {
      this._displayShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }

  }

  _handleViewAction(updateType, update) {
    this._api.updateFilm(update).then((responce) => {
      this._filmsModel.updateFilm(updateType, responce);
    });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;
    console.log(`filmCount from board` + filmCount);

    if (filmCount === 0) {
      this._renderEmptyBoard();
      return;
    }

    render(this._filmListContainer, this._filmBoardComponent);

    this._renderFilms(
        films.slice(0, Math.min(filmCount, this._renderedFilmCount)),
        this._filmBoardComponent.getContainer()
    );

    this._renderExtraBoard(ExtraBoardType.RATED, films);
    this._renderExtraBoard(ExtraBoardType.COMMENTED, films);

    if (filmCount > this._renderedFilmCount) {
      this._handleLoadMoreButtonClick(this._filmItems);
    } else {
      this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }

    this._sortComponent.setSortTypeClickHandler(this._handleSortTypeClick);
  }

  _handleLoadMoreButtonClick() {
    console.log(`clicked`);
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(
        filmCount,
        this._renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP
    );

    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._filmBoardComponent.setShowMoreClickHandler(() => {
      console.log(`clicked`);
      this._renderFilms(
          films,
          this._filmBoardComponent.getContainer()
      );

      this._renderedFilmCount = newRenderedFilmCount;

      console.log(`this._renderedFilmCount = ` + this._renderedFilmCount);
      console.log(`filmCount = ` + filmCount);

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
