;(function() {

  var d = document;
  var searchForm = d.getElementById('tweet-search');

  searchForm.addEventListener('submit', searchTweet, false);

  function searchTweet(e) {
    e.preventDefault();
    var searchTerm = d.getElementById('search').value;

    if('' === searchTerm) {
      console.log('Please enter a search term');
      return;
    }

    getTweets(searchTerm);
  }

  function getTweets(searchTerm) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var result = JSON.parse(xhttp.responseText);
        populateTweets(result);
      }
    };
    xhttp.open('GET', '/twitter/xhr?'+ (searchTerm ? ('q='+searchTerm) : ''), true);
    xhttp.send();
  }

  function populateTweets(result){
    d.getElementById('tweet-list').innerHTML = '';

    for (var i = 0; i < result.length; i++){
      var entity = d.createElement('P');         
      var textentity = d.createTextNode(result[i].user.name + ': ' + result[i].text);

      entity.appendChild(textentity);
      d.getElementById('tweet-list').appendChild(entity);
    }
  }

  setInterval(function(){
    searchTweet();
  }, 30000);

})();