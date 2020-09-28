import Observer from "../lib/observer.js";

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const updateIndex = this._films.findIndex((item) => item.id === update.id);

    if (updateIndex === -1) {
      throw new Error(`Can't update unexisting film.`);
    }

    this._films = [
      ...this._films.slice(0, updateIndex),
      update,
      ...this._films.slice(updateIndex + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedToClientFilm = Object.assign(
        {},
        film,
        {
          poster: film.film_info.poster,
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          ageRating: film.film_info.age_rating,
          country: film.film_info.release.release_country,
          releaseDate: film.film_info.release.date,
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          description: film.film_info.description,
          toWatchList: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavourite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date
        }
    );

    delete adaptedToClientFilm.film_info;
    delete adaptedToClientFilm.user_details;

    return adaptedToClientFilm;
  }

  static adaptToServer(film) {
    const adaptedToServerFilm = Object.assign(
        {},
        film,
        {
          "film_info": {
            "poster": film.poster,
            "title": film.title,
            "alternative_title": film.originalTitle,
            "total_rating": film.rating,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "age_rating": film.ageRating,
            "release": {
              "release_country": film.country,
              "date": film.releaseDate
            },
            "runtime": film.duration,
            "genre": film.genres,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.toWatchList,
            "already_watched": film.isWatched,
            "favorite": film.isFavourite,
            "watching_date": film.watchingDate
          }
        }
    );

    // @TO-DO удалить ненужные ключи

    return adaptedToServerFilm;
  }
}
