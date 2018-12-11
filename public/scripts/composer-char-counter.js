console.log('Hi!');

$(document).ready(function() {
  console.log('Doc is ready!');

  $('.new-tweet textarea').on('keypress', function (event) {
    console.log(this);
    
  });

});
