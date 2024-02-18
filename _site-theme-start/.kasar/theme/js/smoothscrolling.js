/* ****************************************************************************
 * This script smootly scrolls the page.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ, _moveTo, GLOBAL_OFFSET */
/* eslint-disable strict, one-var, semi-style, no-underscore-dangle */
(function($) {
  //

  $().DOMready(() => {
    // -- Private Function(s) --------------------------------------------------


    // -- Main -----------------------------------------------------------------

    /**
     * Listens for a click on the navigation bar.
     */
    $('.navbar .top-left-menu').on('click', (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = $(href)[0];
        if (el) {
          e.preventDefault();
          e.stopPropagation();
          _moveTo(window.scrollY, el.offsetTop - GLOBAL_OFFSET);
        }
      }
    });
  });
}(PicoQ));

/* eslint-enable strict, one-var, semi-style, no-underscore-dangle */
