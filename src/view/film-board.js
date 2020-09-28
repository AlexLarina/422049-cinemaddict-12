import Abstract from "./abstract.js";
import FilmBoardSpecialView from "./film-board-special.js";

const HEADINGS = [`Top rated`, `Most commented`];

const createFilmSectionTemplate = () => {
  const [rated, commented] = HEADINGS;
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">

        </div>

        <button class="films-list__show-more">Show more</button>
      </section>
      <section class="films-list--extra" data-extra-type="rated">
        ${new FilmBoardSpecialView(rated).getTemplate()}
      </section>
      <section class="films-list--extra" data-extra-type="commented">
        ${new FilmBoardSpecialView(commented).getTemplate()}
      </section>
    </section>
    `
  );
};

export default class FilmBoard extends Abstract {
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

  getRatedContainer() {
    const ratedElement = this.getElement().querySelector(`[data-extra-type="rated"]`);
    return ratedElement.querySelector(`.films-list__container`);
  }

  getCommentedContainer() {
    const ratedElement = this.getElement().querySelector(`[data-extra-type="commented"]`);
    return ratedElement.querySelector(`.films-list__container`);
  }

  setShowMoreClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.films-list__show-more`)
      .addEventListener(`click`, this._clickHandler);
  }
}

