/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tempData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    // eslint-disable-next-line camelcase
    created_at: 1648420492904
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    // eslint-disable-next-line camelcase
    created_at: 1648506892904
  }
];


// ! DON'T ACTUALLY NEED THIS - THERE WILL BE A LIBRARY TO DO ALL OF THIS
const isMoreThan1 = function(value) {
  return value > 1 ? 's' : '';
};

// ! DON'T ACTUALLY NEED THIS - THERE WILL BE A LIBRARY TO DO ALL OF THIS
const getTweetDate = function(timeDifference) {
  let tweetDateMessage = '';
  const timeInfo = [
    timeDifference.getSeconds(),
    timeDifference.getMinutes(),
    timeDifference.getHours(),
    timeDifference.getDate(),
    timeDifference.getMonth(),
    timeDifference.getFullYear() - 1970
  ];
  const unitTime = ['second','minute','hour','day','month','year'];
  
  // create tweet date infomation
  for (let i = 0; i < timeInfo.length; i++) {
    if (timeInfo[i]) {
      tweetDateMessage = `${timeInfo[i]} ${unitTime[i]}${isMoreThan1(timeInfo[i])}`;
    }
  }

  return tweetDateMessage += ' ago';
};

$(() => {
  const createTweetElement = function(tweetObject) {
    // header
    const $header = $(`<header><img src=${tweetObject.user.avatars}><div class='userInfo'><label for="name">${tweetObject.user.name}</label><label for="handle">${tweetObject.user.handle}</label></div></header>`);
    
    // paragraph
    const $paragraph = $(`<p>${tweetObject.content.text}</p>`);
    
    // footer
    let dayMessage = getTweetDate(new Date(new Date() - new Date(tweetObject.created_at)));
    const $footer = $(`<footer><label for="datePosted">${dayMessage}</label><div class="tweetIcons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer>`);
    
    // create tweet
    const $tweet = $('<article class="tweet"></article>').append($header,$paragraph,$footer);

    return $tweet;
  };
  
  const renderTweets = function(tweetData) {
    for (const obj of tweetData) {
      $('.tweet-container').prepend(createTweetElement(obj));
    }
  };

  renderTweets(tempData); // TODO THIS IS TEMP
});
