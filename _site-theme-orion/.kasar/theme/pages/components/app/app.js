// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules
const Header    = require('../header/main')
    , SideMenu  = require('../sidemenu/sidemenu')
    , Content   = require('../content/main')
    , Footer    = require('../footer/main')
    , config    = require('../../../../../config')
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
  /**
   * Renders the web component.
   */
  render() {
    this.children = {
      '<Header />': Header,
      '<SideMenu />': SideMenu,
      '<Content />': Content,
      '<Footer />': Footer,
    };

    return `
      <div>
        <Header />
        <SideMenu />
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
  obj.trmenu = view.$getChild('<TRMenu />');
  obj.mkt = view.$getChild('<Marketing />');
  obj.sidemenu = view.$getChild('<SideMenu />');
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
      case 'Home':
        this.content.setFront();
        this.tlmenu
          .setTitle(config.menu.top.left.title)
          .setMenu(config.menu.top.left.menu)
        ;
        break;

      default:
        this.content.setInternal();
        this.tlmenu.setTitle(config.menu.top.left.title);
        break;
    }
    this.trmenu.set(config.menu.top.right);
    this.botmenu.set(config.menu.bottom);
    this.footer.set(config.company.copyright);
    return this;
  },

  /**
   * Fills the content section of the web page.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {String}        the name of the web page,
   * @param {String}        the content to insert,
   * @param {Object}        the sidemenu to insert,
   * @param {Object}        the menu for devices with a small screen,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fillContent(page, content, sidemenu, mobile) {
    const levels = sidemenu ? 'h2' : 'h1, h2, h3, h4, h5';

    this.content.fill(content);
    const submenu = this.content.getLocalMenu(levels);
    this.content.fillMenu(sidemenu, submenu);
    this.sidemenu.fill(mobile, sidemenu, submenu);
    return this;
  },
};


// -- Export
module.exports = App;
