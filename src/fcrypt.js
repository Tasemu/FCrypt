import $ from 'jquery';

const LOCK_ICON = `<a class="fa fa-lock"></a>`;
const UNLOCK_ICON = `<a class="fa fa-unlock"></a>`;
const FBC_BUTTONS = '._552n';
const ID = '_' + Math.random().toString(36).substr(2, 9);

const settingsModal = (
  `<div class="remodal" data-remodal-id="modal-${ID}">
    <button data-remodal-action="close" class="remodal-close"></button>
    <h1>Remodal</h1>
    <p>
      Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative configuration and hash tracking.
    </p>
    <br>
    <button data-remodal-action="cancel" class="remodal-cancel">Cancel</button>
    <button data-remodal-action="confirm" class="remodal-confirm">OK</button>
  </div>`
);

export default class FCrypt {

  constructor (element) {
    this.container = element;
    this.sessionActive = false;
    this.initialiseUI();
    this.setEventListeners();
    this.render();
  }

  initialiseUI () {
    $('body').append(settingsModal);
  }

  setEventListeners () {
    this.container.on('click', '.fcrypt_lock', () => {
      this.sessionActive = !this.sessionActive;
      this.render();
    });
  }

  render () {
    if (this.sessionActive) {
      this.container.find('.fcrypt_lock').remove();
      this.container.find(FBC_BUTTONS).append(`<div class="_6gd fcrypt_lock unlocked">${UNLOCK_ICON}</div>`);
    } else {
      this.container.find('.fcrypt_lock').remove();
      this.container.find(FBC_BUTTONS).append(`<div class="_6gd fcrypt_lock" data-remodal-target="modal-${ID}">${LOCK_ICON}</div>`);
    }
  }

}
