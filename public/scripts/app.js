//create a html structure that will be appended to the tweets container
function createTweetElement(data){
  var $article = $('<article>').addClass('tweets');
  var $header = $('<header>').addClass('tweet-header');
  var $profile = $('<div>').addClass('profile-picture').html("<img src='" + data.user.avatars.small + "' class='profile-pic'>");
  var $author = $('<h3>').addClass('author').html(data.user.name);
  var $tag = $('<span>').addClass('tag').html(data.user.handle);
  var $body = $('<main>').addClass('tweet-body').text(data.content.text);
  var $footer = $('<footer>').addClass('tweet-footer').text(moment(data.created_at).fromNow());
  var $icons = $('<section>').addClass('icons').html(`<i class="fas fa-heart heart"></i><i class="fab fa-font-awesome-flag flag"></i><i class="fas fa-retweet retweet"></i>`);

  $header.append($profile,$author,$tag);
  $footer.append($icons);
  $article.append($header,$body,$footer);

  return $article;
}

//load in a array of tweet objects and loop through calling createTweetElement
//each time to prepend them to the tweet feed container html structure
function renderTweets(tweets) {
  $('.tweet-container').empty();
  var tweetOrder = tweets.reverse();
  tweetOrder.forEach(function(element){
    var tweetContainer = $('.tweet-container')
    tweetContainer.append(createTweetElement(element));
  });
}

//ajax get requets that renders the tweets
function loadTweets(){
  $.ajax('/tweets', {
    method: 'GET',
    success: renderTweets,
    error: function(){
      alert('error');
    }
  })
}

//initally hide the compose form section
$('#tweet-form-section').hide();
//initially hide the submit error messages
$('#alert').hide();


loadTweets();

//click event listener that handles the event when the user clicks
//the submit tweet button
$("#send").on("click", function(event){
  event.preventDefault();

  var counterNumber = parseInt($("#counter").text(),10);

  if(counterNumber <=0 ){
    $('#alert').slideUp();
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

//click toggle listener that will make the tweet form appear when clicked
$("#form-toggle").click(function(){
  $("#tweet-form-section").slideToggle({complete: function(){
    $("#text").focus();
  }});
});




