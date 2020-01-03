// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules
const Header = require('../header/main')
    , Marketing = require('../marketing/main')
    , Content = require('../content/main')
    , Footer = require('../footer/main')
    , config = require('../../../../../config')
    ;


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Defines the body structure of the web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const Body = View.Component({
  // Recommended by HTML5 boilerplate 7.1.0.
  IE: `
  <!--[if IE]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->
  `,

  /**
   * Renders the web component.
   */
  render() {
    this.children = {
      '<Header />': Header,
      '<Marketing />': Marketing,
      '<Content />': Content,
      '<Footer />': Footer,
    };

    return `
      <div>
        ${this.IE}
        <Header />
        <Marketing />
        <Content />
        <Footer />
      </div>
    `;
  },
});

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
  return View.render({
    el: document.body,
    children: { '<Body />': Body },
    template: `
      <div>
        <Body />
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
  obj.body = view.$getChild('<Body />');
  obj.header = view.$getChild('<Header />');
  obj.tlmenu = view.$getChild('<TLMenu />');
  obj.topmenu = view.$getChild('<TRMenu />');
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
   * @method (arg1)
   * @public
   * @param {String}        the name of the web page,
   * @returns {Object}      returns the object,
   * @since 0.0.0
   */
  configure(page) {
    switch (page) {
      case 'home':
        this.mkt.setFront();
        this.content.setFront();
        break;

      default:
        this.mkt.setInternal();
        this.content.setInternal();
        break;
    }
    this.tlmenu.set(config.company.name, config.basepath);
    this.topmenu.set(`${config.basepath}contact.html`);
    this.footer.set(config.company.copyright);
    return this;
  },

  /**
   * Fills the content section of the web page.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the web page,
   * @param {String}        the content to insert,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fillContent(page, content) {
    switch (page) {
      case 'home':
        this.mkt.fillFrontContent(content);
        break;

      default:
        this.content.fill(content);
    }
    return this;
  },
};


// -- Export
module.exports = App;
