import AbstractView from './abstract-view.js';

const createTotalTemplate = (totalCount) => (
  `<p>${totalCount} movies inside</p>`
);

export default class TotalView extends AbstractView{
  #totalCount = null;

  constructor(totalCount) {
    super();
    this.#totalCount = totalCount;
  }

  get template() {
    return createTotalTemplate(this.#totalCount);
  }
}
