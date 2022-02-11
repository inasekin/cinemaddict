import MenuView from './view/menu-view.js';
import StatsView from './view/stats-view.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import CommentsModel from './model/comments-model.js';
import ApiService from './utils/api-service.js';
import {render, renderPosition, remove} from './utils/render.js';
import {MenuItem, AUTHORIZATION, END_POINT} from './utils/const.js';

const siteMainElement = document.querySelector('.main');
const menuComponent = new MenuView();
const apiService = new ApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(apiService);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(apiService);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel);
const mainPresenter = new MainPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
let statsComponent = new StatsView(filmsModel.films);
const clearPage = () => {
  mainPresenter.destroy();
  remove(statsComponent);
};
const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      clearPage();
      mainPresenter.init();
      menuComponent.element.querySelector('.main-navigation__additional').classList.remove('main-navigation__additional--active');
      menuComponent.element.querySelector('.main-navigation__items').classList.remove('no-active');
      break;
    case MenuItem.STATS:
      clearPage();
      statsComponent = new StatsView(filmsModel.films);
      render(siteMainElement, statsComponent, renderPosition.BEFOREEND);
      menuComponent.element.querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active');
      menuComponent.element.querySelector('.main-navigation__items').classList.add('no-active');
      break;
  }
};

filterPresenter.init();
mainPresenter.init();

filmsModel.init().finally(() => {
  render(siteMainElement, menuComponent, renderPosition.AFTERBEGIN);
  menuComponent.setMenuClickHandler(handleMenuClick);
});
