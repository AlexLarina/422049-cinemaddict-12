import Abstract from "../view/abstract";

const renderTemplate = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

// const renderElement = (container, element) => {
//   container.append(element);
// };

// const renderComponent = (container, component) => {
//   container.append(component.getElement());
// };

const render = (container, element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  container.append(element);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {renderTemplate, createElement, render};
