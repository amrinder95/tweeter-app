/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#newtweet-form').on("submit", function(event) {
    event.preventDefault();
    let $formData = $(this).serialize();
    let tweetLength = $('#tweet-text').val().length;
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
        alert("Something went wrong with your request.")
      }
    })
  }); 
  loadTweets();
});

const renderTweets = function (arrayOfTweetObjects) {
  for(let tweetObject of arrayOfTweetObjects) {
    let $tweet = createTweetElement(tweetObject);
    $('#tweet-container').prepend($tweet);
  }
}
const createTweetElement = function (tweetObject) {
  let escapeHTML = function(text) {
    return $('<div>').text(text).html();
  }
  let tweetText = tweetObject.content.text;
  let tweetHTML = `${escapeHTML(tweetText)}`;
  let $tweet = $(
    `<section class="tweet-show">
      <header class="tweet-header">
        <p id="tweet-name"><img id="tweet-avatar"src="${tweetObject.user.avatars}" alt="">${tweetObject.user.name}</p>
        <p id="tweet-handle">${tweetObject.user.handle}</p>
      </header>
      <article class="tweet">${tweetHTML}</article>
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
      $('#tweet-container').empty();
      renderTweets(data)
    },
    fail: (error) => {
      console.log(error);
    }
  })
}





