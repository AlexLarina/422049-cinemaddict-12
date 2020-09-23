import AbstractView from "./abstract.js";

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">

    </nav>`
  );
};

export default class Navigation extends AbstractView {
  getTemplate() {
    return createNavigationTemplate();
  }
}

