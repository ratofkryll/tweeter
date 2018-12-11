console.log('Hi!');

$(document).ready(function() {
  console.log('Doc is ready!');

  $('.new-tweet textarea').on('keyup', function (event) {
    const textInput = $(this).val();
    const counter = $(this).siblings('.counter');

    counter.text(140 - textInput.length);
    counter.toggleClass('counter-negative-value', textInput.length > 140);
  });

});
