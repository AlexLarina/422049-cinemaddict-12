import {render} from "../lib/render.js";
import {SortType, MAX_CARDS_SHOWN_PER_STEP} from "../lib/const.js";
import {sortByDate, sortByRating} from "../lib/sort.js";

import FilmBoardView from "../view/film-board.js";

import FilmPresenter from "../presenter/film.js";

export default class FilmList {
  constructor(filmListContainer, sortComponent, filmsModel) {
    this._filmsModel = filmsModel;
    this._filmListContainer = filmListContainer;

    this._filmPresenter = {};

    this._filmBoardComponent = new FilmBoardView();
    this._sortComponent = sortComponent;

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);

    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;
  }

  init() {
    // this._filmItems = filmItems.slice();
    // this._initialFilmListItems = filmItems.slice();

    render(this._filmListContainer, this._filmBoardComponent);

    this._renderFilmBoard(this._filmItems);
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }

    return this._filmsModel.getFilms();
  }

  _renderFilm(filmItem) {
    const filmPresenter = new FilmPresenter(
        this._filmBoardComponent.getContainer(),
        this._filmListContainer,
        this._handleFilmChange,
        this._handleModeChange
    );

    filmPresenter.init(filmItem);
    this._filmPresenter[filmItem.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((filmItem) => this._renderFilm(filmItem));
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());

    this._filmPresenter = {};

    this._renderedFilmCount = MAX_CARDS_SHOWN_PER_STEP;

    if (this._filmItems.length > MAX_CARDS_SHOWN_PER_STEP) {
      this._displayShowMoreButton(this._filmBoardComponent.getShowMoreButton());
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

  _handleFilmChange(updatedFilm) {
    // waiting for model update
    // про обновление отсортированных карточек не забыть
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
