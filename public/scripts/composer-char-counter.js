$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charsLeft = 140 - $(this).val().length;
    $('#char-count').val(charsLeft);
    if (charsLeft < 0) {
      $('#char-count').addClass('negative');
    } else {
      $('#char-count').removeClass('negative');
    }
  })   
});