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

  // Send cookieless request to Google Analytics
  var clientId = Math.round(Math.random()*10000000) + '.' + Math.round(new Date().getTime() / 1000);
  var trackingId = 'UA-154752585-1';
  var url = 'https://www.google-analytics.com/collect';
  var qs = '?v=1' +
      '&t=pageview' +
      '&tid=' + trackingId +
      '&cid=' + clientId +
      '&dl=' + document.location.href +
      '&dt=' + document.title +
      '&dr=' + document.referrer +
      '&aip=1' +
      '&ua=Roku4640X/DVP-7.70 (297.70E04154A)';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url + qs);
  xhr.send();
})();