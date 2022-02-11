import he from 'he';
import dayjs from 'dayjs';
import SmartView from './smart-view.js';
import {isClickOnInput} from '../utils/const.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import {transformArrayToString, transformMinutesToHours} from '../utils/util.js';
dayjs.extend(relativeTime);

const SHAKE_ANIMATION_TIMEOUT = 600;
const createCommentTemplate = (comments, isDisabled, deletingCommentId) => comments.map((comment) => (`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${dayjs(comment.date).fromNow()}</span>
          <button class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>${deletingCommentId === comment.id ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`)).join('');

const createDetailsTemplate = (film, comments) => {
  const {name, alternativeName, inWatchlist, isWatched, isFavorite, actors, writers, genres, description, poster, rating, time, releaseDate, isEmotion, emoji, textComment, director, ageRating, country, isDisabled, deletingCommentId} = film;
  const watchlistActive = inWatchlist ? ' film-details__control-button--active' : '';
  const watchedActive = isWatched ? ' film-details__control-button--active' : '';
  const favoriteActive = isFavorite ? ' film-details__control-button--active' : '';
  const watchlistText = inWatchlist ? 'Already in watchlist' : 'Add to watchlist';
  const watchedText = isWatched ? 'Already watched' : 'Add to watched';
  const favoriteText = isFavorite ? 'Already favorite' : 'Add to favorites';
  const commentsTemplate = createCommentTemplate(comments, isDisabled, deletingCommentId);
  const date = dayjs(releaseDate).format('D MMMM YYYY');
  const actorsList = transformArrayToString(actors);
  const writersList = transformArrayToString(writers);
  const runTime = transformMinutesToHours(time);
  const genresList = genres.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`).join('');

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${alternativeName}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writersList}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actorsList}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genre${genres.length > 1 ? 's' : ''}</td>
                <td class="film-details__cell">
                  ${genresList}</td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist${watchlistActive}" id="watchlist" name="watchlist">${watchlistText}</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched${watchedActive}" id="watched" name="watched">${watchedText}</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite${favoriteActive}" id="favorite" name="favorite">${favoriteText}</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">${commentsTemplate}</ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${isEmotion ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ''}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>${he.encode(textComment)}</textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="smile" value="smile" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="sleeping" value="sleeping" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="puke" value="puke" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="angry" value="angry" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends SmartView{
  #film = null;
  #comments = null;
  #deletingComment = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this._data = PopupView.parseFilmToData(film);
    this.#comments = comments;

    this.#setInnerHandlers();
  }

  get template() {
    return createDetailsTemplate(this._data, this.#comments);
  }

  getNewComment = () => {
    const newComment = {
      emoji: this._data.emoji,
      text: this._data.textComment,
    };

    return newComment;
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this._callback.watchlistClick);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this._callback.watchedClick);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this._callback.favoriteClick);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteComment = callback;
    const deleteButtons = this.element.querySelectorAll('.film-details__comment-delete');

    deleteButtons.forEach((button) => {
      button.addEventListener('click', this.#handleDeleteButtonClick);
    });
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteComment);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputClickHandler);
  }

  reset = (film) => {
    this.updateData(
      PopupView.parseFilmToData(film),
    );
  }

  shakeComment(callback) {
    const shakedElement = this.#deletingComment;

    shakedElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      shakedElement.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeForm(callback) {
    const shakedElement = this.element.querySelector('.film-details__new-comment');

    shakedElement.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      shakedElement.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #commentInputClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData({textComment: evt.target.value}, true);
  }

  #emojiClickHandler = (evt) => {
    if (!isClickOnInput(evt)) {
      return;
    }
    this.updateData({
      isEmotion: true,
      emoji: evt.target.id,
    });
  }

  #handleDeleteButtonClick = (evt) => {
    const numberOfComment = Array.from(this.element.getElementsByClassName('film-details__comment-delete')).indexOf(evt.target);
    this.#deletingComment = evt.target.closest('.film-details__comment');
    this.deletingCommentId = this._data.comments[numberOfComment];
    this._data.deletingCommentId = this.deletingCommentId;
    this._callback.deleteComment();
  }

  static parseFilmToData = (film) => ({...film,
    isEmotion: false,
    textComment: '',
    isDisabled: false,
    deletingCommentId: null,
  })
}
