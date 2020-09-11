import {updateItem} from "../lib/util.js";
import {render} from "../lib/render.js";

import FilmBoardView from "../view/film-board.js";

import FilmPresenter from "../presenter/film.js";

const FILM_CARDS_AMOUNT = 8;
const MAX_CARDS_SHOWN_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmPresenter = {};

    this._filmBoardComponent = new FilmBoardView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(filmItems) {
    this._filmItems = filmItems.slice();

    render(this._filmListContainer, this._filmBoardComponent);

    this._renderFilmBoard(this._filmItems);
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
  }

  _renderFilmBoard() {
    this._renderFilms(0, MAX_CARDS_SHOWN_PER_STEP);

    if (this._filmItems.length > MAX_CARDS_SHOWN_PER_STEP) {
      this._renderLoadMoreButton(this._filmItems);
    } else {
      this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
    }
  }

  _renderLoadMoreButton() {
    let renderedFilmCount = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ?
      0 : MAX_CARDS_SHOWN_PER_STEP;

    this._filmBoardComponent.setShowMoreClickHandler(() => {
      this._renderFilms(
          renderedFilmCount,
          renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP
      );

      renderedFilmCount += MAX_CARDS_SHOWN_PER_STEP;

      if (renderedFilmCount > this._filmItems.length) {
        this._hideShowMoreButton(this._filmBoardComponent.getShowMoreButton());
      }
    });
  }

  _hideShowMoreButton(button) {
    button.setAttribute(`style`, `display: none;`);
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
