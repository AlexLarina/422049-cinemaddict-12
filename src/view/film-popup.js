import Smart from "./smart.js";

import {formatReleaseDate, formatDuration} from "../lib/date.js";
import {capitalize} from "../lib/util.js";

const createFilmPopupTemplate = (film) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${film.poster}" alt="">

              <p class="film-details__age">${film.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.title}</h3>
                  <p class="film-details__title-original">Original: ${film.originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(film.releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatDuration(film.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${film.genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${film.genres
                      .map((genre) => `<span class="film-details__genre">${capitalize(genre)}</span>`)
                      .join(``)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.toWatchList ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isWatched ? `checked` : `` }>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavourite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">

        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends Smart {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._detailsChangeHandler = this._detailsChangeHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _detailsChangeHandler(evt) {
    evt.preventDefault();
    const detailInputID = (evt.target.tagName.toLowerCase() === `input`) ? evt.target.id : null;
    this._callback.detailsChange(detailInputID);
  }

  restoreHandlers() {
    this.setClosePopupClickHandler(this._callback.click);
    this.setDetailsChangeHandler(this._callback.detailsChange);
    this.setEmojiClickHandler(this._callback.emojiClick);
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  setClosePopupClickHandler(callback) {
    this._callback.click = callback;

    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._clickHandler);
  }

  setDetailsChangeHandler(callback) {
    this._callback.detailsChange = callback;

    this.getElement()
      .querySelector(`.film-details__controls`)
      .addEventListener(`change`, this._detailsChangeHandler);
  }

  getCommentsContainer() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }
}

