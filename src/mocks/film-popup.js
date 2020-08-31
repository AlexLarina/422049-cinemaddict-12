import {
  createRandomNumber,
  getRandomArrayElement,
  getRandomArrayItems
} from "../lib/random.js";

import {
  createDuration,
  createDescription,
  DESCRIPTION_TEMPLATE,
  RELEASE_YEARS,
  DURATION,
  POSTER_TITLES,
  TITLES,
  GENRE,
  MONTHS,
  WRITERS,
  ACTORS
} from "./film-data.js";

import {capitalize} from '../lib/util.js';

const createReleaseDate = () => {
  const randomMonth = getRandomArrayElement(Object.keys(MONTHS));
  return (`
    ${createRandomNumber(1, MONTHS[randomMonth])}
    ${capitalize(randomMonth)}
    ${createRandomNumber(RELEASE_YEARS.START, RELEASE_YEARS.END)}
  `);
};

const createFilmPopupData = () => {
  const originalFilm = getRandomArrayElement(Object.keys(TITLES));
  return {
    poster: getRandomArrayElement(POSTER_TITLES),
    title: TITLES[originalFilm],
    originalTitle: originalFilm,
    rating: createRandomNumber(1, 99) / 10,
    director: `Quentin Tarantino`,
    writers: getRandomArrayItems(WRITERS, createRandomNumber(1, WRITERS.length)),
    actors: getRandomArrayItems(ACTORS, createRandomNumber(1, ACTORS.length)),
    releaseDate: createReleaseDate(),
    duration: createDuration(createRandomNumber(
        DURATION.MIN,
        DURATION.MAX
    )),
    country: `USA`,
    genres: getRandomArrayItems(GENRE, createRandomNumber(1, GENRE.length)),
    description: createDescription(DESCRIPTION_TEMPLATE),
    ageRating: `18`,
    comments: [],
    year: createRandomNumber(RELEASE_YEARS.START, RELEASE_YEARS.END)
  };
};


// const createFilmData = () => ({
//   title: TITLES[getRandomArrayElement(Object.keys(TITLES))],
//   poster: getRandomArrayElement(POSTER_TITLES),
//   description: createDescription(DESCRIPTION_TEMPLATE),
//   comments: [],
//   rating: createRandomNumber(),
//   year: createRandomNumber(RELEASE_YEARS.START, RELEASE_YEARS.END),
//   duration: createDuration(createRandomNumber(
//       DURATION.MIN,
//       DURATION.MAX
//   )),
//   genre: getRandomArrayElement(GENRE)
// });

export default createFilmPopupData;
