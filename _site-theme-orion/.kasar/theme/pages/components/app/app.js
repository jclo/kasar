// ESLint declarations
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */

'use strict';

// -- Node modules
const RView = require('@mobilabs/rview')
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
 * Minifies the HTML body.
 *
 * Nota:
 * The two most effective operations are the suppression of the comments and
 * the suppression of the leading blank spaces preceeding a tag.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-multi-spaces */
function _minify() {
  let xml = document.body.innerHTML;

  xml = xml.replace(/<!--(.*?)-->/g, '')    // remove comments
    .replace(/\n\s+</g, '\n<')              // remove leading spaces before a tag,
    .replace(/\n<\/div>/g, '</div>')        // remove unwanted `\n`,
    .replace(/\n<\/ul>/g, '</ul>')          // -
    .replace(/\n<\/li>/g, '</li>')          // -
    .replace(/\n<\/a>/g, '</a>')            // -
  ;

  document.body.innerHTML = xml;
}
/* eslint-enable no-multi-spaces */

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
      '<SideMenu />': SideMenu,
      '<Content />': Content,
      '<Footer />': Footer,
    },
    template: `
      <div>
        <Header />
        <SideMenu />
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
  obj.tlmenu = view.$getChild('<TLMenu />');
  obj.trmenu = view.$getChild('<TRMenu />');
  // obj.mkt = view.$getChild('<Marketing />');
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
      case 'home':
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
    let submenu;

    switch (page) {
      case 'Home':
      case 'home':
        this.content.fillFront(content);
        break;

      default:
        submenu = this.content.getSubMenu(content, levels);
        this.content.fillInternal(content, sidemenu, submenu);
        break;
    }
    this.sidemenu.fill(mobile, sidemenu, submenu);

    // Minify the body
    _minify();

    return this;
  },
};


// -- Export
module.exports = App;
