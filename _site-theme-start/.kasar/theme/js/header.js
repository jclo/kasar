/* ****************************************************************************
 * This script manages the header nav bar.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ */
/* eslint-disable strict */
(function($) {
  $().DOMready(() => {
    const TOP = 100;


    // -- Private Function(s) --------------------------------------------------
    // none,


    // -- Main -----------------------------------------------------------------

    /**
     * Listens for mouse wheel event.
     */
    window.addEventListener('wheel', () => {
      // It applies a transparency to nav bar border bottom depending on the Y
      // scroll value. When the user scrolls down, the opacity varies from
      // 0 to 1.
      let op = ((1 * window.scrollY) / TOP).toFixed(2);
      if (op < 0) {
        op = 0;
      } else if (op > 1) {
        op = 1;
      }
      $('header .navbar').css('border-bottom-color', `rgba(220, 220, 220, ${op})`);
    });
  });
}(PicoQ));

/* eslint-enable strict */
