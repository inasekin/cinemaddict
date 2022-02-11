import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {FilterType} from './const.js';
dayjs.extend(relativeTime);

export const sortByDate = (filmA, filmB) => filmB.releaseDate - filmA.releaseDate;
export const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;
export const sortByCommented = (filmA, filmB) => filmB.comments.length - filmA.comments.length;
export const sortById = (filmA, filmB) => filmA.id - filmB.id;

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.inWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.isFavorite),
};

export const transformArrayToString = (array) => {
  const string = array.map((arrayItem) => arrayItem).join(', ');
  return string;
};

export const transformMinutesToHours = (time) => {
  const timeHours = Math.trunc(time / 60);
  const timeMinutes = time % 60;
  let fullTime = '';

  if (timeHours > 0) {
    fullTime = `${timeHours}h ${timeMinutes}m`;
  } else {
    fullTime = `${timeMinutes}m`;
  }

  return fullTime;
};

export const transformStringToQuote = (text, length) => {
  if (text.length > length) {
    return `${text.slice(0, length - 1)}...`;
  } else {
    return text;
  }
};

export const getRank = (filmsCount) => {
  if (filmsCount <= 10) {return 'Novice';}
  if (filmsCount <= 20) {return 'Fan';}
  if (filmsCount > 20) {return 'Movie buff';}
};

export const getGenresInfo = (films) => {
  const stats = {};

  for (const film of films) {
    for (const genresItem of film.genres) {
      if (stats[genresItem]) {
        stats[genresItem] += 1;
        continue;
      }

      stats[genresItem] = 1;
    }
  }

  return stats;
};

export const adaptToClient = (film) => {
  const adaptedFilm = {...film,
    watchingDate: film.user_details['watching_date'] !== null ? new Date(film.user_details['watching_date']) : film.user_details['watching_date'],
    releaseDate: new Date(film.film_info.release['date']),
    name: film.film_info['title'],
    alternativeName: film.film_info['alternative_title'],
    ageRating: film.film_info['age_rating'],
    isWatched: film.user_details['already_watched'],
    isFavorite: film.user_details['favorite'],
    inWatchlist: film.user_details['watchlist'],
    description: film.film_info['description'],
    director: film.film_info['director'],
    poster: film.film_info['poster'],
    rating: film.film_info['total_rating'],
    actors: film.film_info['actors'],
    genres: film.film_info['genre'],
    country: film.film_info.release['release_country'],
    time: film.film_info['runtime'],
    writers: film.film_info['writers'],
  };

  delete adaptedFilm.user_details;
  delete adaptedFilm.film_info;

  return adaptedFilm;
};
