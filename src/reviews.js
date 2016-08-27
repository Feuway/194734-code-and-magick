var URL = 'http://localhost:1506/api/reviews';

var loadReviews = function(url, callback) {
  var callbackName = 'cb' + String(Math.random()).slice(-6);

  window[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};

loadReviews(URL, JSONPCallback);

function JSONPCallback(data) {
  window.reviews = data;
}


