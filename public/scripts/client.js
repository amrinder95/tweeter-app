/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Test/ driver code
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
$(document).ready(function() {
  const renderTweets = function (arrayOfTweetObjects) {
    for(let tweetObject of arrayOfTweetObjects) {
      let $tweet = createTweetElement(tweetObject);
      $('#tweet-container').append($tweet);
    }
  }
  const createTweetElement = function (tweetObject) {
    let $tweet = $(
      `<section class="tweet-show">
        <header class="tweet-header">
          <p id="tweet-name"><img id="tweet-avatar"src="${tweetObject.user.avatars}" alt="">${tweetObject.user.name}</p>
          <p id="tweet-handle">${tweetObject.user.handle}</p>
        </header>
        <article class="tweet">${tweetObject.content.text}</article>
        <footer id="tweet-footer">
          <p class="timestamp">${tweetObject.created_at}</p>
          <p>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </p>
        </footer>
      </section>`
    ) 
  return $tweet;
  }
  renderTweets(data);
});







