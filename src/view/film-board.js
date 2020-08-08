import createFilmCardTemplate from "./film";
import createExtraFilmListTemplate from "./film-board-special";

const FILM_CARDS_AMOUNT = 5;
const EXTRA_FILM_CARDS_AMOUNT = 2;

const createFilmSectionTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
          ${[...new Array(FILM_CARDS_AMOUNT)]
            .map(() => createFilmCardTemplate())
            .join(``)}
        </div>
        <button class="films-list__show-more">Show more</button>
      </section>
      ${createExtraFilmListTemplate(`Top rated`, EXTRA_FILM_CARDS_AMOUNT)}
      ${createExtraFilmListTemplate(`Most commented`, EXTRA_FILM_CARDS_AMOUNT)}
    `
  );
};

export default createFilmSectionTemplate;
