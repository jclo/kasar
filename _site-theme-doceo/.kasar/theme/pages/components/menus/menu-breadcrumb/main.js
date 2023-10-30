/** ****************************************************************************
 *
 * Defines the breadcrumb section of the web page.
 *
 * main.js extends the RView object. In other words, it creates
 * an object that inherits from the RView object.
 *
 * Private Functions:
 *  . _getMenu                    returns the breadcrumb menu,
 *  . _getContent                 returns the breadcrumb structure,
 *
 *
 * Overwritten Public Methods:
 *  . render                      returns the XMLString of the component,
 *
 *
 * Specific Public Methods:
 *  . fill                        fills the content,
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
const RView = require('@mobilabs/rview')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the breadcrumb menu.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the dooc menu,
 * @returns {XMLString}     returns the menu structure,
 * @since 0.0.0
 */
function _getMenu(docmenu) {
  let previous
    , match
    ;

  // search for the active menu:
  for (let i = 0; i < docmenu.length; i++) {
    if (!docmenu[i].children) {
      if (docmenu[i].tag === 'youarehere') {
        previous = null;
        match = { text: docmenu[i].text, link: docmenu[i].link };
        break;
      }
    } else {
      for (let j = 0; j < docmenu[i].children.length; j++) {
        if (docmenu[i].children[j].tag === 'youarehere') {
          previous = { text: docmenu[i].text, link: docmenu[i].children[0].link };
          match = { text: docmenu[i].children[j].text, link: docmenu[i].children[j].link };
          break;
        }
      }
    }
  }

  if (previous) {
    return `
      <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
      <li class="pure-menu-item">
        <a class="pure-menu-link" href="${previous.link}">${previous.text}</a>
      </li>
      <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
      <li class="pure-menu-item pure-menu-disabled">
        <a class="pure-menu-link" href="${match.link}">${match.text}</a>
      </li>
    `;
  }

  return `
    <li class="pure-menu-item"><span class="breadcrumb-icons breadcrumb-right-arrow"></span></li>
    <li class="pure-menu-item pure-menu-disabled">
      <a class="pure-menu-link" href="${match.link}">${match.text}</a>
    </li>
  `;
}

/**
 * Returns the breadcrumb structure.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the doc menu,
 * @param {String}          the home link,
 * @returns {XMLString}     returns the menu structure,
 * @since 0.0.0
 */
function _getContent(docmenu, homelink) {
  return `
    <div class="breadcrumb menu pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a class="nav pure-menu-link" href="${homelink}"><i class="fa-solid fa-house"></i></a>
            ${_getMenu(docmenu)}
        </li>
      </ul>
    </div>
  `;
}


// -- Public -------------------------------------------------------------------

const Content = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

  /**
   * Returns the XMLString of the component.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the XMLString of the component,
   * @since 0.0.0
   */
  render(state/* , props */) {
    return `
      <div class="breadcrumb menu pure-menu pure-menu-horizontal">
        ${state.content || '<!-- empty -->'}
      </div><!-- /.bottom breadcrumb -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Fills the content.
   *
   * @method (arg1)
   * @public
   * @param {XMLString}     the content of the page,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  fill(docmenu, homelink) {
    this.$setState({
      content: _getContent(docmenu, homelink),
    });
    return this;
  },
});


// -- Export
module.exports = Content;
