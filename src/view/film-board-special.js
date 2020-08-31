import {createElement} from "../lib/util.js";
import FilmView from "./film.js";
//import createFilmCardTemplate from "./film.js";

const createExtraFilmListTemplate = (heading, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>

      <div class="films-list__container">
        ${films.map((film) => new FilmView(film).getTemplate())
          .join(``)}
      <div>
    </section>`
  );
};

class FilmBoardSpecial {
  constructor(heading, films) {
    this._heading = heading;
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmListTemplate(this._heading, this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmBoardSpecial;
