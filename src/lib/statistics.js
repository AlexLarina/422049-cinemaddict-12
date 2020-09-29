import moment from "moment";
import {capitalize, getMostFrequentElement, getElementsFrequency} from "./util.js";
import {PeriodsInSeconds} from "./const.js";

const createGenresArray = (films) => {
  const genresArray = [];
  films.forEach((film) => genresArray.push(...film.genres));
  return genresArray;
};

const createStatsItems = (films) => {
  const filmsCount = films.length;

  let totalTimeMinutes = films.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
  totalTimeMinutes = moment
    .utc()
    .startOf(`day`)
    .add({
      minutes: totalTimeMinutes
    });

  const genresArray = createGenresArray(films);
  const topGenre = (films.length === 0) ? `` : capitalize(getMostFrequentElement(genresArray));

  return {
    amount: filmsCount,
    duration: totalTimeMinutes,
    topGenre
  };
};

const sortgenresByFrequency = (films) => {
  const genresArray = createGenresArray(films);
  const genresDictionary = getElementsFrequency(genresArray);

  let genresSortedByFrequency = Object
    .entries(genresDictionary)
    .sort((a, b) => b[1] - a[1]);

  genresSortedByFrequency = Object.fromEntries(genresSortedByFrequency);
  return genresSortedByFrequency;
};

const getLastPeriod = (period) => Date.now() - period * 1000;

const PeriodsFromNow = {
  TODAY: getLastPeriod(PeriodsInSeconds.DAY),
  LAST_WEEK: getLastPeriod(PeriodsInSeconds.WEEK),
  LAST_MONTH: getLastPeriod(PeriodsInSeconds.MONTH),
  LAST_YEAR: getLastPeriod(PeriodsInSeconds.YEAR)
};

export {createStatsItems, sortgenresByFrequency, PeriodsFromNow};
