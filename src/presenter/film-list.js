import {render} from "../lib/render.js";

import FilmBoardView from "../view/film-board.js";
import FilmView from "../view/film.js";
import FilmPopupView from "../view/film-popup.js";

const FILM_CARDS_AMOUNT = 8;
const MAX_CARDS_SHOWN_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmBoardComponent = new FilmBoardView();
  }

  init(filmItems) {
    this._filmItems = filmItems.slice();

    render(this._filmListContainer, this._filmBoardComponent);

    this._renderFilmBoard(this._filmItems);
  }

  _renderFilm(filmItem) {
    const filmComponent = new FilmView(filmItem);
    const filmPopupComponent = new FilmPopupView(filmItem);

    filmPopupComponent.setClosePopupClickHandler(() => {
      this._filmListContainer.removeChild(filmPopupComponent.getElement());
    });

    filmComponent.setOpenPopupClickHandler(() => {
      render(this._filmListContainer, filmPopupComponent);
    });

    return filmComponent.getElement();
  }

  _renderFilmPopup() {

  }

  _createFilmsFragment(filmsData) {
    const fragment = new DocumentFragment();

    filmsData.forEach((filmDataItem) => {
      fragment.appendChild(this._renderFilm(filmDataItem));
    });

    return fragment;
  }

  _renderFilms(from, to) {
    return this._createFilmsFragment(
        this._filmItems
        .slice(from, to)
    );
  }

  _renderFilmBoard() {
    render(
        this._filmBoardComponent.getContainer(),
        this._renderFilms(0, MAX_CARDS_SHOWN_PER_STEP)
    );

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
      render(
          this._filmBoardComponent.getContainer(),
          this._renderFilms(
              renderedFilmCount,
              renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP
          )
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
}
