import Abstract from "./abstract.js";

const createNoFilmTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">
          There are no movies in our database
        </h2>
      </section>
    </section>`
  );
};

export default class EmptyBoard extends Abstract {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
