import FilmsModel from "../model/films.js";

const HTTPSuccessStatusRange = {
  MIN: 200,
  MAX: 299
};

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

export default class Api {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getFilmComments(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then(Api.toJSON);
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `/comments/${comment.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {

    headers.append(`Authorization`, this._auth);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < HTTPSuccessStatusRange.MIN &&
      response.status > HTTPSuccessStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(error) {
    throw error;
  }
}
