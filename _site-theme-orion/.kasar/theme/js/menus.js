/* ****************************************************************************
 * This script drives the menus
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery */
/* eslint strict: ["error", "function"], semi-style: 0 */
(function($) {
  'use strict';

  // jQuery functions
  $(document).ready(function() {
    $('.content .left .menu .pure-menu-link, .sidemenu .menu .pure-menu-link').on('click', function() {
      if ($(this).parent().hasClass('pure-menu-active') && $(this).parent().hasClass('pure-menu-has-children')) {
        // The user clicked on the parent menu and it is already active, so
        // we deactivate it.
        $(this).parent().removeClass('pure-menu-active');
      } else {
        // The user clicked on a non active parent menu, we deactivate the
        // previous active menu and we activate the clicked one:
        $(this)
          .parent()
          .parent()
          .find('.pure-menu-active')
          .removeClass('pure-menu-active')
        ;

        $(this).parent().addClass('pure-menu-active');
      }
    });
  });
}(jQuery));
