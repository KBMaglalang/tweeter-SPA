// composer.js


const toggleTweetForm = function() {
  $('.new-tweet').slideToggle(function() {
    $('#tweet-text').val('');
    $("#tweet-text").trigger('input');   // trigger the event listener in composer-char-counter to update the counter
    $('.new-tweet').is(':visible') ? $('#tweet-text').focus() : $('#tweet-text').blur();
  });
  $('.errorEmpty').slideUp();
  $('.errorOverLimit').slideUp();
};

$(() => {
  $('.new-tweet').hide();
  $('.toggleButton').hide();

  // show and hide the nav or toggle button depending on the scroll position
  $(window).scroll(function() {
    $(this).scrollTop();
    if ($(this).scrollTop() >= 120) {
      $('.toggleButton').show();
      $('nav').hide();
      return;
    }
    $('.toggleButton').hide();
    $('nav').show();
  });

  // scroll the page to the top
  $('.toggleButton').click(function() {
    window.scrollTo(0,0);
    if (!$('.new-tweet').is(':visible'))
      toggleTweetForm();
  });

  // sliding new tweet form
  $('#downArrow, nav label').click(function() {
    toggleTweetForm();
  });

  // animate new tweet arrow
  setInterval(function() {
    $('#downArrow').animate({"margin-top": '10px'}, 250);
    $('#downArrow').animate({"margin-top": '0px'}, 250);
  }, 500);
});