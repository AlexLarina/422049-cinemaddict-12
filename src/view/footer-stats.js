import Abstract from "./abstract.js";

const createStatsTemplate = (amount) => {
  return (
    `<section class="footer__statistics">
      <p>${amount} movies inside</p>
    </section>`
  );
};

export default class Statistics extends Abstract {
  constructor(amount) {
    super();

    this._amount = amount;
  }
  getTemplate() {
    return createStatsTemplate(this._amount);
  }
}

