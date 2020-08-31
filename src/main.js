import {
  renderTemplate,
  renderElement
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
import createFilmPopupData from "./mocks/film-popup.js";
import createCommentsDataArray from "./mocks/comments.js";

const FILM_CARDS_AMOUNT = 8;
const MAX_CARDS_SHOWN_PER_STEP = 5;
const COMMENTS_POPUP_AMOUNT = 4;

const mainHeaderElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const mainFooterElement = document.querySelector(`.footer`);

const navigation = createNavigation();
const filmData = creatFilmDataArray(FILM_CARDS_AMOUNT);
const filmPopupData = createFilmPopupData();
const commentsPopupData = createCommentsDataArray(COMMENTS_POPUP_AMOUNT);

let renderedFilmCount = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ? null : MAX_CARDS_SHOWN_PER_STEP;

const hideShowMoreButton = (button) => {
  button.setAttribute(`style`, `display: none;`);
};

renderElement(mainHeaderElement, new ProfileView().getElement());
renderElement(mainElement, new NavigationView(navigation).getElement());
renderElement(mainElement, new FiltersView().getElement());
renderElement(mainFooterElement, new StatsView().getElement());

let filmDataChunk = (FILM_CARDS_AMOUNT < MAX_CARDS_SHOWN_PER_STEP) ?
  filmData.slice(0, FILM_CARDS_AMOUNT) :
  filmData.slice(0, MAX_CARDS_SHOWN_PER_STEP);

const filmBoardComponent = new FilmBoardView(filmDataChunk);
renderElement(mainElement, filmBoardComponent.getElement());

const showMoreButtonElement = filmBoardComponent.getShowMoreButton();

if (!renderedFilmCount) {
  hideShowMoreButton(showMoreButtonElement);
}

showMoreButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  filmDataChunk = filmData.slice(renderedFilmCount, renderedFilmCount + MAX_CARDS_SHOWN_PER_STEP);
  renderedFilmCount += MAX_CARDS_SHOWN_PER_STEP;
  const fragment = new DocumentFragment(); // const ? let

  filmDataChunk.forEach(function (filmDataItem) {
    fragment.appendChild(
        new FilmView(filmDataItem).getElement()
    );
  });

  renderElement(
      filmBoardComponent.getContainer(),
      fragment
  );

  if (renderedFilmCount > filmData.length) {
    hideShowMoreButton(showMoreButtonElement);
  }
});

renderElement(mainElement, new FilmPopupView(filmPopupData, commentsPopupData).getElement());

//renderTemplate(mainElement, createFilmPopupTemplate(filmPopupData, commentsPopupData));
