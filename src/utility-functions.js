import $ from 'jquery';
const DOM_HEADER = $('head');
const DOM_BODY = $('body');

export function loadCSS (links) {
  links.forEach(file => {
    DOM_HEADER.append(`<link rel="stylesheet" href="${file}" media="screen" title="no title" charset="utf-8">`)
  });
}

export function loadJS (links) {
  links.forEach(file => {
    DOM_BODY.append(`<script src="${file}"></script>`)
  });
}
