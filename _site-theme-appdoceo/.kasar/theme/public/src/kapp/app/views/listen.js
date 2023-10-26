/** ************************************************************************
 *
 * Listens messages from the components.
 *
 * listen.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _updateHTMLPage             updates url, title and description of the loaded page,
 *  . _GET                        downloads the requested file from the server,
 *  . _init                       initializes the 'global' variables,
 *  . _listenContents             listens messages coming from contents component,
 *  . _listenHeader               listens messages coming from the header component,
 *  . _listenApp                  listens messages coming from the app components,
 *  . _listen                     listens messages from the web components,
 *
 *
 * Public Static Methods:
 *  . start                       starts listening,
 *  . stop                        stops listening,
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
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules
import Spine from '@mobilabs/spine';
import KZlog from '@mobilabs/kzlog';


// -- Local Modules
import config from '../../config';


// -- Local Constants
const { level } = config.logger
    , log       = KZlog('kapp:app:views:listen', level, false)
    ;


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Updates url, title and description of the loaded page.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the requested page,
 * @returns {}              -,
 * @since 0.0.0
 */
function _updateHTMLPage(page) {
  window.history.pushState('xxx', 'yyy', page.link);
  document.head.querySelector('title').textContent = page.title;
  document.head.querySelector('meta[name="description"]').content = page.description;
}

/**
 * Downloads the requested file from the server.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the path of the file on the server,
 * @param {string}          the type of file (json or text),
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _GET(url, type, callback) {
  Spine.fetch(url, type, (err, res) => {
    callback(err, res);
  });
}

/**
 * Initializes the 'global' variables.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _init() {
  //
}

/**
 * Listens messages coming from contents component.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the view object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenContents(that) {
  /**
   * Listens a message coming from the side menu component.
   * Then load the requested page.
   *
   */
  /* eslint-disable no-param-reassign */
  that._app.$listen('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', (payload) => {
    const [lang, name] = payload.menu ? payload.menu.split(':') : [null, null];

    if (that._sidemenu && that._sidemenu[lang]) {
      let match;

      for (let i = 0; i < that._sidemenu[lang].length; i++) {
        if (that._sidemenu[lang][i].children) {
          for (let j = 0; j < that._sidemenu[lang][i].children.length; j++) {
            if (that._sidemenu[lang][i].children[j].name === name) {
              match = that._sidemenu[lang][i].children[j];
              break;
            }
          }
          if (match) break;
        } else if (that._sidemenu[lang][i].name === name) {
          match = that._sidemenu[lang][i];
          break;
        }
      }

      if (match) {
        _GET(match.link, 'text', (err, data) => {
          const contents = data.replace(/<script>.*?<\/script>/, '');
          that._lang = lang;
          that._page = name;
          that._app.loadPage(lang, name, contents);
          that._app.menuClose();
          if (payload.callback) {
            payload.callback(null, { error_code: null, message: `"${lang}:${name}" page loaded!` });
          }
        });
        _updateHTMLPage(match);
      }
      return;
    }

    log.warn(`the "${name}" page does NOT exist for the "${lang}" language!`);
    if (payload.callback) {
      payload.callback('fails', {
        error_code: 'NotExist',
        message: `the "${name}" page does NOT exist for the "${lang}" language!`,
      });
    }
  });
  /* eslint-enable no-param-reassign */

  /**
   * Listens a message coming from the nav page menu.
   * Then load the requested page.
   *
   */
  that._app.$listen('kapp:from:app:menu:nav:page:to:app:views:load:page', (payload) => {
    // Simulate a resquest from the sidemenu to load a new page.
    that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
      menu: `${payload.menu.lang}:${payload.menu.name}`,
      source: 'menu:nav:page',
      callback: ((/* err, resp */) => {
        //
      }),
    });
  });

  /**
   * Listens a message coming from the breadcrumb menu.
   * Then, load the requested page.
   *
   */
  that._app.$listen('kapp:from:app:menu:breadcrumb:to:app:views:load:page', (payload) => {
    // Simulate a resquest from the sidemenu to load a new page.
    that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
      menu: `${payload.lang}:${payload.name}`,
      source: 'menu:breadcrumb',
      callback: ((/* err, resp */) => {
        //
      }),
    });
  });

  /**
   * Listens a message coming from the side menu component and
   * asking to change the language.
   *
   */
  that._app.$listen('kapp:from:app:menu:mobile:to:app:views:change:lang', (payload) => {
    // Simulate a resquest from the sidemenu to load a new page.
    that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
      menu: `${payload.lang}:${that._page}`,
      source: 'menu:mobile',
      callback: ((/* err, resp */) => {
        //
      }),
    });
  });

  /**
   * Listens a message coming from the mobile-menu
   * and asking to switch the theme.
   *
   */
  that._app.$listen('kapp:from:app:menus:menu-mobile:to:app:views:switch:theme', () => {
    if (that._theme === 'light') {
      that.setTheme('dark');
    } else {
      that.setTheme('light');
    }
  });
}

