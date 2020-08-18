import {
  createRandomNumber,
  getRandomArrayElement,
  getRandomArrayItems
} from '../random.js';

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

const TITLES = [
  `Доказательство смерти`,
  `Однажды… в Голливуде`,
  `Омерзительная восьмерка`,
  `Джанго освобожденный`,
  `Джеки Браун`,
  `Убить Билла`,
  `Бесславные ублюдки`,
  `Криминальное чтиво`,
  `Бешеные псы`
];

const GENRE = [
  `comedy`,
  `drama`,
  `thriller`,
  `military`,
  `adventures`
];

const createDuration = (minutes) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

const createDescription = (template) => getRandomArrayItems(
    template.split(`.`), createRandomNumber(DESCRIPTION_SENTENCE_AMOUNT.MIN, DESCRIPTION_SENTENCE_AMOUNT.MAX)
).join(``);

const createFilmData = () => ({
  title: getRandomArrayElement(TITLES),
  poster: getRandomArrayElement(POSTER_TITLES),
  description: createDescription(DESCRIPTION_TEMPLATE),
  comments: [],
  rating: createRandomNumber(),
  year: createRandomNumber(RELEASE_YEARS.START, RELEASE_YEARS.END),
  duration: createDuration(createRandomNumber(
      DURATION.MIN,
      DURATION.MAX
  )),
  genre: getRandomArrayElement(GENRE)
});

const creatFilmDataArray = (size) => [...(new Array(size)).keys()].map(() => createFilmData());

export default creatFilmDataArray;
