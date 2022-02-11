import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../utils/const.js';
import {adaptToClient} from '../utils/util.js';

export default class CommentsModel extends AbstractObservable {
  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  loadComments = async (filmId) => {
    try {
      const comments = await this.#apiService.getComments(filmId);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.LOAD_COMMENTS);
  }

  get comments(){
    return this.#comments;
  }

  #adaptToClient = (comment) => {
    const adaptedComment = {...comment
    };

    return adaptedComment;
  }

  addComment = async (updateType, data) => {
    const film = data[0];
    const comment = data[1];

    try {
      const response = await this.#apiService.addComment(film.id, comment);
      const adaptedFilm = adaptToClient(response.movie);

      this._notify(updateType, adaptedFilm);

    } catch (err) {
      this._notify(UpdateType.ERROR_ADD_COMMENT);
    }
  }

  deleteComment = async (updateType, data) => {
    const commentId = data[0];
    const film = data[1];

    try {
      await this.#apiService.deleteComment(commentId);

      const index = this.#comments.findIndex((comment) => comment.id === commentId);

      film.comments = [
        ...film.comments.slice(0, index),
        ...film.comments.slice(index + 1)
      ];

      this._notify(updateType, film);

    } catch (err) {
      this._notify(UpdateType.ERROR_DELETE_COMMENT);
    }
  }
}
