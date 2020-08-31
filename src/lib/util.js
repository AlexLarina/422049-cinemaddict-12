const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const renderTemplate = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const renderElement = (container, element) => {
  container.append(element);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {capitalize, renderTemplate, createElement, renderElement};
