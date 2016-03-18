const LOCK_ICON = `<a class="fa fa-lock"></a>`;
const UNLOCK_ICON = `<a class="fa fa-unlock"></a>`;
const FBC_BUTTONS = '._552n';
const EDITABLE_DIV = '._5rpu';
const ENTER_KEY_CODE = 13;
const BODY = 'body';

const AES = require("crypto-js/aes");

export default class FCrypt {

  constructor (element) {
    this.container = element;
    this.sessionActive = false;
    this.id = Math.random().toString(36).substr(2, 9);
    this.chatObserver = null;
    this.initialiseUI();
    this.setEventListeners();
    this.render();
  }

  initialiseUI () {
    const inputWidth = this.container.find('._5rpb').width();
    $(BODY).append(this.generateModal());
    this.container.find(FBC_BUTTONS).append(`<div class="_6gd fcrypt_lock" data-remodal-target="modal-${this.id}">${LOCK_ICON}</div><div class="_6gd fcrypt_unlock hidden"">${UNLOCK_ICON}</div>`);
    this.container.find(EDITABLE_DIV).after(`<input class="fcrypt_input hidden" rows="1" style="width:${inputWidth}px; padding-left: 0; padding-right: 0" placeholder="Encrypted Message..." />`);
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

  encryptString (string) {
    return AES.encrypt(string, 'testing123');
  }

  setEventListeners () {
    this.container.on('click', '.fcrypt_lock', () => {
      $(`[data-remodal-id="modal-${this.id}"]`).remodal().open();
      this.render();
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
      const element = this.container.find('.fcrypt_input');
      const chatInput = this.container.find(EDITABLE_DIV);
      if (event.keyCode == ENTER_KEY_CODE) {
        const chatInputContent = chatInput.find('span:last-child');
        let cypherText = this.encryptString(element.val());

        chatInputContent.html(`<span data-text="true">${cypherText}</span>`);
        chatInput.removeClass('hidden');
        element.addClass('hidden');

        this.triggerMessageSubmission(chatInput);
      }
    });

    this.chatObserver = new MutationObserver(mutations => {
      const mine = '._1nc6';
      const theirs = '._1nc7';
      const toArray = function() {
        return [].slice.call(arguments);
      };

      mutations.forEach(mutation => {
        console.log(mutation);
        const MESSAGE_BUBBLE = '._4tdt';
        toArray(mutation.addedNodes).forEach(node => {
          const $node = $(node);
          if ($node.hasClass('._5wd4')) {
            console.log('message');
          }
          // let myMessage = $node.closest(MESSAGE_BUBBLE).find('._5wd4').hasClass(mine) ? true : false;
          // if (myMessage) {
          //   $node.find('span:last-child').text('mine');
          // } else {
          //   $node.find('span:last-child').text('theirs');
          // }
        })
      });
    })

    this.chatObserver.observe(this.container.find('.conversation').get(0), {
      childList: true,
      subtree: true,
    });
  }

  triggerMessageSubmission (chatInput) {
    if (chatInput.createTextRange) {
      var part = chatInput.createTextRange();
      part.move("character", 0);
      part.select();
    }else if (chatInput.setSelectionRange){
      chatInput.setSelectionRange(0, 0);
    }
    chatInput.focus().sendkeys('{Backspace}');
  }

  render () {
    if (this.sessionActive) {
      this.container.find('.fcrypt_lock').addClass('hidden');
      this.container.find('.fcrypt_unlock').removeClass('hidden');
      this.container.find(EDITABLE_DIV).addClass('hidden');
      this.container.find('.fcrypt_input').removeClass('hidden');
    } else {
      this.container.find('.fcrypt_lock').removeClass('hidden');
      this.container.find('.fcrypt_unlock').addClass('hidden');
      this.container.find(EDITABLE_DIV).removeClass('hidden');
      this.container.find('.fcrypt_input').addClass('hidden');
    }
  }

}
