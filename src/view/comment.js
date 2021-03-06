import he from "he";
import {formatCommentDate} from "../lib/date.js";

import Abstract from "./abstract.js";

const createCommentTemplate = (comment) => {
  return (
    `<li class="film-details__comment" data-id="${comment.id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion ? comment.emotion : `smile`}.png" width="55" height="55" alt="emoji-${comment.emotion ? comment.emotion : `smile`}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${formatCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends Abstract {
  constructor(comment) {
    super();

    this._comment = comment;
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _setDeletingState() {
    this
    .getElement()
    .querySelector(`.film-details__comment-delete`)
    .textContent = `Deleting...`;
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._setDeletingState();

    this._callback.deleteClick(evt.target.dataset.id);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;

    this
      .getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, this._deleteClickHandler);
  }
}
