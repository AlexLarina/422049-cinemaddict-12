import {UpdateType, FilterType} from "./lib/const.js";
import {render, remove} from "./lib/render.js";

import ProfileView from "./view/profile.js";
import SortView from "./view/sort.js";
import FooterStatsView from "./view/footer-stats.js";

import FilmListPresenter from "./presenter/film-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import StatsPresenter from "./presenter/stats.js";

import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";

import creatFilmDataArray from "./mocks/films.js";

const FILM_CARDS_AMOUNT = 8;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const filmData = creatFilmDataArray(FILM_CARDS_AMOUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmData);

const filterModel = new FilterModel();

const sortComponent = new SortView();

render(mainHeaderElement, new ProfileView());
render(mainFooterElement, new FooterStatsView());

const filmListPresenter = new FilmListPresenter(mainElement, sortComponent, filmsModel, filterModel);
const statsPresenter = new StatsPresenter(mainElement, filmsModel.getFilms());

const statsShowHandler = () => {
  filmListPresenter.destroy();
  statsPresenter.init();
};

const filmListInitHandler = () => {
  statsPresenter.destroy();

  //filterModel.setFilter(UpdateType.FILTER, FilterType.ALL);
  filmListPresenter.init();
};

const navPresenter = new NavigationPresenter(mainElement, filterModel, filmsModel, filmListInitHandler, statsShowHandler);

navPresenter.init();
render(mainElement, sortComponent);
filmListPresenter.init();

