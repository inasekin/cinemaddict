import FilmView from '../view/film-view.js';
import {render, renderPosition, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';

export default class FilmPresenter {
  #siteListElement = null;
  #changeData = null;
  #filmCard = null;
  #film = null;
  #openDetails = null;

  constructor(siteListElement, changeData, openDetails) {
    this.#siteListElement = siteListElement;
    this.#changeData = changeData;
    this.#openDetails = openDetails;
  }

  getFilmCard = () => this.#filmCard.element

  init = (film) => {
    this.#film = film;
    const prevFilmCard = this.#filmCard;
    this.#filmCard = new FilmView(film);
    this.#setAllHandlers();

    if (prevFilmCard === null) {
      render(this.#siteListElement, this.#filmCard, renderPosition.BEFOREEND);
      this.#filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
        this.#openDetails(film);
      });
      return;
    }

    this.#filmCard.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#openDetails(film);
    });

    if (this.#siteListElement.contains(prevFilmCard.element)) {
      replace(this.#filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
  }

  #setAllHandlers = () => {
    this.#filmCard.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCard.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCard.setFavoriteClickHandler(this.#handleFavoriteClick);
  }

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, inWatchlist: !this.#film.inWatchlist},
    );
  }

  #handleWatchedClick = () => {
    if (this.#film.isWatched) {
      this.#film.watchingDate = null;
    } else {
      this.#film.watchingDate = new Date();
    }

    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, isWatched: !this.#film.isWatched},
    );
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, isFavorite: !this.#film.isFavorite},
    );
  }
}
