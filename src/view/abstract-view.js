import {createElement} from '../utils/render.js';

export default class AbstractView{
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'nt indtantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template(){
    throw new Error('Getter not implemented');
  }

  removeElement() {
    this.#element = null;
  }
}
