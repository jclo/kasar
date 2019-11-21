// ESLint declarations
/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0 */

'use strict';

// -- Node modules
const View = require('@mobilabs/view')
    ;


// -- Local modules


// -- Local constants


// -- Local variables


// -- Private Function(s) ------------------------------------------------------

/**
 * Defines the content structure of the front web page.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the content HTML structure,
 * @since 0.0.0
 */
function getFront() {
  return `
    <div class="front">
      <!-- empty -->
    </div>
  `;
}

/**
 * Defines the content structure of the internal web pages.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns the content HTML structure,
 * @since 0.0.0
 */
function getInternal() {
  return `
  <div class="internal container">
    <div class="menu pure-menu pure-menu-horizontal">
      <!-- menu here -->
    </div>
    <!-- gitbon here -->
    <!-- Grid -->
    <div class="pure-g">
      <!-- Left Column -->
      <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-6-24">
        <div class="column left">
          <div class="menu pure-menu custom-restricted-width">
            <ul class="pure-menu-list">
              <!-- menu here -->
            </ul>
          </div><!-- /.sidemenu -->
        </div>
      </div><!-- /.left column -->

      <!-- Main section -->
      <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-18-24">
        <div class="column right">
          <noscript>
            Your browser does not support JavaScript. It is required to load pages!
          </noscript>
            <!-- content here -->
          </div>
      </div><!-- /.right column -->
    </div><!-- /.grid -->
  </div><!-- /.internal -->
  `;
}


// -- Public Function(s) -------------------------------------------------------

/**
 * Defines the web component.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
const Content = View.Component({

  /**
   * Inserts the content structure of the frontpage
   * inside the DOM.
   */
  setFront() {
    this.$().html(getFront());
    return this;
  },

  /**
   * Inserts the content structure of the internal pages
   * inside the DOM.
   */
  setInternal() {
    this.$().html(getInternal());
    return this;
  },

  /**
   * Fills the content.
   */
  fill(content) {
    if (this.$('.front')[0]) {
      this.$('.front').html(content);
      return this;
    }
    this.$('.column.right').html(content);
    return this;
  },

  /**
   * Fills the menu.
   */
  fillMenu(sidemenu, submenu) {
    if (!this.$('.front')[0]) {
      if (sidemenu) {
        // Add the sidemenu and insert the submenu:
        const node = this.$('ul');
        for (let i = 0; i < sidemenu.length; i++) {
          let classes = sidemenu[i].tag ? sidemenu[i].tag : '';
          classes += ' pure-menu-item  pure-menu-has-children';
          classes += sidemenu[i].onlyExpanded ? ' pure-menu-only-expanded' : '';

          node
            .append('li')
            .attr('class', classes)
            .append('a')
            .attr('class', 'pure-menu-link')
            .attr('href', sidemenu[i].link ? sidemenu[i].link : '#')
            .appendTextChild(sidemenu[i].text)
            .parent()
            .append('ul')
            .attr('class', 'pure-menu-children')
          ;

          // Append childs
          for (let j = 0; j < sidemenu[i].children.length; j++) {
            const child = sidemenu[i].children[j];
            node
              .append('li')
              .attr('class', `${child.tag} pure-menu-item`)
              .append('a')
              .attr('class', 'pure-menu-link')
              .attr('href', child.link)
              .attr('target', child.target ? child.target : '_self')
              .appendTextChild(child.text)
              .parent()
              .parent()
            ;
          }
          node.parent();
        }

        // Appends the submenu.
        const childnode = this.$('.youarehere');
        childnode
          .parent()
          .parent()
          .addClass('pure-menu-active')
          .select('.youarehere')
          .addClass('pure-menu-active')
          .append('ul')
          .attr('class', 'pure-menu-item')
        ;

        for (let i = 0; i < submenu.length; i++) {
          const child = submenu[i];
          childnode
            .append('li')
            .attr('class', `${child.tag} pure-menu-item`)
            .append('a')
            .attr('class', 'pure-menu-link')
            .attr('href', child.link ? child.link : '#')
            .attr('target', child.target ? child.target : '_self')
            .appendTextChild(child.text)
          ;
        }
      } else {
        // Add the localmenu only:
        const subnode = this.$('ul');
        for (let i = 0; i < submenu.length; i++) {
          const child = submenu[i];
          subnode
            .append('li')
            .attr('class', `${child.tag} pure-menu-item`)
            .append('a')
            .attr('class', 'pure-menu-link')
            .attr('href', child.link ? child.link : '#')
            .appendTextChild(child.text)
          ;
        }
      }
    }
    return this;
  },

  /**
   * Returns a menu built from the structure of the page.
   */
  getLocalMenu(levels) {
    const nodelist = this.$()[0].querySelectorAll(levels);
    const menu = [];
    nodelist.forEach((el) => {
      menu.push({
        tag: el.tagName.toLowerCase(),
        text: el.textContent,
        link: el.attributes.id ? `#${el.attributes.id.value}` : null,
      });
    });
    return menu;
  },

  /**
   * Renders the web component.
   */
  render() {
    return `
      <div class="content">
        <!-- empty -->
      </div>
    `;
  },
});


// -- Export
module.exports = Content;
