import {FilterType} from "./const.js";

export const filtrate = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.toWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVOURITES]: (films) => films.filter((film) => film.isFavourite)
};
