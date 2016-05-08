;(function() {

  var d = document;
  var searchForm = d.getElementById('tweet-search');

  searchForm.addEventListener('submit', searchTweet, false);

  function searchTweet(e) {
    e.preventDefault();
    var searchTerm = getSearchTerm();
    var tweetCount = getTweetCount();

    if('' === searchTerm) {
      console.log('Please enter a search term');
      return;
    }

    getTweets(searchTerm, tweetCount);
  }

  function getSearchTerm() {
    var searchTerm = d.querySelector('#tweet-search input[name="search"]').value;
    return searchTerm;
  }

  function getTweetCount() {
    var tweetCount = d.querySelector('#tweet-search select[name="tweet-count"]').value;
    return tweetCount;
  }

  function toggleLoader(status) {
    var loader = document.querySelector('.loader');

    if ('show' == status) {
      loader.style.display = 'none';
    } else if ('hide' === status) {
      loader.style.display = 'block';
    } else {
      console.error('Please provide a status value when calling');
    }
  }

  function getTweets(searchTerm, tweetCount) {
    toggleLoader('hide');
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/twitter/search?' + (searchTerm ? ('q=' + searchTerm) : '') + (tweetCount ? ('&count=' + tweetCount) : ''), true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var result = JSON.parse(xhttp.responseText);
        populateTweets(result);
        toggleLoader('show');
      }
    };
  }

  function populateTweets(result) {
    d.getElementById('tweet-list').innerHTML = '';

    for (var i = 0; i < result.length; i++){
      var entity = d.createElement('P');         
      var textentity = d.createTextNode(result[i].user.name + ': ' + result[i].text);

      entity.appendChild(textentity);
      d.getElementById('tweet-list').appendChild(entity);
    }
  }
})();