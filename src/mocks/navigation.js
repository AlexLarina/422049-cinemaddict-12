import {getRandomArrayElement, createRandomNumber} from "../random.js";

const NAVIGATION = [`all`, `watchlist`, `history`, `favorites`];

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
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
