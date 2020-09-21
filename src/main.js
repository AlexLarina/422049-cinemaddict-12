import {render} from "./lib/render.js";

import ProfileView from "./view/profile.js";
import SortView from "./view/sort.js";
import StatsView from "./view/stats.js";

import FilmListPresenter from "./presenter/film-list.js";
import FilterPresenter from "./presenter/filter.js";

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
render(mainFooterElement, new StatsView());

const filmListPresenter = new FilmListPresenter(mainElement, sortComponent, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

filterPresenter.init();
render(mainElement, sortComponent);
filmListPresenter.init();

