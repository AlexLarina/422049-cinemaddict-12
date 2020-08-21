import createUserProfileTemplate from "./view/profile.js";
import createNavigationTemplate from "./view/navigation.js";
import createFiltersTemplate from "./view/filters.js";
import createFilmSectionTemplate from "./view/film-board.js";
import createStatsTemplate from "./view/stats.js";
import createFilmPopupTemplate from "./view/film-popup.js";

import creatFilmDataArray from "./mocks/films.js";
import createNavigation from "./mocks/navigation.js";
import createFilmPopupData from "./mocks/film-popup.js";

const FILM_CARDS_AMOUNT = 5;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const renderTemplate = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

renderTemplate(mainHeaderElement, createUserProfileTemplate());

const navigation = createNavigation();
renderTemplate(mainElement, createNavigationTemplate(navigation));

renderTemplate(mainElement, createFiltersTemplate());

const filmData = creatFilmDataArray(FILM_CARDS_AMOUNT);
renderTemplate(mainElement, createFilmSectionTemplate(filmData));

const filmPopupData = createFilmPopupData();
renderTemplate(mainElement, createFilmPopupTemplate(filmPopupData));

renderTemplate(mainFooterElement, createStatsTemplate());
