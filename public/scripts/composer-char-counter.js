$(document).ready(function() {
  const textBox = document.getElementById('tweet-text');
  const charCount = document.getElementById('char-count');
  textBox.addEventListener("input", function() {
    charCount.value = 140 - this.value.length;
    if (charCount.value < 0) {
      charCount.classList.add('negative');
    } else {
      charCount.classList.remove('negative');
    }
  });
});