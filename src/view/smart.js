import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();

    this._film = {};
  }

  updateData(update, justDataUpdating = false) {
    if (!update) {
      return;
    }

    if (justDataUpdating) {
      return;
    }

    this._film = Object.assign(
        {},
        this._film,
        update
    );

    this.updateElement();
  }

  updateElement() {
    let previousElement = this.getElement(); // почему тут let ??
    const parent = previousElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, previousElement); // не replace ?
    previousElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
