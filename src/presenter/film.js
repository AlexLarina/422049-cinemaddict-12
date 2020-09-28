import FilmView from "../view/film.js";
import FilmPopupView from "../view/film-popup.js";

import {render, remove, replace} from "../lib/render.js";
import {CommentAction, UpdateType} from "../lib/const.js";

import CommentListPresenter from "../presenter/comments-list.js";

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
  constructor(filmListContainer, filmPopupContainer, changeData, changeMode, api) {
    this._filmListContainer = filmListContainer;
    this._filmPopupContainer = filmPopupContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;
    this._isCommentArrayLoaded = false;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleDetailsChange = this._handleDetailsChange.bind(this);

    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._changeCommentsData = this._changeCommentsData.bind(this);
  }

  init(film) {
    this._film = film;

    const previousFilmComponent = this._filmComponent;

    if (this._mode !== Mode.POPUP) {
      this._filmComponent = this._createFilmComponent();
    }

    const previousPopupComponent = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(film);

    this._commentsListPresenter = new CommentListPresenter(
        this._filmPopupComponent.getCommentsContainer(),
        this._changeCommentsData
    );

    this._filmPopupComponent.setClosePopupClickHandler(this._handleClosePopupClick);
    this._filmPopupComponent.setDetailsChangeHandler(this._handleDetailsChange);

    if (previousFilmComponent === null || previousPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, previousFilmComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmPopupComponent, previousPopupComponent);
    }

    if (this._mode !== Mode.POPUP) {
      remove(previousFilmComponent);
    }

    remove(previousPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _getComments() {
    this._api
      .getFilmComments(this._film.id)
      .then((comments) => {
        this._isCommentArrayLoaded = true;
        this._renderComments(comments);
      })
      .catch(() => {
        // @TO-DO что показать, если комменты не подгрузились
        this._commentsListPresenter.init([]);
      });
  }

  _renderComments(comments) {
    if (this._isCommentArrayLoaded) {
      // const commentsListPresenter = new CommentListPresenter(
      //     this._filmPopupComponent.getCommentsContainer(),
      //     this._changeCommentsData
      // );
      this._commentsListPresenter.init(comments);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hidePopup();
    }
  }

  _createFilmComponent() {
    const filmComponent = new FilmView(this._film);
    filmComponent.setOpenPopupClickHandler(this._handleOpenPopupClick);
    filmComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    filmComponent.setAddToWatchListClickHandler(this._handleAddToWatchListClick);
    filmComponent.setWatchedClickHandler(this._handleWatchedClick);

    return filmComponent;
  }

  _showPopup() {
    this._getComments();

    render(this._filmPopupContainer, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _hidePopup() {
    this._filmPopupComponent.getElement().remove();

    const previousFilmComponent = this._filmComponent;
    this._filmComponent = this._createFilmComponent();
    replace(this._filmComponent, previousFilmComponent);

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._hidePopup();
    }
  }

  _changeCommentsData(actionType, comment) {
    let updatedComments = this._film.comments.slice();

    switch (actionType) {
      case CommentAction.DELETE:
        this._api.deleteComment(comment).then(() => {
          this._getComments();
        });
        // updatedComments = this._film.comments.filter((item) => item.id !== comment.id);

        // this._changeData(
        //     UpdateType.PATCH,
        //     Object.assign(
        //         {},
        //         this._film,
        //         {
        //           comments: updatedComments
        //         }
        //     )
        // );
        break;

      case CommentAction.ADD:
        // офигенный прикол: после push updatedComments хранил в себе длину массива,
        // это что за магия вне Хогвартса ?
        // updatedComments = this._film.comments.push(comment);
        updatedComments = [...updatedComments, comment];

        this._changeData(
            UpdateType.PATCH,
            Object.assign(
                {},
                this._film,
                {
                  comments: updatedComments
                }
            )
        );
        break;
    }
  }

  _handleOpenPopupClick() {
    this._showPopup();
  }

  _handleClosePopupClick() {
    this._hidePopup();
  }

  _handleFavouriteClick() {
    this._changeData(
        UpdateType.PATCH,
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
        UpdateType.PATCH,
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
        UpdateType.PATCH,
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
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              [DETAILS[detailID]]: !this._film[DETAILS[detailID]]
            }
        )
    );
  }
}
