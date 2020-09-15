import AbstractView from "./abstract.js";
import {FilterType} from "../lib/const.js";

const createFiltersTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-filter-type="${FilterType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-filter-type="${FilterType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-filter-type="${FilterType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Filters extends AbstractView {
  constructor() {
    super();

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate();
  }

  _filterClickHandler(evt) {
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }
    evt.preventDefault();

    this._removeActiveFilter();
    this._setActiveFilter(evt.target);

    this._callback.filterClick(evt.target.dataset.filterType);
  }

  _setActiveFilter(filter) {
    filter.classList.add(`sort__button--active`);
  }

  _removeActiveFilter() {
    const activeFilter = this.getElement().querySelector(`.sort__button--active`);

    if (activeFilter) {
      activeFilter.classList.remove(`sort__button--active`);
    }
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;

    this.getElement().addEventListener(`click`, this._filterClickHandler);
  }
}

