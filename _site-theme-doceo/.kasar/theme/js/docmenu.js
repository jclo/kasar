/* ****************************************************************************
 * This script manages the mobilemenu and the mobilemenu button.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ, _moveTo, GLOBAL_OFFSET */
/* eslint-disable strict, no-underscore-dangle */
(function($) {
  //

  $().DOMready(() => {
    // -- Private Function(s) --------------------------------------------------

    /**
     * Activate the selected right menu.
     */
    function _selectClickedRightAnchor(target) {
      // remove the 'pure-menu-active' from the previous
      // selected menu and add it to the target.
      const el = target.parentNode.parentNode;
      if (el) {
        const ela = el.getElementsByClassName('pure-menu-active')[0];
        if (ela) {
          ela.classList.remove('pure-menu-active');
        }
      }
      target.parentNode.classList.add('pure-menu-active');
    }

    /**
     * Smoothly move to the selected anchor.
     */
    function _selectClickedAnchor(e) {
      // Do nothing if the user clicks on the already selected
      // menu item:
      if (e.target.parentNode.classList.contains('pure-menu-active')) {
        return;
      }

      // Select the collection in which the menu item is selected,
      // desactivate the previous item and select the clicked item:
      const node = $('.doc-content-nav-sidebar .youarehere ul')[0].children;
      e.preventDefault();
      for (let i = 0; i < node.length; i++) {
        node[i].classList.remove('pure-menu-active');
      }
      e.target.parentNode.classList.add('pure-menu-active');

      // Search for the position of the selected subchapter and
      // smoothly move to this position:
      const dest = $(e.target.getAttribute('href'))[0];
      // _moveTo(window.scrollY, dest.getBoundingClientRect().top - OFFSET);
      _moveTo(window.scrollY, dest.offsetTop - GLOBAL_OFFSET);
    }

    /**
     * Opens or closes the clicked left side menu item.
     */
    function _setActiveOrInactive(target) {
      if (target.parentNode.classList.contains('pure-menu-active')) {
        target.parentNode.classList.remove('pure-menu-active');
        return;
      }

      $('.doc-content-nav-sidebar .pure-menu-has-children.pure-menu-active')
        .removeClass('pure-menu-active');
      target.parentNode.classList.add('pure-menu-active');
    }


    // -- Main -----------------------------------------------------------------

    /**
     * Listens for a click on the titles of the left side doc menu.
     */
    $('.doc-content-nav-sidebar').on('click', (e) => {
      if (e.target.classList.contains('pure-menu-link')
          && e.target.parentNode.classList.contains('pure-menu-has-children')) {
        _setActiveOrInactive(e.target);
      }
    });

    /**
     * Listens for a click on sub menu of the left side doc menu.
     */
    $('.doc-content-nav-sidebar').on('click', (e) => {
      if (e.target.classList.contains('pure-menu-link')
          && e.target.parentNode.classList.contains('pure-menu-item')
          && e.target.parentNode.parentNode.classList.contains('pure-menu-children')) {
        _selectClickedAnchor(e);
      }
    });

    /**
     * Listens for a click on the right submenu.
     */
    $('.content.doc .row .rightcol .menu').on('click', (e) => {
      _selectClickedRightAnchor(e.target);
    });
  });
}(PicoQ));

/* eslint-enable strict, no-underscore-dangle */
