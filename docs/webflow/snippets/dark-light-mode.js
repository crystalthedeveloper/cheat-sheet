"use strict";

// Create script element for jQuery
var jQueryScript = document.createElement('script');
jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
jQueryScript.onload = function () {
  var jQuery = $.noConflict(true);

  // Anonymous function to encapsulate jQuery code
  (function ($) {
    // Ensure Webflow array exists
    window.Webflow = window.Webflow || [];
    // Push function to Webflow array
    window.Webflow.push(() => {
      // Function to toggle dark-light mode
      function toggleDarkLightMode() {
        var darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
          // Dark Mode
          $('body').css({
            'background-color': '#0a1f1f',
            'color': '#ffffff'
          });
          // Set styles for various elements in dark mode
          $('.paragraph, .footer-link, .about-title, .title, .h2, .course-labels, .bonus-h2, .true-or-false-text, .slider-arrow-icon').css('color', '#ffffff');
          $('.about-info-wrap').css('background-color', '#0a1f1f');
          $('.footer-logo-image').attr('src', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/662831673fd2dec6eba4fecb_FST%20Logo-dark.png');
          $('.hero-image').attr('src', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6628fdecad917d34c52e572d_hero-image-dark.png');
          $('.hero-image').attr('srcset', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6628fdecad917d34c52e572d_hero-image-dark.png 500w, https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6628fdecad917d34c52e572d_hero-image-dark.png 800w');
          $('.dark-light-button, .icon-circle-dark').addClass('opaque-dark');
          $('.icon-circle-light').addClass('opaque-light');
          localStorage.setItem('we_clicks', true);
        } else {
          // Light Mode
          $('body').css({
            'background-color': '#ffffff',
            'color': '#000000'
          });
          // Set styles for various elements in light mode
          $('.paragraph, .footer-link, .about-title, .title, .h2, .course-labels, .bonus-h2, .true-or-false-text, .slider-arrow-icon').css('color', '#000000');
          $('.about-info-wrap').css('background-color', '#ffffff');
          $('.footer-logo-image').attr('src', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6622cffa219b956a49edd98c_FST%20Logo-footer.png');
          $('.hero-image').attr('src', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6622a21033311b2de3e6fffb_hero-image.png');
          $('.hero-image').attr('srcset', 'https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6622a21033311b2de3e6fffb_hero-image.png 500w, https://uploads-ssl.webflow.com/65f0d5739b651eae06b2ca56/6622a21033311b2de3e6fffb_hero-image.png 800w');
          $('.dark-light-button, .icon-circle-dark').removeClass('opaque-dark');
          $('.icon-circle-light').removeClass('opaque-light');
          localStorage.setItem('we_clicks', false);
        }
      }
      
      // Check if dark-light mode is already selected on page load
      $(document).ready(function () {
        toggleDarkLightMode();
      });

      // Toggle dark-light mode on button click
      $('.dark-light-button').click(function () {
        var darkMode = localStorage.getItem('darkMode') === 'true';
        localStorage.setItem('darkMode', !darkMode); // Toggle the mode
        toggleDarkLightMode();
      });

      // Store dark-light mode selection in local storage when navigating to a different page
      $(window).on('beforeunload', function () {
        var darkMode = localStorage.getItem('darkMode') === 'true';
        localStorage.setItem('darkMode', darkMode);
      });
    });
  })(jQuery);
};
document.head.appendChild(jQueryScript);
