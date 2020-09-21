const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export {capitalize, generateId};
