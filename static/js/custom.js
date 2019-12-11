(function() {
  var fullScreenToggle = document.querySelector('#fullscreen');
  if (!!fullScreenToggle){
    fullScreenToggle.addEventListener('click', function(e) {
      e.preventDefault();
      if (/(^|\s)full-screen($|\s)/.test(document.body.className)) {
        document.body.className = document.body.className.replace(/(^|\s)full-screen($|\s)/, '');
      } else {
        document.body.className += ' full-screen';
      }
    });
  }
})();