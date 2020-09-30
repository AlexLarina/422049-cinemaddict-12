import {RankTypesAmount, RankTypes} from "./const.js";

const chooseUserRank = (watchedAmount) => {
  let rank = ``;
  switch (true) {
    case (watchedAmount === RankTypesAmount.ZERO):
      rank = RankTypes.ZERO;
      break;
    case (watchedAmount >= RankTypesAmount.NOVICE.MIN && watchedAmount <= RankTypesAmount.NOVICE.MAX):
      rank = RankTypes.NOVICE;
      break;
    case (watchedAmount >= RankTypesAmount.FAN.MIN && watchedAmount <= RankTypesAmount.FAN.MAX):
      rank = RankTypes.FAN;
      break;
    case (watchedAmount >= RankTypesAmount.BUFF):
      rank = RankTypes.BUFF;
      break;
  }

  return rank;
};

const appointUserRank = (films) => {
  const watchedFilmsAmount = films.filter((film) => film.isWatched).length;
  return chooseUserRank(watchedFilmsAmount);
};

export {appointUserRank};
