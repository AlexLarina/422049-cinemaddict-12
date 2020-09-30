export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVOURITES: `favorites`
};

export const CommentAction = {
  ADD: `add`,
  DELETE: `delete`
};

export const UpdateType = {
  PATCH: `PATCH`,
  FILTER: `FILTER`,
  INIT: `INIT`
};

export const PageMode = {
  FILM_LIST: `filmList`,
  STATS: `stats`
};

export const StatsFilterType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const ExtraBoardType = {
  RATED: `rated`,
  COMMENTED: `commented`
};

// @TO-DO посооображать по поводу месяца и года
export const PeriodsInSeconds = {
  DAY: 24 * 60 * 60,
  WEEK: 7 * 24 * 60 * 60,
  MONTH: 30 * 7 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60
};

export const MAX_CARDS_SHOWN_PER_STEP = 5;

export const RankTypes = {
  ZERO: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  BUFF: `Movie Buff`
};

export const RankTypesAmount = {
  ZERO: 0,
  NOVICE: {
    MIN: 1,
    MAX: 10
  },
  FAN: {
    MIN: 11,
    MAX: 20
  },
  BUFF: 21
};
