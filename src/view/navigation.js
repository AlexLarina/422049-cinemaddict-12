import AbstractView from "./abstract.js";

const createNavigationTemplate = (navigation) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${navigation.map((item) => (
      `<a href="#${item.name}" class="main-navigation__item ${item.isSelected ? `main-navigation__item--active` : ``}">
        ${item.description}
        ${item.name === `all` ? `` :
        `<span class="main-navigation__item-count">
          ${item.amount}
        </span>`}
      </a>`
    ))
    .join(``)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor(navigation) {
    super();
    this._navigation = navigation;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
  }
}

