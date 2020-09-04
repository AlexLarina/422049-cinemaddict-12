import AbstractView from "./abstract.js";

const createStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

export default class Statistics extends AbstractView {
  getTemplate() {
    return createStatsTemplate();
  }
}

