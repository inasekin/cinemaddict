export const FILM_COUNT_PER_STEP = 5;
export const FOR_ALL_TIME = 'all';
export const MINUTES_IN_HOUR = 60;
export const AUTHORIZATION = 'Basic rgsdrlgnrsdnSDFFGDSFll';
export const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';
export const BAR_HEIGHT = 50;

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  ERROR_ADD_COMMENT: 'ERROR_ADD_COMMENT',
  ERROR_DELETE_COMMENT: 'ERROR_DELETE_COMMENT',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorite',
};

export const MenuItem = {
  FILMS: 'FILMS',
  STATS: 'STATS',
};

export const isEscKey = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    return true;
  }
};

export const isSubmitKeys = (e) => e.key === 'Enter' && (e.metaKey || e.ctrlKey);

export const isClickOnLink = (e) => {
  if (e.target.tagName === 'A') {
    return true;
  }
};

export const isClickOnInput = (e) => {
  if (e.target.tagName === 'INPUT') {
    return true;
  }
};

export const isClickOnSpan = (e) => {
  if (e.target.tagName === 'SPAN') {
    return true;
  }
};
