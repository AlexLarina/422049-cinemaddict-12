import {updateItem} from "../lib/util.js";
import {render} from "../lib/render.js";
import {FilterType} from "../lib/const.js";
import {sortByDate, sortByRating} from "../lib/sort.js";

import FilmBoardView from "../view/film-board.js";

import FilmPresenter from "../presenter/film.js";


const FILM_CARDS_AMOUNT = 8;
const MAX_CARDS_SHOWN_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer, filterComponent) {
    this._filmListContainer = filmListContainer;

    this._filmPresenter = {};

    this._filmBoardComponent = new FilmBoardView();
    this._filterComponent = filterComponent;

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);

    this._renderedFilmCount = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ?
      0 : MAX_CARDS_SHOWN_PER_STEP;
  }

  init(filmItems) {
    this._filmItems = filmItems.slice();
    this._initialFilmListItems = filmItems.slice();

    render(this._filmListContainer, this._filmBoardComponent);

    this._renderFilmBoard(this._filmItems);
  }

  _filterFilms(filter) {
    switch (filter) {
      case FilterType.DATE:
        this._filmItems.sort(sortByDate);
        break;
      case FilterType.RATING:
        this._filmItems.sort(sortByRating);
        break;
      default:
        this._filmItems = this._initialFilmListItems;
    }

    console.log(this._filmItems);
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

  _renderFilms(from, to) {
    this._filmItems
      .slice(from, to)
      .forEach((filmItem) =>
        this._renderFilm(filmItem)
      );
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());

    this._filmPresenter = {};

    this._renderedFilmCount = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ?
      0 : MAX_CARDS_SHOWN_PER_STEP;

    if (this._filmItems.length > MAX_CARDS_SHOWN_PER_STEP) {
      this._displayShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }
    console.log(this._renderedFilmCount);
  }

  _handleFilterClick(filter) {
    this._filterFilms(filter);

    this._clearFilmList();
    this._renderFilmBoard();
  }

  _renderFilmBoard() {
    this._renderFilms(0, MAX_CARDS_SHOWN_PER_STEP);

    if (this._filmItems.length > MAX_CARDS_SHOWN_PER_STEP) {
      this._renderLoadMoreButton(this._filmItems);
    } else {
      this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }

    this._filterComponent.setFilterClickHandler(this._handleFilterClick);
  }

  _renderLoadMoreButton() {
    this._filmBoardComponent.setShowMoreClickHandler(() => {
      this._renderFilms(
          this._renderedFilmCount,
          this._renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP
      );

      this._renderedFilmCount += MAX_CARDS_SHOWN_PER_STEP;

      if (this._renderedFilmCount > this._filmItems.length) {
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
    this._filmItems = updateItem(this._filmItems, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
