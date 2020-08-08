import createFilmCardTemplate from "./film";

const createExtraFilmListTemplate = (heading, cardAamount) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>

      <div class="films-list__container">
        ${[...new Array(cardAamount)]
          .map(() => createFilmCardTemplate())
          .join(``)}
      <div>
    </section>`
  );
};

export default createExtraFilmListTemplate;
