const els = document.querySelectorAll('.lozad')
const observer = lozad(els, {
  load: function(el) {
    console.log('loading element')
    el.src = el.getAttribute('data-src')
  },
  loaded: function(el) {
    el.classList.add('loaded')
  }
})
observer.observe()