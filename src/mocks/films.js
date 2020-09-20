import {
  createRandomNumber,
  getRandomArrayElement,
  getRandomArrayItems
} from "../lib/random.js";

import {
  createDescription,
  DESCRIPTION_TEMPLATE,
  DURATION,
  POSTER_TITLES,
  TITLES,
  GENRE,
  WRITERS,
  ACTORS
} from "./film-data.js";

import createCommentsDataArray from "./comments.js";

const COMMENTS_POPUP_AMOUNT = 4;

const TEST_RELEASE_DATE = `2019-05-11T00:00:00.000Z`;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateFilmMockData = () => {
  const originalFilm = getRandomArrayElement(Object.keys(TITLES));
  return {
    id: generateId(),
    poster: getRandomArrayElement(POSTER_TITLES),
    title: TITLES[originalFilm],
    originalTitle: originalFilm,
    rating: createRandomNumber(1, 99) / 10,
    director: `Quentin Tarantino`,
    writers: getRandomArrayItems(WRITERS, createRandomNumber(1, WRITERS.length)),
    actors: getRandomArrayItems(ACTORS, createRandomNumber(1, ACTORS.length)),
    releaseDate: TEST_RELEASE_DATE,
    duration: createRandomNumber(
        DURATION.MIN,
        DURATION.MAX
    ),
    country: `USA`,
    genres: getRandomArrayItems(GENRE, createRandomNumber(1, GENRE.length)),
    description: createDescription(DESCRIPTION_TEMPLATE),
    ageRating: `18`,
    comments: createCommentsDataArray(COMMENTS_POPUP_AMOUNT),
    toWatchList: getRandomArrayElement([false, true]),
    isWatched: getRandomArrayElement([false, true]),
    isFavourite: getRandomArrayElement([false, true]),
  };
};

const creatFilmDataArray = (size) => [...(new Array(size)).keys()].map(() => generateFilmMockData());

export default creatFilmDataArray;
