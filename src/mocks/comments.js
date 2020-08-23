import {
  AUTHORS,
  EMOJI,
  MESSAGE,
  DATE
} from "./comment-data.js";

import {getRandomArrayElement} from "../lib/random.js";

const createComment = () => ({
  emoji: getRandomArrayElement(EMOJI),
  date: getRandomArrayElement(DATE),
  author: getRandomArrayElement(AUTHORS),
  message: getRandomArrayElement(MESSAGE)
});

const createCommentsDataArray = (size) => [...(new Array(size)).keys()].map(() => createComment());

export default createCommentsDataArray;
