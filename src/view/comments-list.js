import Abstract from "./abstract.js";
import {render, createElement, removeChild} from "../lib/render.js";

import {generateId} from "../lib/util.js";

const createNewCommentTemplate = () => {
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
  );
};

const createCommentsTemplate = () => {
  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments
        <span class="film-details__comments-count">

        </span>
      </h3>

      <ul class="film-details__comments-list">

      </ul>

      ${createNewCommentTemplate()}
    </section>`
  );
};

export default class Comments extends Abstract {
  constructor() {
    super();

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._newCommentInputHandler = this._newCommentInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

  }

  getTemplate() {
    return createCommentsTemplate();
  }

  getCommentListContainer() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getCommentCountElement() {
    return this.getElement().querySelector(`.film-details__comments-count`);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    const emojiContainerElement = this.getElement().querySelector(`.film-details__add-emoji-label`);
    removeChild(emojiContainerElement);

    // @ TO-DO refactor
    if (evt.target.tagName.toLowerCase() === `img`) {
      const emojiName = evt.target.src.split(`/`).pop().split(`.`)[0];
      const createEmojiTemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
      const emojiElement = createElement(createEmojiTemplate(emojiName));
      render(emojiContainerElement, emojiElement);
    }

    this._callback.emojiClick();
  }

  _newCommentInputHandler(evt) {
    evt.preventDefault();

    const emojiElement = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    let emojiChosen = ``;

    if (emojiElement) {
      emojiChosen = emojiElement.alt.split(`-`)[1];
    }

    const newComment = {
      emotion: emojiChosen,
      date: new Date().toISOString(),
      comment: evt.target.value
    };

    return newComment;
  }

  _formSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter` ||
        evt.metaKey && evt.key === `Enter`) {

      const newComment = this._newCommentInputHandler(evt);
      this._callback.formSubmit(newComment);
    }
  }

  setEmojiClickHandler(callback) {
    this._callback.emojiClick = callback;

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emojiClickHandler);
  }

  setNewCommentInputHandler() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._newCommentInputHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._formSubmitHandler);
  }
}
