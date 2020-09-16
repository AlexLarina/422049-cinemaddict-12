const sortByDate = () => {
  // @TO-DO реализовать вместе с moment
  return 1;
};

const sortByRating = (filmPrevious, filmNext) => {
  return filmNext.rating - filmPrevious.rating;
};

export {sortByDate, sortByRating};
