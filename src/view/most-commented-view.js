import AbstractView from './abstract-view.js';

const createMostCommentedTemplate = () => (
  `<section class="films-list films-list--commented films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">

      </div>
    </section>`
);

export default class MostCommentedView extends AbstractView{
  get template() {
    return createMostCommentedTemplate();
  }
}
