import {Method} from './const.js';

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get films() {
    return this.#load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getComments = (filmId) => this.#load({url: `comments/${filmId}`})
    .then(ApiService.parseResponse);

  updateFilm = async (film) => {
    const response = await this.#load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  addComment = async (filmId, comment) => {
    const response = await this.#load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptCommentToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deleteComment = async (commentId) => {
    const response = await this.#load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (film) => {
    const adaptedFilm = {...film,
      'film_info': {
        title: film['name'],
        'alternative_title': film['alternativeName'],
        'age_rating': film['ageRating'],
        description: film['description'],
        director: film['director'],
        poster: film['poster'],
        'total_rating': film['rating'],
        actors: film['actors'],
        genre: film['genres'],
        runtime: film['time'],
        writers: film['writers'],
        release: {
          'release_country': film['country'],
          date: film['releaseDate'].toISOString(),
        },
      },
      'user_details': {
        'watching_date': film['watchingDate'] !== null ? film['watchingDate'].toISOString() : film['watchingDate'],
        'already_watched': film['isWatched'],
        favorite: film['isFavorite'],
        watchlist: film['inWatchlist'],
      }
    };

    delete adaptedFilm.watchingDate;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.name;
    delete adaptedFilm.alternativeName;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.inWatchlist;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.poster;
    delete adaptedFilm.rating;
    delete adaptedFilm.actors;
    delete adaptedFilm.genres;
    delete adaptedFilm.country;
    delete adaptedFilm.time;
    delete adaptedFilm.writers;

    return adaptedFilm;
  }

  #adaptCommentToServer = (comment) => {
    const adaptedComment = {...comment,
      comment: comment['text'],
      emotion: comment['emoji'],
    };

    delete adaptedComment.text;
    delete adaptedComment.emoji;

    return adaptedComment;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
