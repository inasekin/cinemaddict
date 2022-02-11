import AbstractView from './abstract-view.js';
import {getRank} from '../utils/util.js';

const createProfileTemplate = (history) => {
  const rank = getRank(history);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileView extends AbstractView{
  #rank = null;

  constructor(rank) {
    super();
    this.#rank = rank;
  }

  get template() {
    return createProfileTemplate(this.#rank);
  }
}
