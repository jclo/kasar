/* ****************************************************************************
 * This script drives the sidemenu
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery */
/* eslint strict: ["error", "function"] */
/* eslint one-var: 0, semi-style: 0, no-var: 0, prefer-arrow-callback: 0,
  prefer-template: 0 */
(function($) {
  'use strict';

  // jQuery functions
  $(document).ready(function() {
    // Opens the sidemenu.
    function open() {
      $('.sidemenu').addClass('open');
      $('.menu-icon').addClass('clicked');
      // Freeze scrolling:
      $('body').addClass('freeze');
      $('.column.right').addClass('freeze');
      // For the frontpage, disable smooth scrooling:
      $('.down a').attr('href', '#homeless');
    }

    // Closes the sidemenu.
    function close() {
      $('.sidemenu').removeClass('open');
      $('.menu-icon').removeClass('clicked');
      $('body').removeClass('freeze');
      $('.column.right').removeClass('freeze');
      $('.down a').attr('href', '#home');
    }

    // Highlights the active menu item on page load.
    function activate() {
      var path = document.location.pathname;

      if (path.match(/\/doc\//)) {
        $('.sidemenu .menu .here').addClass('pure-menu-active');
        // $('.sidemenu .menu .youarehere').children(':first').addClass('active');
        $('.sidemenu .menu .youarehere').addClass('pure-menu-active');
      } else {
        $('.sidemenu .menu a[href="' + path + '"]')
          .parent()
          .addClass('pure-menu-active')
        ;
      }
    }


    // -- Main

    // Open or close the side menu:
    $('.sidemenu .sidebutton a').on('click', function() {
      if ($('.sidemenu').hasClass('open')) {
        close();
      } else {
        open();
      }
    });

    // Close the sidemenu on click outside the sidemenu area:
    // $('.marketing, .body, .down').on('click', function(event) {
    //   event.stopPropagation();
    //   // Do not close the menu if the user clicks on the down arrow. the
    //   // effect isn't graceful!
    //   if (!$(this).hasClass('down')) {
    //     close();
    //   }
    // });

    // // Close the sidmenu on click on an anchor tag:
    // $('.sidemenu .doc').on('click', function() {
    //   $('.youarehere').addClass('active');
    //   close();
    // });

    //


    // $('body').on('load', function(e) {
    //   console.log(e);
    //   console.log('coucou');
    // });


    // Wait for a click on the sidemenu, close the sidemenu, then load
    // the new page.
    $('.sidemenu .inner a').on('click', function(e) {
      var href = e.target.attributes.href.value
        , target = e.target.attributes.target.value
        ;

      // Stop default behaviour:
      e.preventDefault();

      if (href !== '#') {
        // Close the menu, then load the requested page:
        close();
        setTimeout(function() {
          if (target === '_blank') {
            window.open(href, '_blank');
          } else {
            window.location.replace(href);
          }
        }, 400);
      }
    });

    // Highlights the selected menu on load:
    activate();
  });
}(jQuery));
