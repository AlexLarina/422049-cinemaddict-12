import Abstract from "./abstract.js";

import {formatReleaseYear, formatDuration} from "../lib/date.js";
import {MAX_DESCRIPTION_LENGTH} from "../lib/const.js";
import {cutDescription} from "../lib/util.js";

const createFilmCardTemplate = (film) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments, toWatchList, isWatched, isFavourite} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatReleaseYear(releaseDate)}</span>
        <span class="film-card__duration">${formatDuration(duration)}</span>
        <span class="film-card__genre">${genres.join(`, `)}</span>
      </p>
      <img src="./${poster}" alt="${poster.split(`.`)[0]}" class="film-card__poster">
      <p class="film-card__description">${
    description.length > MAX_DESCRIPTION_LENGTH ?
      cutDescription(description, MAX_DESCRIPTION_LENGTH) : description
    }</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${toWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``} ">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavourite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends Abstract {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._watchedClickClickHandler = this._watchedClickClickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favouriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favouriteClick();
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchListClick();
  }

  _watchedClickClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, this._clickHandler);

    this.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, this._clickHandler);

    this.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._clickHandler);
  }

  setFavouriteClickHandler(callback) {
    this._callback.favouriteClick = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favouriteClickHandler);
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.toWatchListClick = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._addToWatchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickClickHandler);
  }

}
