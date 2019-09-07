/* ****************************************************************************
 * This script scrolls the page to the section corresponding to the clicked
 * menu item.
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery */
/* eslint one-var: 0, strict: ["error", "function"], no-param-reassign: 0 */
(function($) {
  'use strict';

  var defaults = {
    propertyName: 'value',
    buttons: '.nav-button',
    duration: 1200,
    easing: 'easeInOutExpo',
    offset: 60
  };

  $.fn.smoothScrolling = function(options, callback) {
    var settings = $.extend({}, defaults, options);

    $(settings.buttons).click(function() {
      var page = $(this).attr('href');
      // Go
      $('html, body').animate({ scrollTop: $(page).offset().top - settings.offset }, settings.duration, settings.easing, callback);
      // This stops the event propagation to prevent a glitter on the page.
      return false;
    });
  };
}(jQuery));
