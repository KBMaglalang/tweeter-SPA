/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// prevent cross site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(() => {
  // hide elements
  $('.errorEmpty').hide();
  $('.errorOverLimit').hide();
  
  // create individual tweet from the passed tweet object
  const createTweetElement = function(tweetObject) {
    const $header = $(`<header><img src=${escape(tweetObject.user.avatars)}><div class='userInfo'><label for="name">${escape(tweetObject.user.name)}</label><label for="handle" class="handleName">${escape(tweetObject.user.handle)}</label></div></header>`);
    const $paragraph = $(`<p>${escape(tweetObject.content.text)}</p>`);
    const $footer = $(`<footer><label class="tweetTime" for="datePosted">${timeago.format(tweetObject.created_at)}</label><div class="tweetIcons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer>`);
    
    return $('<article class="tweet"></article>').append($header,$paragraph,$footer);
  };
  
  // process all tweets from the server
  const renderTweets = function(tweetData) {
    for (const obj of tweetData) {
      $('.tweet-container').prepend(createTweetElement(obj));
    }
  };

  // get the data from the server
  const loadTweets = function() {
    $.get('/tweets').then(function(data) {
      $('#tweet-text').val('').trigger('input');
      $('.tweet-container').empty();
      renderTweets(data);
    });
  };
  
  // submit the form data to the server
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    
    const $tweetCheck = $('#tweet-text').val();
    const $errorOverLimit = $('.errorOverLimit');
    const $errorEmpty = $('.errorEmpty');

    $errorOverLimit.hide();
    $errorEmpty.hide();

    // check that there is content in the messager box
    if (!$tweetCheck) {
      $errorEmpty.slideDown(100);
      return;
    }
    if ($tweetCheck.length > 140) {
      $errorOverLimit.slideDown(100);
      return;
    }
    
    // transmit the data to the server
    const $tweetData = $(this).serialize();
    $.post('/tweets', $tweetData).then(function() {
      loadTweets();
    });
  });

  // load the tweets at startup
  loadTweets();
});
