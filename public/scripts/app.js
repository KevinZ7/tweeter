
function createTweetElement(data){
  var $article = $('<article>').addClass('tweets');
  var $header = $('<header>').addClass('tweet-header');
  var $profile = $('<div>').addClass('profile-picture').html("<img src='" + data.user.avatars.small + "' class='profile-pic'>");
  var $author = $('<h3>').addClass('author').html(data.user.name);
  var $tag = $('<span>').addClass('tag').html(data.user.handle);
  var $body = $('<main>').addClass('tweet-body').text(data.content.text);
  var $footer = $('<footer>').addClass('tweet-footer').html(data.created_at);

  $header.append($profile);
  $header.append($author);
  $header.append($tag);
  $article.append($header);
  $article.append($body);
  $article.append($footer);

  return $article;
}

function renderTweets(tweets) {
  $('.tweet-container').empty();
  var tweetOrder = tweets.reverse();
  tweetOrder.forEach(function(element){
    var tweetContainer = $('.tweet-container')
    tweetContainer.append(createTweetElement(element));
  });
}

function loadTweets(){
  $.ajax('/tweets', {
    method: 'GET',
    success: renderTweets,
    error: function(){
      alert('error');
    }
  })
}

$('#tweet-form-section').hide();
$('#alert').hide();






loadTweets();

$("#send").on("click", function(event){
  event.preventDefault();
  var counterNumber = parseInt($("#counter").text(),10);

  if(counterNumber <=0 ){
    $('#alert').show({complete: function(){
      $('#alert').text('Your tweet has exceeded the text limit!');
    }});
  } else if(counterNumber === 140){
    $('#alert').show({complete: function(){
      $('#alert').text('Your tweet is empty!');
    }});
  } else{
    $('#alert').slideUp();

    let formData = $('#tweet-form').serialize();
    $.ajax('/tweets', {
      method: 'POST',
      data: formData
    }).then(function(){
      $('#text').val('');
      $('#counter').text('140');

      return $.ajax('/tweets');
    }).then(loadTweets);
  }
});

$("#form-toggle").click(function(){
  $("#tweet-form-section").slideToggle({complete: function(){
    $("#text").focus();
  }});
});

// var $tweet = createTweetElement(testDatabase);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('.tweet-container').append($tweet);



