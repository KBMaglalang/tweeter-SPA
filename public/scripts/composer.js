// composer.js

$(() => {
  $('.new-tweet').hide();
  $('.toggleButton').hide();
  
  // show or hide the tweet form
  const toggleTweetForm = function() {
    $('.new-tweet').slideToggle(function() {
      $(this).find('#tweet-text').val('').trigger('input').focus();
    });
    $('.errorEmpty').slideUp();
    $('.errorOverLimit').slideUp();
  };

  // show and hide the nav or toggle button depending on the scroll position
  $(window).scroll(function() {
    const $toggleButton = $('.toggleButton');
    const $nav = $('nav');

    $(this).scrollTop();
    if ($(this).scrollTop() >= 120) {
      $toggleButton.show();
      $nav.hide();
      return;
    }
    $toggleButton.hide();
    $nav.show();
  });

  // scroll the page to the top
  $('.toggleButton').click(function() {
    window.scrollTo(0,0);
    if (!$('.new-tweet').is(':visible')) {
      return toggleTweetForm();
    }
    $('#tweet-text').focus();
  });

  // sliding new tweet form
  $('#downArrow, nav label').click(function() {
    toggleTweetForm();
  });

  // animate new tweet arrow
  setInterval(function() {
    $('#downArrow').animate({"margin-top": '10px'}, 250).animate({"margin-top": '0px'}, 250);
  }, 500);
});