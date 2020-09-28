const sortByDate = (filmPrevious, filmNext) => {
  const aDate = new Date(filmPrevious.releaseDate);
  const bDate = new Date(filmNext.releaseDate);
  return bDate - aDate;
};

const sortByRating = (filmPrevious, filmNext) => {
  return filmNext.rating - filmPrevious.rating;
};

const sortByComments = (filmPrevious, filmNext) => {
  return filmNext.comments.length - filmPrevious.comments.length;
};

export {sortByDate, sortByRating, sortByComments};
