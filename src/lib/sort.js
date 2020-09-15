const sortByDate = () => {
  // @TO-DO реализовать вместе с moment
  console.log(`Функционал появится позже, не надо сюда тыкать`);
};

const sortByRating = (filmPrevious, filmNext) => {
  console.log(`sort by rating called`);
  return filmNext.rating - filmPrevious.rating;
};

export {sortByDate, sortByRating};
