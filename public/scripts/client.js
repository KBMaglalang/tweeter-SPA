/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const createTweetElement = function(tweetObject) {
    // header
    const $header = $(`<header><img src=${tweetObject.user.avatars}><div class='userInfo'><label for="name">${tweetObject.user.name}</label><label for="handle" class="handleName">${tweetObject.user.handle}</label></div></header>`);
    
    // paragraph
    const $paragraph = $(`<p>${tweetObject.content.text}</p>`);
    
    // footer
    // eslint-disable-next-line no-undef
    const $footer = $(`<footer><label class="tweetTime" for="datePosted">${timeago.format(tweetObject.created_at)}</label><div class="tweetIcons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer>`);
    
    // create tweet
    const $tweet = $('<article class="tweet"></article>').append($header,$paragraph,$footer);

    return $tweet;
  };
  
  const renderTweets = function(tweetData) {
    for (const obj of tweetData) {
      $('.tweet-container').prepend(createTweetElement(obj));
    }
  };

  // get the data from the server
  const loadTweets = function() {
    $.get('/tweets').then(function(data) {
      $('#tweet-text').val('');
      $("#tweet-text").trigger('input');
      $('.tweet-container').empty();
      renderTweets(data);
    });
  };
  
  // submit the form data to the server
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    
    // check that there is content in the messager box
    const $tweetCheck = $('#tweet-text').val();
    if (!$tweetCheck) {
      alert("can't tweet an empty message");
      return;
    } else if ($tweetCheck.length > 140) {
      alert("can't tweet more than 140 characters");
      return;
    }
    
    // transmit the data to the server
    const $tweetData = $('.new-tweet form').serialize();
    $.post('/tweets', $tweetData).then(function() {
      loadTweets();
    });
  });

  loadTweets();
});

/*
todo animated down arrow thing
*/
