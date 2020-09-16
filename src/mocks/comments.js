import {
  AUTHORS,
  EMOJI,
  MESSAGE
} from "./comment-data.js";

import {getRandomArrayElement} from "../lib/random.js";

const TEST_COMMENT_DATE = `2019-05-11T16:12:32.554Z`;

const createComment = () => ({
  emoji: getRandomArrayElement(EMOJI),
  date: TEST_COMMENT_DATE,
  author: getRandomArrayElement(AUTHORS),
  message: getRandomArrayElement(MESSAGE)
});

const createCommentsDataArray = (size) => [...(new Array(size)).keys()].map(() => createComment());

export default createCommentsDataArray;
