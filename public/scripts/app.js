/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // Create & render tweet html
  function renderTweets (tweetData) {
    const tweetWrapper = $('#tweets-wrapper');
    for (let i in tweetData) {
      tweetWrapper.prepend(createTweetElement(tweetData[i]));
    };
    return tweetWrapper;
  }

  function createTweetElement(tweet) {
    let $tweetContainer = $('<div>').addClass('tweets-container');
    let $tweetHeader = $('<header>');
    let $tweetContent = $('<article>').addClass('tweet-content');
    let $tweetFooter = $('<footer>');

    $tweetHeader.append(
      `<img class="header-img" src="${tweet.user.avatars.small}" alt="avatar" />`,
      `<h2 class="header-name">${tweet.user.name}</h2>`,
      `<span class="header-handle">${tweet.user.handle}</span>`
    );

    $tweetContent.append('<p>').text(tweet.content.text);

    $tweetFooter.append(
      `<span class="posted-time">${moment(tweet.created_at).fromNow()}</span>
      <img class="icon" src="/images/heart.png" alt="Heart icon" />
      <img class="icon" src="/images/refresh.png" alt="Refresh icon" />
      <img class="icon" src="/images/flag.png" alt="Flag icon" />`
    );

    $tweetContainer.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweetContainer;
  }

  // Handle tweet data GET
  $.getJSON('/tweets', function (data) {
    renderTweets(data);
  });

  // Handle new tweet POST
  $('#compose-tweet').submit(function (e) {
    e.preventDefault();

    const $charCount = $('#new-tweet textarea').val().length;

    if ($('.error-message').height() > 0) {
      $('.error-message').slideUp('fast', function () {
        $('.error-message').text('');
      });
    }

    if ($charCount === 0 || $charCount === ' ') {
      $('.error-message').slideDown('fast', function () {
        $('.error-message').text('Please enter up to 140 characters.');
      });
      return;
    }

    if($charCount > 140) {
      $('.error-message').slideDown('fast', function () {
        $('.error-message').text('Your tweet must be less than 140 characters.');
      });
      return;
    }

    const $postTweet = $.post('/tweets', $(this).serialize());

    $postTweet.done(function (data) {
      $('#new-tweet textarea').val('');
      $('#new-tweet .counter').text('140');

      $.getJSON('/tweets', function (data) {
        $('#tweets-wrapper').empty();
        renderTweets(data);
      });
    });
  });

  // Show/hide tweet submission form & nav button behaviour
  $('.compose').hover(function () {
    $('.icon-hover').attr('src', '/images/nav/compose-icon-bw.png');
  }, function(){
    $('.icon-hover').attr('src', '/images/nav/compose-icon-green.png');
  });

  $('.compose').click(function () {
    $('#new-tweet').slideToggle('fast', function () {
      $('#new-tweet textarea').focus();
    });
  });
});
