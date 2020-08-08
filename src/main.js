import createUserProfileTemplate from "./view/profile.js";
import createNavigationTemplate from "./view/navigation.js";
import createFiltersTemplate from "./view/filters.js";
import createFilmSectionTemplate from "./view/film-board.js";
import createStatsTemplate from "./view/stats.js";

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const renderTemplate = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

renderTemplate(mainHeaderElement, createUserProfileTemplate());

renderTemplate(mainElement, createNavigationTemplate());
renderTemplate(mainElement, createFiltersTemplate());
renderTemplate(mainElement, createFilmSectionTemplate());

renderTemplate(mainFooterElement, createStatsTemplate());
