import Observer from "../lib/observer.js";

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(update) {
    const updateIndex = this._films.findIndex((item) => item.id === update.id);

    if (updateIndex === -1) {
      throw new Error(`Can't update unexisting film.`);
    }

    this._films = [
      ...this._films.slice(0, updateIndex),
      update,
      ...this._films.slice(updateIndex + 1)
    ];

    this._notify(update);
  }
}
