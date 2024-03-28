/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#newtweet-form').on("submit", function(event) {
    $('.error-message').slideUp(500); //incase a previous error message is displayed, slideup so user can be aware if a new error is made
    event.preventDefault();
    let $formData = $(this).serialize();
    let tweetLength = $('#tweet-text').val().length;
    if (tweetLength <= 0) {
      $('.error').text('Incorrect submission. You must enter atleast 1 character.') //error handling
      $('.error-message').slideDown(500);
      return false;
    }
    if (tweetLength > 140) {
      $('.error').text('Incorrect submission. You cannot enter more than 140 characters.') //error handling
      $('.error-message').slideDown(500,);
      return false;
    }
    $.ajax({ 
      method: 'POST',
      url:'http://localhost:8080/tweets',
      data: $formData,
      success: (data) => {
        $('.error-message').slideUp(500);
        loadTweets();
        $('#newtweet-form').trigger('reset');  //reset form after tweet submission
      },
      fail: (error) => {
        alert("Something went wrong with your request.")
      }
    })
  }); 
  loadTweets();
});

//helper functions
const renderTweets = function (arrayOfTweetObjects) {
  for(let tweetObject of arrayOfTweetObjects) {
    let $tweet = createTweetElement(tweetObject);
    $('#tweet-container').prepend($tweet);
  }
}
const createTweetElement = function (tweetObject) {
  let escapeHTML = function(text) {     //XSS prevention
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
      alert("Something went wrong with your request.")
    }
  })
}





