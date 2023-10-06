/* ****************************************************************************
 * This script smootly scrolls the page.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ */
/* eslint-disable strict, one-var, semi-style, no-underscore-dangle */
(function($) {
  //

  $().DOMready(() => {
    const OFFSET   = 80
        , DURATION = 1000
        , DELAY    = 10
        ;


    // -- Private Function(s) --------------------------------------------------

    /**
     * Defines the easeInOutExpo easing method.
     *
     * @function (arg1, arg2, arg3, arg4)
     * @private
     * @param {Number}      the current lapse time,
     * @param {Number}      the initial CSS property value,
     * @param {Number}      the difference between the final and the initial value,
     * @param {Number}      the animation duration,
     * @returns {Number}    returns the value at the current lapse time,
     * @since 0.0.0
     */
    /* eslint-disable prefer-exponentiation-operator, no-restricted-properties,
      no-cond-assign, no-param-reassign, no-plusplus */
    function _easeInOutExpo(t, b, c, d) {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= (d / 2)) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    /* eslint-enable prefer-exponentiation-operator, no-restricted-properties,
      no-cond-assign, no-param-reassign, no-plusplus */

    /**
     * Smoothly move to the new scroll position.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Number}      the initial scroll position,
     * @param {Number}      the scroll position to reach,
     * @returns {}          -,
     * @since 0.0.0
     */
    function _moveTo(initial, final) {
      const duration = DURATION
          , delay    = DELAY
          , change   = final - initial
          ;

      let lapsOfTime = 0
        , value
        ;

      const timer = setInterval(() => {
        value = _easeInOutExpo(lapsOfTime, initial, change, duration);
        window.scroll(0, value);

        lapsOfTime += delay;
        if (lapsOfTime > duration) {
          clearInterval(timer);
        }
      }, delay);
    }


    // -- Main -----------------------------------------------------------------

    /**
     * Listens for a click on the navigation bar.
     */
    $('.navbar').on('click', (e) => {
      const href = e.target.getAttribute('href');
      if (href) {
        const el = $(href)[0];
        if (el) {
          e.preventDefault();
          e.stopPropagation();
          _moveTo(window.scrollY, el.offsetTop - OFFSET);
        }
      }
    });
  });
}(PicoQ));

/* eslint-enable strict, one-var, semi-style, no-underscore-dangle */
