import Abstract from "./abstract.js";

const createNavigationItemTemplate = (filter) => {
  // сделать деструктуризацию объекта или и так норм ?
  return (
    `<a
      href="#${filter.name}"
      data-filter-type="${filter.name}"
      class="main-navigation__item ${filter.isSelected ? `main-navigation__item--active` : ``}"
    >
      ${filter.description}
      ${filter.name === `all` ? `` :
      `<span class="main-navigation__item-count">
        ${filter.amount}
      </span>`}
    </a>`
  );
};

const createNavFiltersTemplate = (filters) => {
  return (
    `<div class="main-navigation__items">
      ${filters.map((filter) => (
      createNavigationItemTemplate(filter)
    ))
  .join(``)}
    </div>`
  );
};

export default class NavFilters extends Abstract {
  constructor(filters) {
    super();

    this._filters = filters;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createNavFiltersTemplate(this._filters);
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

    this
      .getElement()
      .addEventListener(`click`, this._filterClickHandler);
  }
}
