import AbstractView from "./abstract.js";

const createNavigationItemTemplate = (navItem) => {
  // сделать деструктуризацию объекта или и так норм ?
  return (
    `<a
      href="#${navItem.name}"
      data-filter-type="${navItem.name}"
      class="main-navigation__item ${navItem.isSelected ? `main-navigation__item--active` : ``}"
    >
      ${navItem.description}
      ${navItem.name === `all` ? `` :
      `<span class="main-navigation__item-count">
        ${navItem.amount}
      </span>`}
    </a>`
  );
};

const createNavigationTemplate = (navigation) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${navigation.map((item) => (
      createNavigationItemTemplate(item)
    ))
    .join(``)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor(navigation) {
    super();
    this._navigation = navigation;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
  }

  _filterClickHandler(evt) {
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }
    evt.preventDefault();

    this._callback.filterClick(evt.target.dataset.filterType);
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;

    this.getElement().addEventListener(`click`, this._filterClickHandler);
  }
}

