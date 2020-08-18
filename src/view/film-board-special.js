import createFilmCardTemplate from "./film";

const createExtraFilmListTemplate = (heading, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>

      <div class="films-list__container">
        ${films.map((film) => createFilmCardTemplate(film))
          .join(``)}
      <div>
    </section>`
  );
};

export default createExtraFilmListTemplate;
