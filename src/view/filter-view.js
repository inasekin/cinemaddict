import AbstractView from './abstract-view.js';
import {FilterType, MenuItem, isClickOnLink, isClickOnSpan} from '../utils/const.js';

const createFilterTemplate = (filters, currentFilterType) => {
  const all = filters[0];
  const watchlist = filters[1];
  const history = filters[2];
  const favorite = filters[3];

  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.ALL}" data-menu-item="${MenuItem.FILMS}">${all.name}</a>
      <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.WATCHLIST}" data-menu-item="${MenuItem.FILMS}">${watchlist.name} <span class="main-navigation__item-count">${watchlist.count}</span></a>
      <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.HISTORY}" data-menu-item="${MenuItem.FILMS}">${history.name} <span class="main-navigation__item-count">${history.count}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITE ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.FAVORITE}" data-menu-item="${MenuItem.FILMS}">${favorite.name} <span class="main-navigation__item-count">${favorite.count}</span></a>
    </div>`;
};

export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (e) => {
    if (!isClickOnLink(e) && !isClickOnSpan(e)) {
      return;
    }

    e.preventDefault();

    if (isClickOnSpan(e)) {
      this._callback.filterTypeChange(e.target.parentElement.dataset.filterType);
    } else {
      this._callback.filterTypeChange(e.target.dataset.filterType);
    }
  }
}
