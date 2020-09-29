import {StatsFilterType, UpdateType} from "./lib/const.js";
import {render} from "./lib/render.js";

import ProfileView from "./view/profile.js";
import SortView from "./view/sort.js";
import FooterStatsView from "./view/footer-stats.js";

import FilmListPresenter from "./presenter/film-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import StatsPresenter from "./presenter/stats.js";

import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";

import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTH = `Basic eo0w590ik29889b`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const api = new Api(END_POINT, AUTH);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const sortComponent = new SortView();

render(mainHeaderElement, new ProfileView());
render(mainFooterElement, new FooterStatsView());

const filmListPresenter = new FilmListPresenter(mainElement, sortComponent, filmsModel, filterModel, apiWithProvider);
const statsPresenter = new StatsPresenter(mainElement, filmsModel);

const statsShowHandler = () => {
  filmListPresenter.destroy();
  statsPresenter.init(StatsFilterType.ALL);
};

const filmListInitHandler = () => {
  statsPresenter.destroy();
  filmListPresenter.init();
};

const navPresenter = new NavigationPresenter(mainElement, filterModel, filmsModel, filmListInitHandler, statsShowHandler);

navPresenter.init();
filmListPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    render(mainElement, sortComponent);
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    render(mainElement, sortComponent);
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
