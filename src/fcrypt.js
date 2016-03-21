import { toArray } from './utility-functions';

const LOCK_ICON = `<a class="fa fa-lock"></a>`;
const UNLOCK_ICON = `<a class="fa fa-unlock"></a>`;
const FBC_BUTTONS = '._552n';
const EDITABLE_DIV = '._5rpu';
const ENTER_KEY_CODE = 13;
const BODY = 'body';
const MESSAGE_CONTENT_CLASS = '._5yl5';

const CryptoJS = require('crypto-js');
const CYPHER_PREFIX = 'fcrypt::'

export default class FCrypt {

  constructor (element) {
    this.container = element;
    this.sessionActive = false;
    this.id = Math.random().toString(36).substr(2, 9);
    this.initialiseUI();
    this.setEventListeners();

    this.chatObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        toArray(mutation.addedNodes).forEach(node => {
          const $bubble = $(node).find('span:last-child').first();
          const message = $bubble.text();

          if (message.indexOf(CYPHER_PREFIX) > -1 && this.sessionActive) {
            $bubble.html(`<span style="color:red">${this.decryptCypher(this.cleanCypher(message))}</span>`);
          }
        })
      });
    });

    this.render();
  }

  initialiseUI () {
    $(BODY).append(this.generateModal());
    setTimeout(() => {
      this.container.find(FBC_BUTTONS).append(`<div class="_6gd fcrypt_lock" data-remodal-target="modal-${this.id}">${LOCK_ICON}</div><div class="_6gd fcrypt_unlock hidden"">${UNLOCK_ICON}</div>`);
      this.container.find(EDITABLE_DIV).after(`<input class="fcrypt_input hidden" style="width: 100%;border: none;box-sizing: border-box;position: absolute; top: 0" rows="1" placeholder="Encrypted Message..." />`);
    }, 500);
  }

  generateModal () {
    return (
      `<div class="remodal" data-remodal-id="modal-${this.id}" data-remodal-options="hashTracking: false">
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
  }

  cleanCypher (cypher) {
    return cypher.substring(CYPHER_PREFIX)
  }

  encryptString (string) {
    return CYPHER_PREFIX + CryptoJS.AES.encrypt(string, 'testing123');
  }

  decryptCypher (cypherText) {
    let decrypted = CryptoJS.AES.decrypt(cypherText.substring(CYPHER_PREFIX.length), 'testing123');
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  setEventListeners () {
    this.container.on('click', '.fcrypt_lock', () => {
      $(`[data-remodal-id="modal-${this.id}"]`).remodal().open();
    });

    this.container.on('click', '.fcrypt_unlock', () => {
      this.sessionActive = false;
      this.render();
    });

    $(document).on('confirmation', `[data-remodal-id="modal-${this.id}"]`, () => {
      this.sessionActive = true;
      this.render();
    });

    this.container.on('keyup', '.fcrypt_input', (event) => {
      event.stopPropagation();
      let element = this.container.find('.fcrypt_input');
      let chatInput = this.container.find(EDITABLE_DIV);
      if (event.keyCode == ENTER_KEY_CODE) {
        let chatInputContent = chatInput.find('span:last-child');

        chatInputContent.html(`<span data-text="true">${this.encryptString(element.val())}</span>`);
        element.val('');

        if (chatInput.createTextRange) {
          let part = chatInput.createTextRange();
          part.move("character", 0);
          part.select();
        } else if (chatInput.setSelectionRange) {
          chatInput.setSelectionRange(0, 0);
        }
        chatInput.focus().sendkeys('{Backspace}');
      }
    });
  }

  decryptPastMessages () {
    this.container.find(MESSAGE_CONTENT_CLASS).each((index, element) => {
      let message = $(element).text();
      if (message.indexOf(CYPHER_PREFIX) > -1) {
        $(element).html(`<span style="color:red">${this.decryptCypher(this.cleanCypher(message))}</span>`);
      }
    });
  }

  render () {
    if (this.sessionActive) {
      this.container.find('.fcrypt_lock').addClass('hidden');
      this.container.find('.fcrypt_unlock').removeClass('hidden');
      this.container.find('.fcrypt_input').removeClass('hidden');
      this.container.find('._1p1t').addClass('hidden');
      this.decryptPastMessages();
      this.chatObserver.observe(this.container.find('.conversation').get(0), {
        childList: true,
        subtree: true,
      });
    } else {
      this.container.find('.fcrypt_lock').removeClass('hidden');
      this.container.find('.fcrypt_unlock').addClass('hidden');
      this.container.find('.fcrypt_input').addClass('hidden');
      this.container.find('._1p1t').removeClass('hidden');

      this.chatObserver.disconnect();
    }
  }

}
