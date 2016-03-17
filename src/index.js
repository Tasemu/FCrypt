//////////////////////////////////////////////////////
// FCrypt | Facebook Messenger Encryption Extension //
//////////////////////////////////////////////////////

/////--------- DEPENDENT FACEBOOK CLASSES ---------
/*
._5rpu					: Editable div/textarea -> gets changed to .textA
._552h					: Body of message box
._552n					: Bar underneath text area
.fbNubFlyoutFooter		: Outer body of message
._5w1r					: Outer message tag
._1p1v					: "Type a message..." tag -> deleted when lock icon appears
._4tdt					: Message section (including date and photo) -> used to calculate max-width of messages
.fbDock					: All chat pop ups
.fbNubFlyoutBody		: Body of a pop up chat
.fbNubFlyoutOuter		: Pop up chat
.fbNubFlyoutTitlebar	: title section -> used to check how many chats
*/

import * as utils from './utility-functions';
import FCrypt from './fcrypt';

const CSS_FILES = ['styles/font-awesome.min.css', 'styles/remodal.css', 'styles/remodal-default-theme.css'];

let css = CSS_FILES.map(file => chrome.extension.getURL(file));
utils.loadCSS(css);
$('._li').addClass('remodal-bg');

window.REMODAL_GLOBALS = {
  NAMESPACE: 'modal',
  DEFAULTS: {
    hashTracking: false
  }
};

$(window).load(function () {
  const CHATS = $('.fbNubFlyoutTitlebar.titlebar');

  CHATS.each(function () {
    new FCrypt($(this).closest('.fbNub'));
  });
});
