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

  const LOGO_ID          = 'logo-theme-dark-light'
      , LOGO_THEME_LIGHT = 'logo-theme-light'
      , LOGO_THEME_DARK  = 'logo-theme-dark'
      , ICON_TOP_ID      = 'switchthemetopmenu'
      , ICON_SIDE_ID     = 'switchthemesidemenu'
      , ICON_LIGHT_SUN   = 'theme-color-icons-light-sun'
      , ICON_DARK_SUN    = 'theme-color-icons-dark-sun'
      , ICON_LIGHT_MOON  = 'theme-color-icons-light-moon'
      , ICON_DARK_MOON   = 'theme-color-icons-dark-moon'
      , CSS_ID           = '#highlight-color-theme'
      , CSS_DARK         = 'atom-one-dark.min.css'
      , CSS_LIGHT        = 'atom-one-light.min.css'
      , CALLOUT          = '.pureplus-callout-note'
      , CALLOUT_DARK     = 'pureplus-callout-note-dark'
      ;


  // -- Private Functions ------------------------------------------------------

  /**
   * Sets Callout theme.
   *
   */
  function setThemeCallout() {
    const callout = document.querySelectorAll(CALLOUT);
    const dark = localStorage.getItem('theme') === 'dark';

    callout.forEach((item) => {
      if (dark) {
        item.classList.add(CALLOUT_DARK);
        return;
      }
      item.classList.remove(CALLOUT_DARK);
    });
  }

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
   * Sets the logo color for a given theme.
   *
   */
  function setThemeLogo() {
    const logo = document.querySelector(`#${LOGO_ID}`);

    if (logo) {
      logo.classList.remove(LOGO_THEME_LIGHT);
      logo.classList.remove(LOGO_THEME_DARK);
      logo.classList.add(localStorage.getItem('theme') === 'light' ? LOGO_THEME_LIGHT : LOGO_THEME_DARK);
    }
  }

  /**
   * Sets the theme icon.
   *
   */
  function setThemeIcon(target) {
    if (target && (target.id === ICON_TOP_ID || target.id === ICON_SIDE_ID)) {
      target.classList.remove(ICON_LIGHT_SUN);
      target.classList.remove(ICON_DARK_SUN);
      target.classList.remove(ICON_LIGHT_MOON);
      target.classList.remove(ICON_DARK_MOON);

      const dark = target.id === ICON_TOP_ID ? ICON_LIGHT_MOON : ICON_LIGHT_MOON;
      const light = target.id === ICON_TOP_ID ? ICON_DARK_SUN : ICON_LIGHT_SUN;
      target.classList.add(localStorage.getItem('theme') === 'light' ? light : dark);
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
    setThemeIcon(top);
    setThemeIcon(side);
    setThemeLogo();
    setHighlight();
    setThemeCallout();

    if (top) {
      top.addEventListener('click', (e) => {
        e.preventDefault();
        toogleTheme();
        setThemeIcon(e.target);
        setThemeLogo();
        setHighlight();
        setThemeCallout();
      });
    }

    if (side) {
      side.addEventListener('click', (e) => {
        e.preventDefault();
        toogleTheme();
        setThemeIcon(e.target);
        setThemeLogo();
        setHighlight();
        setThemeCallout();
      });
    }
  });
}());


// -- oOo --
