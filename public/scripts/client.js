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
    created_at: 1648506892904
  }
];

$(() => {
  const createTweet = function(tweetData) {
    const $newTweet = $('<article class="tweet"></article>');

    // header
    // TODO fix this ugly code
    // $newTweet.append(`<header><div><img src=${tweetData.user.avatars}><label for="name">${tweetData.user.name}</label></div><label for="handle">${tweetData.user.handle}</label></header>`);
    $newTweet.append(`<header><img src=${tweetData.user.avatars}><div class='userInfo'><label for="name">${tweetData.user.name}</label><label for="handle">${tweetData.user.handle}</label></div></header>`);

    // paragraph
    $newTweet.append(`<p>${tweetData.content.text}</p>`);
    
    // footer
    const dateDifference = new Date(new Date() - new Date(tweetData.created_at));
    // console.log(dateDifference);

    // TODO fix this ugly code
    let dayMessage = `${dateDifference.getSeconds()} second(s) ago`;
    // console.log(dayMessage);
    if (dateDifference.getMinutes()) {
      dayMessage = `${dateDifference.getMinutes()} minute(s) ago`;
    }
    // console.log(dayMessage);
    if (dateDifference.getHours()) {
      dayMessage = `${dateDifference.getHours()} hour(s) ago`;
    }
    // console.log(dayMessage);
    if (dateDifference.getDate()) {
      dayMessage = `${dateDifference.getDate()} day(s) ago`;
    }
    // console.log(dayMessage);
    if (dateDifference.getMonth()) {
      dayMessage = `${dateDifference.getMonth()} month(s) ago`;
    }
    // console.log(dayMessage);
    if (dateDifference.getFullYear() - 1970) {
      dayMessage = `${dateDifference.getFullYear()} year(s) ago`;
    }
    // console.log(dayMessage);

    // TODO fix this ugly code
    $newTweet.append(`<footer><label for="datePosted">${dayMessage}</label><div class="tweetIcons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div></footer>`);

    $('.tweet-container').append($newTweet); // ! temp
    // console.log($container);  // ! temp
  };

  createTweet(tempData[0]);   // ! temp
  createTweet(tempData[1]);   // ! temp
});






/*

  We can consider a tweet to be an article, and there's an HTML5 tag for that!
    done

  You shouldn't use IDs within this component. Why not?
    done

  Consider that the tweet article has a header and a footer. There are HTML5 tags for those too! This way you're not just using plain ol' <div> tags that have no semantic meaning.
    done
  
  Put in fake/dummy text where needed so that you have some content to visualize.
    done
  
  Write out the HTML for the component without adding any CSS classes and then as you style it out, decide which CSS classes you really need and where you can simply use tag based selectors
    TODO to be cleaned up later
  
  For example: article.tweet header is a more clear and specific enough selector compared to article.tweet header.tweet-header. This is because we expect to find only one header per tweet and therefore the class tweet-header is repetitive. Avoiding overuse of CSS classes like this is an important practice. If you're unclear on this, speak to a peer or mentor.
    TODO this can be cleaned up more to make it more abstract but it is done for now
  
  Add the icons in the lower-right corner (you can look for them at Font Awesome)
    done


  things to do:

    now
      just to get a variable number of tweets to work
      TODO load the tweets sections with the new information
      TODO get the lastest tweet and upload to the tweet container
      TODO on hover of the icons it would need to change color

    later
      there will be a variable number of tweets shown in the screen
        TODO will need to load the system with the tweets during startup
        TODO add to the tweets when the user presses tweet
        TODO get the tweets




  

*/