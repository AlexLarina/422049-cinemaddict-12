import FilmView from "../view/film.js";
import FilmPopupView from "../view/film-popup.js";
import {render, remove, replace} from "../lib/render.js";

const DETAILS = {
  'watchlist': `toWatchList`,
  'watched': `isWatched`,
  'favorite': `isFavourite`
};

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};


export default class Film {
  constructor(filmListContainer, filmPopupContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._filmPopupContainer = filmPopupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handlePopupSubmit = this._handlePopupSubmit.bind(this);
    this._handleDetailsChange = this._handleDetailsChange.bind(this);


    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const previousFilmComponent = this._filmComponent;
    const previousPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film);

    this._filmComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    this._filmComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._filmComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);

    this._filmPopupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmPopupComponent.setDetailsChangeHandler(this._handleDetailsChange);
    this._filmPopupComponent.setEmojiClickHandler(this._handleEmojiClick);
    this._filmPopupComponent.setFormSubmitHandler(this._handlePopupSubmit);

    if (previousFilmComponent === null || previousPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent);
      return;
    }

    // if (this._filmListContainer instanceof Abstract) {
    //   this._filmListContainer = this._filmListContainer.getElement();
    // }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, previousFilmComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmPopupComponent, previousPopupComponent);
    }

    remove(previousFilmComponent);
    remove(previousPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hidePopup();
    }
  }

  _showPopup() {
    render(this._filmPopupContainer, this._filmPopupComponent);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _hidePopup() {
    this._filmPopupContainer.removeChild(this._filmPopupComponent.getElement());
    this._mode = Mode.DEFAULT;
  }

  _handleOpenPopupClick() {
    this._showPopup();
  }

  _handleClosePopupClick() {
    this._hidePopup();
  }

  _handleFavouriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavourite: !this._film.isFavourite
            }
        )
    );
  }

  _handleAddToWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              toWatchList: !this._film.toWatchList,
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched,
            }
        )
    );
  }

  _handleDetailsChange(detailID) {
    if (!detailID) {
      return;
    }

    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              [DETAILS[detailID]]: !this._film[DETAILS[detailID]]
            }
        )
    );
  }

  _handleEmojiClick() {

  }

  _handlePopupSubmit(film) {
    this._changeData(film);
    this._hidePopup();
  }
}