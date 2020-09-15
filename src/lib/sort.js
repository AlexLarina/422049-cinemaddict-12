const sortByDate = () => {
  // @TO-DO реализовать вместе с moment
};

const sortByRating = (filmPrevious, filmNext) => {
  return filmNext.rating - filmPrevious.rating;
};

export {sortByDate, sortByRating};
