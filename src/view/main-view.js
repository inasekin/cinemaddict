import AbstractView from './abstract-view.js';

const createMainTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <div class="films-list__container">
      </div>
    </section>
  </section>`
);

export default class MainView extends AbstractView{
  get template() {
    return createMainTemplate();
  }
}
