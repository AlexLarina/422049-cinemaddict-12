const sortByDate = () => {
  // @TO-DO реализовать вместе с moment
  return 1;
};

const sortByRating = (filmPrevious, filmNext) => {
  return filmNext.rating - filmPrevious.rating;
};

const sortByComments = (filmPrevious, filmNext) => {
  return filmNext.comments.length - filmPrevious.comments.length;
};

export {sortByDate, sortByRating, sortByComments};
