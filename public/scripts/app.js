/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1544642915000
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

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
    e.preventDefault();
    $.post('/tweets', $(this).serialize());
  });

  // Handle tweet data GET
  $.getJSON('/tweets', function (data) {
    console.log(data);
  });

});
