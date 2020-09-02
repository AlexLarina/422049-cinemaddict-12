import {
  renderElement,
  renderComponent
} from "./lib/util.js";

import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import FiltersView from "./view/filters.js";
import StatsView from "./view/stats.js";

import FilmView from "./view/film.js";
import FilmBoardView from "./view/film-board.js";

import FilmPopupView from "./view/film-popup.js";

import creatFilmDataArray from "./mocks/films.js";
import createNavigation from "./mocks/navigation.js";

const FILM_CARDS_AMOUNT = 8;
const MAX_CARDS_SHOWN_PER_STEP = 5;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const navigation = createNavigation();
const filmData = creatFilmDataArray(FILM_CARDS_AMOUNT);


let renderedFilmCount = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ? 0 : MAX_CARDS_SHOWN_PER_STEP;

const hideShowMoreButton = (button) => {
  button.setAttribute(`style`, `display: none;`);
};

const renderFilms = (filmsData) => {
  const fragment = new DocumentFragment();

  filmsData.forEach(function (filmDataItem) {
    const filmComponent = new FilmView(filmDataItem);
    const filmPopupComponent = new FilmPopupView(filmDataItem);

    filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      mainElement.removeChild(filmPopupComponent.getElement());
    });

    filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
      renderComponent(mainElement, filmPopupComponent);
    });

    filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
      renderComponent(mainElement, filmPopupComponent);
    });

    filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
      renderComponent(mainElement, filmPopupComponent);
    });

    fragment.appendChild(filmComponent.getElement());
  });

  return fragment;
};

renderComponent(mainHeaderElement, new ProfileView());
renderComponent(mainElement, new NavigationView(navigation));
renderComponent(mainElement, new FiltersView());
renderComponent(mainFooterElement, new StatsView());

let filmDataChunk = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ?
  filmData.slice(0, FILM_CARDS_AMOUNT) :
  filmData.slice(0, MAX_CARDS_SHOWN_PER_STEP);

const filmBoardComponent = new FilmBoardView(filmDataChunk);

renderComponent(mainElement, filmBoardComponent);
renderElement(
    filmBoardComponent.getContainer(),
    renderFilms(filmDataChunk)
);

const showMoreButtonElement = filmBoardComponent.getShowMoreButton();

if (!renderedFilmCount) {
  hideShowMoreButton(showMoreButtonElement);
}

showMoreButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  filmDataChunk = filmData.slice(renderedFilmCount, renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP);
  renderedFilmCount += MAX_CARDS_SHOWN_PER_STEP;

  renderElement(
      filmBoardComponent.getContainer(),
      renderFilms(filmDataChunk)
  );

  if (renderedFilmCount > filmData.length) {
    hideShowMoreButton(showMoreButtonElement);
  }
});
