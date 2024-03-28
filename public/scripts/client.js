/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#newtweet-form').on("submit", function(event) {
    event.preventDefault();
    let $formData = $(this).serialize();
    let tweetLength = $('#tweet-text').val();
    if (tweetLength <= 0) {
      alert('Incorrect submission. You must enter atleast 1 character.');
      return false;
    }
    if (tweetLength >= 140) {
      alert('Incorrect submission. You must enter 140 characters or less.')
      return false;
    }
    $.ajax({
      method: 'POST',
      url:'http://localhost:8080/tweets',
      data: $formData,
      success: (data) => {
        loadTweets();
        console.log('Your tweet is now posted!')
      },
      fail: (error) => {
        console.log(error);
      }
    })
  }); 
  const renderTweets = function (arrayOfTweetObjects) {
    for(let tweetObject of arrayOfTweetObjects) {
      let $tweet = createTweetElement(tweetObject);
      $('#tweet-container').prepend($tweet);
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
          <p class="timestamp">${timeago.format(tweetObject.created_at)}</p>
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
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets',
      success: (data) => {
        renderTweets(data)
      },
      fail: (error) => {
        console.log(error);
      }
    })
  }
  loadTweets();
});







