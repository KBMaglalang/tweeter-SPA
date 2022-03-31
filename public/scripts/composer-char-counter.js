// composer-char-counter.js

const TWEET_CHARACTER_LIMIT = 140;


$(document).ready(function() {
  const $tweetField = $("#tweet-text");
  $tweetField.on("input", function() {
    const remaininCharacters = TWEET_CHARACTER_LIMIT - $(this).val().length;
    const $counter = $(this).parents('.new-tweet').find('.counter');
    $counter.val(remaininCharacters);
    
    // turn the counter to red if invalid
    if (remaininCharacters < 0) {
      $counter.addClass('invalidTweet');
      return;
    }
    $counter.removeClass('invalidTweet');
  });
});
