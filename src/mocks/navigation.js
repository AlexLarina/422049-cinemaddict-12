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
    amount: 0
  }));

  navigation[0].isSelected = true;

  return navigation;
};

export default createNavigation;
