/* ****************************************************************************
 * This script detects and higlights the active menu item
 * when the page scrolls.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ */
/* eslint-disable strict, one-var, semi-style, no-underscore-dangle */
(function($) {
  const kids      = []
      , elScroll  = []
      // , threshold = 900 - (50 + 25)
      , aperture  = 300
      ;


  $().DOMready(() => {
    // -- Private Function(s) --------------------------------------------------

    /**
     * Finds real targets.
     */
    function _findrealTargets() {
      const nodes = $('.navbar').selectAll('a')[0];

      for (let i = 0; i < nodes.length; i++) {
        if (/^#/.test(nodes[i].getAttribute('href')) === true
          && nodes[i].getAttribute('href').length > 1
          && $(nodes[i].getAttribute('href'))[0]
        ) {
          kids.push(nodes[i]);
        }
      }
    }

    /**
     * Computes targets position on load.
     *
     * Nota:
     * Compute the position of each target elements when all
     * the images are loaded otherwise the position could be
     * unconsistent.
     */
    function _computePositionOnLoad() {
      window.addEventListener('load', () => {
        for (let i = 0; i < kids.length; i++) {
          elScroll[i] = {
            id: kids[i].getAttribute('href'),
            position: $(kids[i].getAttribute('href'))[0] ? $(kids[i].getAttribute('href'))[0].getBoundingClientRect().top : 0,
          };
        }
      });
    }

    /**
     * Finds matching target on scroll.
     */
    function _findMatchingOnScroll() {
      let iCurScrollPos
        ;

      window.addEventListener('scroll', () => {
        iCurScrollPos = window.scrollY;

        for (let i = 0; i < elScroll.length; i++) {
          if ((elScroll[i].position > (iCurScrollPos - (aperture / 2)))
              && (elScroll[i].position < (iCurScrollPos + aperture))
          ) {
            for (let j = 0; j < kids.length; j++) {
              if (kids[j].getAttribute('href') === elScroll[i].id) {
                kids[j].parentNode.classList.add('active');
              } else {
                kids[j].parentNode.classList.remove('active');
              }
            }
          }
        }
      });
    }


    // -- Main -----------------------------------------------------------------

    _findrealTargets();
    _computePositionOnLoad();
    _findMatchingOnScroll();
  });
}(PicoQ));

/* eslint-enable strict, one-var, semi-style, no-underscore-dangle */
