//////////////////////////////////////////////////////
// FCrypt | Facebook Messenger Encryption Extension //
//////////////////////////////////////////////////////

import { loadCSS, toArray } from './utility-functions';
import FCrypt from './fcrypt';

const CSS_FILES = ['styles/font-awesome.min.css', 'styles/remodal.css', 'styles/remodal-default-theme.css'];
const DOCK_WRAPPER = '.fbDockWrapper'
let css;

$('._li').addClass('remodal-bg');

$(document).ready(function () {
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
  const isSafari = navigator.userAgent.indexOf("Safari") > -1;

  if (isChrome) {
    css = CSS_FILES.map(file => chrome.extension.getURL(file));
  } else if (isFirefox) {
    css = self.data.url(file);
  } else if (isSafari) {
    css = safari.extension.baseURI + file;
  }

  loadCSS(css);
});

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
