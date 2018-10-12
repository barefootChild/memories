"use strict";

var els = document.querySelectorAll('.lozad');
var observer = lozad(els, {
  load: function load(el) {
    console.log('loading element');
    el.src = el.getAttribute('data-src');
  },
  loaded: function loaded(el) {
    el.classList.add('loaded');
  }
});
observer.observe();