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
      tweetWrapper.append(createTweetElement(tweetData[i]));
    };
    return tweetWrapper;
  }

  // renderTweets(data);

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

    $tweetContent.append(`<p>${tweet.content.text}</p>`);

    $tweetFooter.append(
      `<span class="posted-time">${moment(tweet.created_at).fromNow()}</span>
      <img class="icon" src="/images/heart.png" alt="Heart icon" />
      <img class="icon" src="/images/refresh.png" alt="Refresh icon" />
      <img class="icon" src="/images/flag.png" alt="Flag icon" />`
    );

    $tweetContainer.append($tweetHeader, $tweetContent, $tweetFooter);

    return $tweetContainer;
  }

  // Handle new tweet POST
  $('#compose-tweet').submit(function (e) {
    const charCount = $('.new-tweet textarea').val().length;
    console.log(charCount);
    e.preventDefault();
    $.post('/tweets', $(this).serialize());
  });

  // Handle tweet data GET
  $.getJSON('/tweets', function (data) {
    renderTweets(data);
  });

});
