import {remove, render, replace} from "../lib/render.js";
import {FilterType} from "../lib/const.js";
import {filtrate} from "../lib/filter.js";
import NavigationView from "../view/navigation.js";

export default class Filter {
  constructor(navContainer, filterModel, filmsModel) {
    this._navContainer = navContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._navComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const previousNavComponent = this._navComponent;

    this._navComponent = new NavigationView(filters);
    this._navComponent.setFilterClickHandler(this._handleFilterClick);

    if (previousNavComponent === null) {
      render(this._navContainer, this._navComponent);
      return;
    }

    replace(this._navComponent, previousNavComponent);
    remove(previousNavComponent);

    // render(this._navContainer, this._navComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterClick(filterType) {
    this._filterModel.setFilter(filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        name: FilterType.ALL,
        isSelected: true,
        description: `All movies`,
        amount: filtrate[FilterType.ALL](films).length
      },
      {
        name: FilterType.WATCHLIST,
        isSelected: false,
        description: `Watchlist`,
        amount: filtrate[FilterType.WATCHLIST](films).length
      },
      {
        name: FilterType.HISTORY,
        isSelected: false,
        description: `History`,
        amount: filtrate[FilterType.HISTORY](films).length
      },
      {
        name: FilterType.FAVOURITES,
        isSelected: false,
        description: `Favorites`,
        amount: filtrate[FilterType.FAVOURITES](films).length
      }
    ];
  }
}