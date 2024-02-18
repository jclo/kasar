/** ****************************************************************************
 *
 * Defines the App Page.
 *
 * app.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . render                      renders in the virtual DOM the body section,
 *
 *
 * Constructor:
 *  . App                         creates the App that manages the body section,
 *
 *
 * Private Static Methods:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . configure                   finalyzes the construction of the web page,
 *  . fillContent                 fills the content section of the web page,
 *
 *
 *
 * @namespace -
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle,
  import/no-extraneous-dependencies */

'use strict';

// -- Node modules
const RView = require('@mobilabs/rview');


// -- Local modules
const Header     = require('../header/main')
    , MobileMenu = require('../menus/menu-mobile/main')
    , Marketing  = require('../marketing/main')
    , Content    = require('../content/main')
    , Footer     = require('../footer/main')
    ;


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Renders in the virtual DOM the body of the web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns the web component object,
 * @since 0.0.0
 */
function render() {
  return RView.render({
    el: '#kasarapp',
    children: {
      '<Header />': Header,
      '<MobileMenu />': MobileMenu,
      '<Marketing />': Marketing,
      '<Content />': Content,
      '<Footer />': Footer,
    },
    template: `
      <div>
        <Header />
        <MobileMenu />
        <Marketing />
        <Content />
        <Footer />
      </div>
    `,
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Creates the App that manages the body of the web page in the vdom.
 *
 * @constructor ()
 * @public
 * @param {}                -,
 * @returns {Object}        returns the object,
 * @since 0.0.0
 */
function App() {
  /* eslint-disable-next-line no-use-before-define */
  const obj = Object.create(methods);
  const view = render();
  // Attaches all the 'web components' to this object.
  obj.header = view.$getChild('<Header />');
  obj.mobilemenu = view.$getChild('<MobileMenu />');
  obj.tlmenu = view.$getChild('<TLMenu />');
  obj.trmenu = view.$getChild('<TRMenu />');
  obj.mkt = view.$getChild('<Marketing />');
  obj.content = view.$getChild('<Content />');
  obj.footer = view.$getChild('<Footer />');
  obj.botmenu = view.$getChild('<BOTMenu />');
  return obj;
}


// -- Public Methods -----------------------------------------------------------

const methods = {

  /**
   * Finalyzes the construction of the web page.
   *
   * @method (arg1, arg2, arg3, arg4, arg5, [arg6])
   * @public
   * @param {Object}        data on the website,
   * @param {Object}        data on the docsite,
   * @param {string}        the active langage,
   * @param {String}        the active page,
   * @param {Object}        params specific to the active page,
   * @param {Object}        the menu,
   * @param {Array}         the doc menu,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  configure(website, docsite, lang, page, params, menu/* , docmenu */) {
    if (website && website[lang] && website[lang][page]) {
      // It means that it is a webpage.

      if (page === 'home') {
        this.tlmenu.set(website, menu, lang, page);
      }
      this.trmenu.set(website, menu, lang, page);
      this.mobilemenu.set(website, menu, lang, page);
    }

    this.header.set(website[lang].home);
    this.botmenu.set(website, menu, lang, page);
    this.footer.set(params.company.copyright);
    return this;
  },

  /**
   * Fills the content section of the web page.
   *
   * @method (arg1, arg2, arg3, arg4, arg5, arg6, [arg7])
   * @public
   * @param {Object}        data on the website,
   * @param {Object}        data on the docsite,
   * @param {string}        the active langage,
   * @param {String}        the active page,
   * @param {Object}        params specific to the active page,
   * @param {String}        the content to insert,
   * @param {Array}         the documentation menu,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fillContent(website, docsite, lang, page, params, content/* , docmenu */) {
    if (website && website[lang] && website[lang][page]) {
      // It means that it is a webpage.

      if (page === 'home') {
        // this.mkt.fillFront(content);
        this.content.fill(content);
        return this;
      }
      this.content.fill(content);
      return this;
    }

    return this;
  },
};


// -- Export
module.exports = App;
