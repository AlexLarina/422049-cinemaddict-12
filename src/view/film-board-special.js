import Abstract from "./abstract.js";

const createExtraFilmListTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>

      <div class="films-list__container">

      <div>
    </section>`
  );
};

export default class FilmBoardSpecial extends Abstract {
  constructor(heading) {
    super();
    this._heading = heading;
  }

  getTemplate() {
    return createExtraFilmListTemplate(this._heading);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}

