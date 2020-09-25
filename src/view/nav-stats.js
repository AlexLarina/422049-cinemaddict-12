import Abstract from "./abstract.js";

const createNavStatsTemplate = () => {
  return (
    `<a
      href="#stats"
      data-stats-type="stats"
      class="main-navigation__additional"
    >
      Stats
    </a>`
  );
};

export default class NavStats extends Abstract {
  constructor() {
    super();
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  _statsClickHandler(evt) {
    if (evt.target.dataset.statsType !== `stats`) {
      return;
    }
    evt.preventDefault();

    console.log(evt.target.dataset);

    this._callback.statsClick();
  }

  getTemplate() {
    return createNavStatsTemplate();
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;

    this
      .getElement()
      .addEventListener(`click`, this._statsClickHandler);
  }
}
