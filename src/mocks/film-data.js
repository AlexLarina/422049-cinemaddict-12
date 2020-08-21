import {getRandomArrayItems, createRandomNumber} from "../lib/random.js";

const DESCRIPTION_TEMPLATE = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.
`;

const RELEASE_YEARS = {
  START: 1992,
  END: 2019
};

const DURATION = {
  MIN: 60,
  MAX: 180
};

const DESCRIPTION_SENTENCE_AMOUNT = {
  MIN: 1,
  MAX: 5
};

const POSTER_TITLES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

// const TITLES = [
//   `Доказательство смерти`,
//   `Однажды… в Голливуде`,
//   `Омерзительная восьмерка`,
//   `Джанго освобожденный`,
//   `Джеки Браун`,
//   `Убить Билла`,
//   `Бесславные ублюдки`,
//   `Криминальное чтиво`,
//   `Бешеные псы`
// ];

const TITLES = {
  'Reservoir Dogs': `Бешеные псы`,
  'Pulp Fiction': `Криминальное чтиво`,
  'Jackie Brown': `Джеки Браун`,
  'Kill Bill': `Убить Билла`,
  'Death Proof': `Доказательство смерти`,
  'Inglourious Basterds': `Бесславные ублюдки`,
  'Django Unchained': `Джанго освобожденный`,
  'The Hateful Eight': `Омерзительная восьмерка`,
  'Once Upon a Time in Hollywood': `Однажды… в Голливуде`
};

const GENRE = [
  `comedy`,
  `drama`,
  `thriller`,
  `military`,
  `adventures`
];

const MONTHS = {
  january: 31,
  february: 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  septemper: 30,
  october: 31,
  november: 30,
  december: 31
};

const WRITERS = [
  `Quentin Tarantino`,
  `Roger Avary`,
  `Uma Thurman`
];

const ACTORS = [
  `Leonardo DiCaprio`,
  `Brad Pitt`,
  `Margot Robbie`,
  `Uma Thurman`,
  `Harvey Keitel`,
  `Christoph Waltz`,
  `Diane Kruger`
];

const createDuration = (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

const createDescription = (template) => getRandomArrayItems(
    template.split(`.`), createRandomNumber(DESCRIPTION_SENTENCE_AMOUNT.MIN, DESCRIPTION_SENTENCE_AMOUNT.MAX)
).join(``);

export {
  createDuration,
  createDescription,
  DESCRIPTION_TEMPLATE,
  RELEASE_YEARS,
  DURATION,
  POSTER_TITLES,
  TITLES,
  GENRE,
  MONTHS,
  WRITERS,
  ACTORS
};
