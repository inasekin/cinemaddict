import AbstractView from './abstract-view.js';
import {transformArrayToString, transformMinutesToHours, transformStringToQuote} from '../utils/util.js';

const createFilmTemplate = (film) => {
  const {name, inWatchlist, isWatched, isFavorite, genres, description, comments, poster, rating, time, releaseDate} = film;
  const watchlistActive = inWatchlist ? ' film-card__controls-item--active' : '';
  const watchedActive = isWatched ? ' film-card__controls-item--active' : '';
  const favoriteActive = isFavorite ? ' film-card__controls-item--active' : '';
  const year = releaseDate.getFullYear();
  const genresList = transformArrayToString(genres);
  const runTime = transformMinutesToHours(time);
  const shortDescription = transformStringToQuote(description, 140);

  return `<article class="film-card">
		<a class="film-card__link">
			<h3 class="film-card__title">${name}</h3>
			<p class="film-card__rating">${rating}</p>
			<p class="film-card__info">
				<span class="film-card__year">${year}</span>
				<span class="film-card__duration">${runTime}</span>
				<span class="film-card__genre">${genresList}</span>
			</p>
			<img src="${poster}" alt="" class="film-card__poster">
			<p class="film-card__description">${shortDescription}</p>
			<span class="film-card__comments">${comments.length} comments</span>
		</a>
		<div class="film-card__controls">
			<button class="film-card__controls-item film-card__controls-item--add-to-watchlist${watchlistActive}" type="button">Add to watchlist</button>
			<button class="film-card__controls-item film-card__controls-item--mark-as-watched${watchedActive}" type="button">Mark as watched</button>
			<button class="film-card__controls-item film-card__controls-item--favorite${favoriteActive}" type="button">Mark as favorite</button>
		</div>
	</article>`;
};

export default class FilmView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._callback.watchlistClick);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._callback.watchedClick);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this._callback.favoriteClick);
  }

}
