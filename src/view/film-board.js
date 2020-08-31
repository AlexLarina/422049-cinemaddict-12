import FilmBoardSpecialView from "./film-board-special.js";

import {createElement} from "../lib/util.js";

const EXTRA_FILM_CARDS_AMOUNT = 2;

const createFilmSectionTemplate = (films) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">

        </div>
        <button class="films-list__show-more">Show more</button>
      </section>
      ${new FilmBoardSpecialView(`Top rated`, films.slice(0, EXTRA_FILM_CARDS_AMOUNT)).getTemplate()}
      ${new FilmBoardSpecialView(`Most commented`, films.slice(0, EXTRA_FILM_CARDS_AMOUNT)).getTemplate()}
    `
  );
};

class FilmBoard {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmSectionTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  getShowMoreButton() {
    return this.getElement().querySelector(`.films-list__show-more`);
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmBoard;
