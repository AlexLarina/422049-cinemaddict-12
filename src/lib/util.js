const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getElementsFrequency = (array) => {
  const dictionary = {};

  array.forEach((element) => {
    if (!dictionary[element]) {
      dictionary[element] = 0;
    }
    dictionary[element]++;
  });

  return dictionary;
};

const getMostFrequentElement = (array) => {
  const dict = getElementsFrequency(array);

  const maxValue = Math.max(...Object.values(dict));
  return Object.keys(dict).find((key) => dict[key] === maxValue);
};

export {capitalize, generateId, getMostFrequentElement, getElementsFrequency};
