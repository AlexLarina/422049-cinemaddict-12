import {
  getRandomArrayElement,
  createRandomNumber
} from "../lib/random.js";

import {capitalize} from "../lib/util.js";

const NAVIGATION = [`all`, `watchlist`, `history`, `favorites`];


const addMoviesAnding = (name) => name === `all` ? name + ` movies` : name;

const createDescription = (name) => {
  name = addMoviesAnding(name);
  name = capitalize(name);
  return name;
};

const createNavigation = () => {
  const navigation = NAVIGATION.map((name) => ({
    name,
    isSelected: false,
    description: createDescription(name),
    amount: createRandomNumber()
  }));

  getRandomArrayElement(navigation).isSelected = true;

  return navigation;
};

export default createNavigation;
