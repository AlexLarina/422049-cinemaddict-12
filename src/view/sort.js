import AbstractView from "./abstract.js";
import {SortType} from "../lib/const.js";

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortClickHandler = this._sortClickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortClickHandler(evt) {
    if (evt.target.tagName.toLowerCase() !== `a`) {
      return;
    }
    evt.preventDefault();

    this._removeActiveSortType();
    this._setActiveSortType(evt.target);

    this._callback.sortTypeClick(evt.target.dataset.sortType);
  }

  _setActiveSortType(sortElement) {
    sortElement.classList.add(`sort__button--active`);
  }

  _removeActiveSortType() {
    const activeFilter = this.getElement().querySelector(`.sort__button--active`);

    if (activeFilter) {
      activeFilter.classList.remove(`sort__button--active`);
    }
  }

  setSortTypeClickHandler(callback) {
    this._callback.sortTypeClick = callback;

    this.getElement().addEventListener(`click`, this._sortClickHandler);
  }
}