/**
 * Listens messages coming from the header component.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the view object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenHeader(that) {
  /**
   * Listens a message coming from the top-right-menu
   * and asking to switch the theme.
   *
   */
  that._app.$listen('kapp:from:app:menus:menu-top-right:to:app:views:switch:theme', () => {
    if (that._theme === 'light') {
      that.setTheme('dark');
    } else {
      that.setTheme('light');
    }
  });

  /**
   * Listens a message coming from the top-right-menu
   * and asking to switch the lang.
   *
   */
  that._app.$listen('kapp:from:app:menus:menu-top-right:to:app:views:set:lang', (payload) => {
    // Simulate a resquest from the sidemenu to load a new page. In fact, here,
    // the same page but in the new requested language.
    that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
      menu: `${payload.lang}:${that._page}`,
      source: 'menu-top-right',
      callback: ((/* err, resp */) => {
        //
      }),
    });
  });

  /**
   * Listens a message coming from the menu button.
   * Then, open or close the mobile menu.
   *
   */
  that._app.$listen('_shared:from:menubutton:to:app:header:views:toggle', (payload) => {
    if (payload.open) {
      that._app.menuOpen();
    } else {
      that._app.menuClose();
    }
  });

  /**
   * Listens a message coming froom a click on the logo
   * meaning to load the home page.
   *
   */
  that._app.$listen('kapp:from:app:header:logo:to:app:views:go:home', () => {
    if (that._sidemenu && that._sidemenu[that._lang]) {
      const menu = that._sidemenu[that._lang][0].children
        ? that._sidemenu[that._lang][0].children[0]
        : that._sidemenu[that._lang][0]
      ;

      // Simulate a request from the sidemenu to load the page:
      that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
        menu: `${menu.lang}:${menu.name}`,
        source: 'header logo',
      });
    }
  });
}

/**
 * Listens messages coming from the App Components.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the View object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listenApp(that) {
  /**
   * Listen aa message coming from the mobile menu
   * and asking to go home.
   *
   */
  that._app.$listen('kapp:from:app:menu:mobile:to:app:views:go:home', () => {
    if (that._sidemenu && that._sidemenu[that._lang]) {
      const menu = that._sidemenu[that._lang][0].children
        ? that._sidemenu[that._lang][0].children[0]
        : that._sidemenu[that._lang][0]
      ;

      // Simulate a request from the sidemenu to load the page:
      that._app.$emit('kapp:from:_shared:components:sidemenu:to:app:contents:views:load:page', {
        menu: `${menu.lang}:${menu.name}`,
        source: 'mobile menu logo',
      });
    }
  });
}

/**
 * listend messages from the web components.
 *
 * @function (arg1)
 * @private
 * @param {Object}        the view object,
 * @returns {Object}      returns this,
 * @since 0.0.0
 */
function _listen(that) {
  _listenApp(that);
  _listenHeader(that);
  _listenContents(that);
}


// -- Public Static Methods ------------------------------------------------

const Listen = {

  /**
   * Starts listening messages from web components.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the view object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  start(that) {
    log.trace('started listening Components events.');
    _init();
    _listen(that);
    return this;
  },

  /**
   * Stops doing requests to the server.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  stop() {
    return this;
  },
};


// -- Export
export default Listen;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
