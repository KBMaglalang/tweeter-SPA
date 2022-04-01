/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(() => {
  $('.errorEmpty').hide();
  $('.errorOverLimit').hide();
  $('.new-tweet').hide();

  const createTweetElement = function(tweetObject) {
    // header
    const $header = $(`<header><img src=${escape(tweetObject.user.avatars)}><div class='userInfo'><label for="name">${escape(tweetObject.user.name)}</label><label for="handle" class="handleName">${escape(tweetObject.user.handle)}</label></div></header>`);
    
    // paragraph
    const $paragraph = $(`<p>${escape(tweetObject.content.text)}</p>`);
    
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
      $("#tweet-text").trigger('input');   // trigger the event listener in composer-char-counter to update the counter
      $('.tweet-container').empty();
      renderTweets(data);
    });
  };
  
  // submit the form data to the server
  $('.new-tweet form').submit(function(e) {
    e.preventDefault();
    
    $('.errorOverLimit').hide();
    $('.errorEmpty').hide();

    // check that there is content in the messager box
    const $tweetCheck = $('#tweet-text').val();
    if (!$tweetCheck) {
      $('.errorEmpty').slideDown(100);
      return;
    } else if ($tweetCheck.length > 140) {
      $('.errorOverLimit').slideDown(100);
      return;
    }
    
    // transmit the data to the server
    const $tweetData = $('.new-tweet form').serialize();
    $.post('/tweets', $tweetData).then(function() {
      loadTweets();
    });
  });

  // sliding new tweet form
  $('#downArrow, nav label').click(function() {
    $('.new-tweet').slideToggle(function() {
      $('#tweet-text').val('');
      $("#tweet-text").trigger('input');   // trigger the event listener in composer-char-counter to update the counter
      $('.new-tweet').is(':visible') ? $('#tweet-text').focus() : $('#tweet-text').blur();
    });
    $('.errorEmpty').slideUp();
    $('.errorOverLimit').slideUp();
  });

  // animate new tweet arrow
  setInterval(function() {
    $('#downArrow').animate({"margin-top": '10px'}, 250);
    $('#downArrow').animate({"margin-top": '0px'}, 250);
  }, 500);

  // load the tweets at startup
  loadTweets();
});
