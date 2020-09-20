import Observer from "../lib/observer.js";
import {FilterType} from "../lib/const.js";

export default class Filter extends Observer {
  constructor() {
    super();

    this._activeFilter = FilterType.ALL;
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._notify(filter);
  }
}
