/* ****************************************************************************
 * This script manages the mobilemenu and the mobilemenu button.
 *
 * ************************************************************************** */
// ESLint declarations
/* global PicoQ */
/* eslint-disable strict, one-var, semi-style, no-underscore-dangle */
(function($) {
  //

  $().DOMready(() => {
    const DELAY = 0.5 * 1000;


    // -- Private Function(s) --------------------------------------------------

    /**
     * Activates doc submenu.
     */
    function _activateDocMenu(target) {
      if (target.parentNode.classList.contains('pure-menu-active')) {
        target.parentNode.classList.remove('pure-menu-active');
        return;
      }

      const node = target.parentNode.parentNode.children;
      for (let i = 0; i < node.length; i++) {
        node[i].classList.remove('pure-menu-active');
      }
      target.parentNode.classList.add('pure-menu-active');
    }

    /**
     * Opens the mobilemenu.
     */
    function _open() {
      $('body').addClass('freeze');
      $('.mobilemenu-icon').addClass('mobilemenu-icon-clicked');
      $('.mobilemenu').addClass('mobilemenu-open');
      window.scrollTo(0, 0);
    }

    /**
     * Closes the mobilemenu.
     */
    function _close() {
      $('.mobilemenu-icon').removeClass('mobilemenu-icon-clicked');
      $('.mobilemenu').removeClass('mobilemenu-open');
      $('body').removeClass('freeze');
    }

    /**
     * Closes the menu then waits and then loads the selected page.
     */
    function _closeAndLoad(e) {
      if (e.target.classList.contains('pure-menu-link')
          || e.target.classList.contains('mobilemenu-logo-link')) {
        e.preventDefault();
        _close();

        if (e.target.classList.contains('pure-menu-link')) {
          const node = e.target.parentNode.parentNode.children;
          for (let i = 0; i < node.length; i++) {
            node[i].classList.remove('pure-menu-active');
          }
          e.target.parentNode.classList.add('pure-menu-active');
        }

        // slightly delay the load of the new page to let the side menu
        // to be closed:
        setTimeout(() => {
          const href = e.target.classList.contains('mobilemenu-logo-link')
            ? e.target.parentNode.getAttribute('href')
            : e.target.getAttribute('href');
          window.location.href = href;
        }, DELAY);
      }
    }

    /**
     * Activates the active menu on load.
     */
    function _activate() {
      const path   = document.location.pathname
          , target = $(`.mobilemenu .pure-menu-list a[href="${path}"]`)[0]
          ;

      if (target) {
        target.parentNode.classList.add('pure-menu-active');
      } else {
        $('.mobilemenu .pure-menu-list')[0]
          .firstElementChild
          .classList
          .add('pure-menu-active')
        ;
      }
    }

    // -- Main -----------------------------------------------------------------

    /**
     * Listens for a click on the mobilemenu button.
     */
    $('.mobilemenu-button').on('click', () => {
      if ($('.mobilemenu-icon').hasClass('mobilemenu-icon-clicked')) {
        _close();
      } else {
        _open();
      }
    });

    /**
     * Listens for a click on the mobilemenu logo or menu.
     */
    $('.mobilemenu').on('click', (e) => {
      if (e.target.classList.contains('pure-menu-link')
        && e.target.parentNode.classList.contains('pure-menu-has-children')
        && e.target.parentNode.parentNode.classList.contains('doc-mobile-nav-sidebar-menu')
      ) {
        _activateDocMenu(e.target);
        return;
      }

      _closeAndLoad(e);
    });

    /**
     * Activates the active menu on load.
     */
    _activate();
  });
}(PicoQ));

/* eslint-enable strict, one-var, semi-style, no-underscore-dangle */
