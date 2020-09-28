import {remove, render, replace} from "../lib/render.js";
import CommentsView from "../view/comments-list.js";
import CommentView from "../view/comment.js";

import {CommentAction} from "../lib/const.js";

export default class CommentList {
  constructor(commentsContainer, changeCommentData) {
    this._commentsContainer = commentsContainer;
    this._changeCommentData = changeCommentData;

    this._commentsComponent = null;

    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handlePopupSubmit = this._handlePopupSubmit.bind(this);
  }

  init(comments) {
    this._comments = comments;
    const previousCommentsComponent = this._commentsComponent;
    this._commentsComponent = new CommentsView();

    this._renderCommentsList(this._comments);
    this._commentsComponent.getCommentCountElement().textContent = comments.length;

    render(this._commentsContainer, this._commentsComponent);

    this._commentsComponent.setEmojiClickHandler(this._handleEmojiClick);
    this._commentsComponent.setFormSubmitHandler(this._handlePopupSubmit);

    if (previousCommentsComponent === null) {
      render(this._commentsContainer, this._commentsComponent);
      return;
    }

    replace(this._commentsComponent, previousCommentsComponent);
    remove(previousCommentsComponent);
  }

  _renderComment(comment) {
    this._commentComponent = new CommentView(comment);

    this._commentComponent.setDeleteClickHandler(() => {
      this._changeCommentData(CommentAction.DELETE, comment);
    });

    render(
        this._commentsComponent.getCommentListContainer(),
        this._commentComponent
    );
  }

  _renderCommentsList(comments) {
    comments.forEach((comment) => this._renderComment(comment));
  }

  _handleEmojiClick() {
    // @TO-DO обработчик получается пустой
  }

  _handlePopupSubmit(comment) {
    this._changeCommentData(CommentAction.ADD, comment);
  }
}
