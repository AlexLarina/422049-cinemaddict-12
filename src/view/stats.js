import {createElement} from "../lib/util.js";

const createStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

class Statistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Statistics;
