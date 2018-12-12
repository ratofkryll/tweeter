$(document).ready(function() {

  $('.new-tweet textarea').on('keyup', function (event) {
    const textInput = $(this);
    const charCount = textInput.val();
    const counter = $(this).siblings('.counter');

    counter.text(140 - charCount.length);
    counter.toggleClass('counter-negative-value', charCount.length > 140);
  });

});
