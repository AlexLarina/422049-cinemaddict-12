import Abstract from "../view/abstract";

const renderTemplate = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

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

const removeChild = (parent) => {
  if (parent.firstChild) {
    parent.firstChild.remove();
  }
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove(); // removing from DOM
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  if (newComponent instanceof Abstract) {
    newComponent = newComponent.getElement();
  }

  if (oldComponent instanceof Abstract) {
    oldComponent = oldComponent.getElement();
  }

  const parentComponent = oldComponent.parentElement;

  if (
    parentComponent === null ||
    oldComponent === null ||
    newComponent === null
  ) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parentComponent.replaceChild(newComponent, oldComponent);
};

export {renderTemplate, createElement, removeChild, render, remove, replace};
