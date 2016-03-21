//////////////////////////////////////////////////////
// FCrypt | Facebook Messenger Encryption Extension //
//////////////////////////////////////////////////////

import { loadCSS, toArray } from './utility-functions';
import FCrypt from './fcrypt';

const CSS_FILES = ['styles/font-awesome.min.css', 'styles/remodal.css', 'styles/remodal-default-theme.css'];
const DOCK_WRAPPER = '.fbDockWrapper'
let css = CSS_FILES.map(file => chrome.extension.getURL(file));

loadCSS(css);
$('._li').addClass('remodal-bg');

$(window).load(function () {
  const CHATS = $('.fbNubFlyoutTitlebar.titlebar');

  CHATS.each(function () {
    new FCrypt($(this).closest('.fbNub'));
  });

  let dockObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      toArray(mutation.addedNodes).forEach(node => {
        let $node = $(node).first();
        if ($node.hasClass('fbNub')) {
          new FCrypt($node);
        }
      })
    });
  });

  dockObserver.observe(document.querySelector(DOCK_WRAPPER), {
    childList: true,
    subtree: true,
  });
});
