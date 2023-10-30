/* ****************************************************************************
 * This script manages color themes.
 *
 * ************************************************************************** */
// ESLint declarations
/* global */
/* eslint one-var: 0, strict: ["error", "function"], semi-style: 0
  no-console: 0 */
(function() {
  'use strict';

  const ICON_TOP_ID  = 'switchthemetopmenu'
      , ICON_SIDE_ID = 'switchthemesidemenu'
      , CSS_ID       = '#highlight-color-theme'
      , CSS_DARK     = 'atom-one-dark.min.css'
      , CSS_LIGHT    = 'atom-one-light.min.css'
      ;


  // -- Private Functions ------------------------------------------------------

  /**
   * Sets highlight css file.
   *
   */
  function setHighlight() {
    const css = document.querySelector(CSS_ID);

    if (css) {
      const apath = css.getAttribute('href').split('/');

      if (apath && Array.isArray(apath)) {
        apath[apath.length - 1] = localStorage.getItem('theme') === 'dark'
          ? CSS_DARK
          : CSS_LIGHT
        ;
        const np = apath.join('/');
        css.setAttribute('href', np);
      }
    }
  }

  /**
   * Toogle the theme.
   *
   */
  function toogleTheme() {
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      return;
    }

    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }


  // -- Main -------------------------------------------------------------------

  // Initialize the default theme in localstorage if not:
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
  }

  // Retrieve and apply the theme to the loaded page:
  const storedTheme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', storedTheme);

  // highlight.js doesn't provide a mechanism to switch from
  // a theme to another. So, we chose the option to update the
  // highlight css file depending on the chosen theme.
  // But, before updating the css, we have to wait that the page
  // is loaded.
  window.addEventListener('load', () => {
    const top = document.querySelector(`#${ICON_TOP_ID}`);
    const side = document.querySelector(`#${ICON_SIDE_ID}`);
    setHighlight();

    if (top) {
      top.addEventListener('click', (e) => {
        e.preventDefault();
        toogleTheme();
        setHighlight();
      });
    }

    if (side) {
      side.addEventListener('click', (e) => {
        e.preventDefault();
        toogleTheme();
        setHighlight();
      });
    }
  });
}());


// -- oOo --
