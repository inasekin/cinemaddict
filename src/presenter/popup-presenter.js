import PopupView from '../view/popup-view.js';
import {render, renderPosition, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType, isEscKey, isSubmitKeys} from '../utils/const.js';

const bodyElement = document.querySelector('body');

export default class PopupPresenter {
  #changeData = null;
  #filmDetails = null;
  #film = null;
  #commentsModel = null;

  constructor(changeData, commentsModel) {
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
  }

  get comments() {
    const comments = this.#commentsModel.comments;

    return comments;
  }

  init = (film) => {
    this.#film = film;
    this.#commentsModel.loadComments(this.#film.id);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  #renderDetails = () => {
    const prevFilmDetails = this.#filmDetails;
    this.#filmDetails = new PopupView(this.#film, this.comments);
    this.#setAllHandlers();

    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyPress);
    document.addEventListener('keydown', this.#handleSubmitKeyPress);

    if (prevFilmDetails === null) {
      render(bodyElement, this.#filmDetails, renderPosition.BEFOREEND);
      return;
    }

    if (bodyElement.contains(prevFilmDetails.element)) {
      const scrollPosition = prevFilmDetails.element.scrollTop;
      replace(this.#filmDetails, prevFilmDetails);
      this.#filmDetails.element.scrollTop = scrollPosition;
    }

    remove(prevFilmDetails);
  }

  #setAllHandlers = () => {
    this.#filmDetails.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmDetails.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetails.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetails.setCloseClickHandler(this.destroy);
    this.#filmDetails.setDeleteClickHandler(this.#handleDeleteButtonClick);
  }

  destroy = () => {
    document.removeEventListener('keydown', this.#handleEscKeyPress);
    document.removeEventListener('keydown', this.#handleSubmitKeyPress);
    this.#filmDetails.reset(this.#film);
    this.#filmDetails.element.remove();
    bodyElement.classList.remove('hide-overflow');
    this.#commentsModel.removeObserver(this.#handleModelEvent);
  }

  #handleEscKeyPress = (e) => {
    if (isEscKey(e)) {
      e.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteButtonClick = () => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      [this.#filmDetails.deletingCommentId, this.#film],
    );
  }

  #handleSubmitKeyPress = (e) => {
    if (isSubmitKeys(e)) {
      e.preventDefault();

      const film = this.#film;
      const newComment = this.#filmDetails.getNewComment();

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        [film, newComment],
      );
    }
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

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.LOAD_COMMENTS:
        this.#renderDetails();
        break;
    }
  }

  setAddingComment = () => {
    this.#filmDetails.updateData({
      isDisabled: true,
    });
  }

  setDeletingComment = () => {
    this.#filmDetails.updateData({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAbortingAddComment = () => {
    const resetDetails = () => {
      this.#filmDetails.updateData({
        isDisabled: false,
      });
    };

    this.#filmDetails.shakeForm(resetDetails);
  }

  setAbortingDeleteComment = () => {
    const resetDetails = () => {
      this.#filmDetails.updateData({
        isDisabled: false,
        deletingCommentId: null,
      });
    };

    this.#filmDetails.shakeComment(resetDetails);
  }
}
