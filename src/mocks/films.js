import {
  createRandomNumber,
  getRandomArrayElement
} from '../lib/random.js';

import {
  createDuration,
  createDescription,
  DESCRIPTION_TEMPLATE,
  RELEASE_YEARS,
  DURATION,
  POSTER_TITLES,
  TITLES,
  GENRE
} from "./film-data.js";

const createFilmData = () => ({
  title: TITLES[getRandomArrayElement(Object.keys(TITLES))],
  poster: getRandomArrayElement(POSTER_TITLES),
  description: createDescription(DESCRIPTION_TEMPLATE),
  comments: [],
  rating: createRandomNumber(),
  year: createRandomNumber(RELEASE_YEARS.START, RELEASE_YEARS.END),
  duration: createDuration(createRandomNumber(
      DURATION.MIN,
      DURATION.MAX
  )),
  genre: getRandomArrayElement(GENRE)
});

const creatFilmDataArray = (size) => [...(new Array(size)).keys()].map(() => createFilmData());

export default creatFilmDataArray;
