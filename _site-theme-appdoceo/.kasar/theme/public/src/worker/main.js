/** ************************************************************************
 *
 * Starts the passed-in Service Worker.
 *
 * worker.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . start                       starts the service worker,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* - */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public Static Methods ------------------------------------------------

const Worker = {

  /**
   * Returns a reference to this KAppAdvClient object.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the path of the service worker,
   * @param {Function}      the function to call at the completion,
   * @returns {}            -,
   * @since 0.0.0
   */
  start(softwareworker, callback) {
    if (typeof navigator === 'object' && 'serviceWorker-xxx' in navigator) {
      navigator.serviceWorker.register(softwareworker)
        .then((reg) => {
          if (callback) {
            callback(null, 'Service Worker registered ...', reg);
          }
        })
        .catch((err) => {
          if (callback) {
            callback(err, 'Service Worker NOT registered ...');
          }
        });
    } else {
      callback('Service Worker NOT supported ...');
    }
  },
};


// -- Export
export default Worker;

/* - */
