import {remove, render, replace} from "../lib/render.js";
import {FilterType, UpdateType, PageMode} from "../lib/const.js";
import {filtrate} from "../lib/filter.js";

import NavigationView from "../view/navigation.js";
import NavFiltersView from "../view/nav-filters.js";
import NavStatsView from "../view/nav-stats.js";

export default class Navigation {
  constructor(navContainer, filterModel, filmsModel, handleFilmListFiltrate, handleStatsShow) {
    this._navContainer = navContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._handleFilmListFiltrate = handleFilmListFiltrate;
    this._handleStatsShow = handleStatsShow;

    this._navComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pageMode = PageMode.FILM_LIST;
  }

  init() {
    const filters = this._getFilters();
    const previousNavComponent = this._navComponent;

    this._navComponent = this._createNavComponent(filters);

    if (previousNavComponent === null) {
      render(this._navContainer, this._navComponent);
      return;
    }

    replace(this._navComponent, previousNavComponent);
    remove(previousNavComponent);
  }

  _createNavComponent(filters) {
    const navComponent = new NavigationView();

    const navFiltersComponent = new NavFiltersView(filters);
    const navStatsComponent = new NavStatsView();

    navFiltersComponent.setFilterClickHandler(this._handleFilterClick);
    navStatsComponent.setStatsClickHandler(this._handleStatsClick);

    render(navComponent.getElement(), navFiltersComponent);
    render(navComponent.getElement(), navStatsComponent);

    return navComponent;
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterClick(filterType) {
    this._filterModel.setFilter(UpdateType.FILTER, filterType);
    if (this._pageMode === PageMode.STATS) {
      this._handleFilmListFiltrate();
    }

    this._pageMode = PageMode.FILM_LIST;
  }

  _handleStatsClick() {
    this._pageMode = PageMode.STATS;
    this._handleStatsShow();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    const activeFilter = this._filterModel.getFilter();

    return [
      {
        name: FilterType.ALL,
        isSelected: (activeFilter === FilterType.ALL) ? true : false,
        description: `All movies`,
        amount: filtrate[FilterType.ALL](films).length
      },
      {
        name: FilterType.WATCHLIST,
        isSelected: (activeFilter === FilterType.WATCHLIST) ? true : false,
        description: `Watchlist`,
        amount: filtrate[FilterType.WATCHLIST](films).length
      },
      {
        name: FilterType.HISTORY,
        isSelected: (activeFilter === FilterType.HISTORY) ? true : false,
        description: `History`,
        amount: filtrate[FilterType.HISTORY](films).length
      },
      {
        name: FilterType.FAVOURITES,
        isSelected: (activeFilter === FilterType.FAVOURITES) ? true : false,
        description: `Favorites`,
        amount: filtrate[FilterType.FAVOURITES](films).length
      }
    ];
  }
}
