/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#dropdown').on("click", function() {
    $('.tweet-form').slideToggle(500);
    $('#tweet-text').focus();
  });
  let returnTopBtn = document.getElementById('scrollbuttonid');
  window.addEventListener("scroll", function() {
    if(this.document.body.scrollTop > 20 || this.document.documentElement.scrollTop > 20) {
      returnTopBtn.style.display = 'block';
    } else {
      returnTopBtn.style.display = 'none';
    }
  });
  $("#scrollbuttonid").on("click", function() {
    $('.tweet-form').slideToggle(500);
    $('#tweet-text').focus();
  })
});