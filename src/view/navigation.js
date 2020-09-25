import Abstract from "./abstract.js";

const createNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">

    </nav>`
  );
};

export default class Navigation extends Abstract {
  getTemplate() {
    return createNavigationTemplate();
  }
}

