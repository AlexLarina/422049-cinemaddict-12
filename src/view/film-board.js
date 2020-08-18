import createFilmCardTemplate from "./film";
import createExtraFilmListTemplate from "./film-board-special";

const EXTRA_FILM_CARDS_AMOUNT = 2;

const createFilmSectionTemplate = (films) => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
          ${films.map((film) => createFilmCardTemplate(film))
            .join(``)}
        </div>
        <button class="films-list__show-more">Show more</button>
      </section>
      ${createExtraFilmListTemplate(`Top rated`, films.slice(0, EXTRA_FILM_CARDS_AMOUNT))}
      ${createExtraFilmListTemplate(`Most commented`, films.slice(0, EXTRA_FILM_CARDS_AMOUNT))}
    `
  );
};

export default createFilmSectionTemplate;
