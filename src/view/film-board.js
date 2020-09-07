import AbstractView from "./abstract.js";

const createFilmSectionTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">

        </div>
        <button class="films-list__show-more">Show more</button>
      </section>
    `
  );
};

export default class FilmBoard extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  getTemplate() {
    return createFilmSectionTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  getShowMoreButton() {
    return this.getElement().querySelector(`.films-list__show-more`);
  }

  setShowMoreClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.films-list__show-more`)
      .addEventListener(`click`, this._clickHandler);
  }
}

