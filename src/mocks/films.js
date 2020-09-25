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
import {generateId} from "../lib/util.js";

const COMMENTS_POPUP_AMOUNT = 4;

const TEST_RELEASE_DATE = `2019-05-11T00:00:00.000Z`;
const TEST_WATCHING_DATE = `2019-04-12T16:12:32.554Z`;

const generateDate = (isWatched) => {
  if (!isWatched) {
    return null;
  }

  const maxDaysGap = 50;
  const daysGap = createRandomNumber(-maxDaysGap, 0);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateFilmMockData = () => {
  const originalFilm = getRandomArrayElement(Object.keys(TITLES));
  const isWatched = getRandomArrayElement([false, true]);

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
    isWatched,
    isFavourite: getRandomArrayElement([false, true]),
    watchingDate: generateDate(isWatched)
  };
};

const creatFilmDataArray = (size) => [...(new Array(size)).keys()].map(() => generateFilmMockData());

export default creatFilmDataArray;
