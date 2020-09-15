import {render} from "./lib/render.js";


import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import FiltersView from "./view/filters.js";
import EmptyView from "./view/empty.js";
import StatsView from "./view/stats.js";

import FilmListPresenter from "./presenter/film-list.js";

import creatFilmDataArray from "./mocks/films.js";
import createNavigation from "./mocks/navigation.js";

const FILM_CARDS_AMOUNT = 8;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const navigation = createNavigation();
const filmData = creatFilmDataArray(FILM_CARDS_AMOUNT);

const filterComponent = new FiltersView();

render(mainHeaderElement, new ProfileView());
render(mainElement, new NavigationView(navigation));
render(mainElement, filterComponent);

if (FILM_CARDS_AMOUNT !== 0) {
  const filmListPresenter = new FilmListPresenter(mainElement, filterComponent);
  filmListPresenter.init(filmData);
} else {
  render(mainElement, new EmptyView());
}

render(mainFooterElement, new StatsView());
