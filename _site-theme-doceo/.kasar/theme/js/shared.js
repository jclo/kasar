/* ****************************************************************************
 * This file contains shared functions accessible in the global space.
 *
 * ************************************************************************** */
// ESLint declarations
/* global */
/* eslint-disable strict, one-var, semi-style, no-underscore-dangle */


// -- Global Constants
const GLOBAL_OFFSET   = 80
    , GLOBAL_DURATION = 1000
    , GLOBAL_DELAY    = 10
    ;

/**
 * Robert Penner's easing equations.
 */
function _easeInOutExpo(t, b, c, d) {
  if (t === 0) return b;
  if (t === d) return b + c;
  /* eslint-disable-next-line */
  if ((t /= (d / 2)) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  /* eslint-disable-next-line */
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
}

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
  const duration = GLOBAL_DURATION
      , delay    = GLOBAL_DELAY
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

/* eslint-enable strict, one-var, semi-style, no-underscore-dangle */
