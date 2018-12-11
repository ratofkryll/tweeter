console.log('Hi!');

$(document).ready(function() {
  console.log('Doc is ready!');

  $('.new-tweet textarea').on('keyup', function (event) {
    const textInput = $(this).val();
    console.log(140 - textInput.length);
  });

});
