$(document).ready(() => {

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
    let $tweetText = $('<p>');
    let $tweetFooter = $('<footer>');


    $tweetHeader.append(
      `<img class="header-img" src="${tweet.user.avatars.small}" alt="avatar" />`,
      `<h2 class="header-name">${tweet.user.name}</h2>`,
      `<span class="header-handle">${tweet.user.handle}</span>`
    );

    $tweetText.text(tweet.content.text);
    $tweetContent.append($tweetText);

    $tweetFooter.append(`
      <span class="posted-time">${moment(tweet.created_at).fromNow()}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
      `);

    $tweetContainer.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweetContainer;
  }

  // Handle tweet data GET
  $.getJSON('/tweets', (data) => {
    renderTweets(data);
  });

  // Handle new tweet POST
  $('#compose-tweet').submit((e) => {
    e.preventDefault();

    const $charCount = $('#new-tweet textarea').val().length;
    const $error = $('.error-message');

    if ($error.height() > 0) {
      $error.slideUp('fast', () => {
        $error.text('');
      });
    }

    if ($charCount === 0 || $charCount === ' ') {
      $error.slideDown('fast', () => {
        $error.text('Please enter up to 140 characters.');
      });
      return;
    }

    if ($charCount > 140) {
      $error.slideDown('fast', () => {
        $error.text('Your tweet must be less than 140 characters.');
      });
      return;
    }

    const $postTweet = $.post('/tweets', $(this).serialize());

    $postTweet.done((data) => {
      $('#new-tweet textarea').val('');
      $('#new-tweet .counter').text('140');

      $.getJSON('/tweets', (data) => {
        $('#tweets-wrapper').empty();
        renderTweets(data);
      });
    });
  });

  // Show/hide tweet submission form
  $('.compose').click(() => {
    $('#new-tweet').slideToggle('fast', () => {
      $('#new-tweet textarea').focus();
    });
  });
});
