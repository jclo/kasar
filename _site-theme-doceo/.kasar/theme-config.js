// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules

// -- Local constants
const base = '.';

// -- Local variables


// -- Main

module.exports = {

  // This is the theme used to build your website:
  theme: {
    name: 'doceo',
    version: '2.0.0', // built from Kasar v^2.1.0
  },

  // Where is the root of the project:
  base,

  // These are the files you want ot incorporate in your website and include at
  // the root level.
  files2inc: [
    `${base}/site/tobuildweb/.htaccess`,
    `${base}/site/tobuildweb/index.html`,
    `${base}/site/tobuildweb/maintenance.html`,
    `${base}/site/tobuildweb/robot.txt`,
    `${base}/site/tobuildweb/site.webmanifest`,
    `${base}/site/tobuildweb/manifest.json`,
  ],

  // The location of the sofware worker:
  sw: `${base}/site/sw.js`,

  // These are the vendor Javascript scripts to include in you website folder
  // under the directory 'vendor/libs'. These files are copied as is or bundled
  // together on one file depending on the configuration of the task script
  // 'skeleton.js'.
  libs: {
    minified: [
      `${base}/site/vendor/highlight/highlight.min.js`,
    ],
    tominify: [
      // '',
    ],
  },

  // These are the tracker script files. The javascript file must be included
  // in the folder './js' and the php file in the folder './php'.
  tracker: {
    // js: ``,
    // php: ``,
  },

  // These are the PHP files to include in your website folder.
  php: [
    `${base}/site/php/.htaccess`,
  ],

  // These are the files from 'HTML5 Boilerplate' to include in the project.
  html5: {
    modernizr: `${base}/node_modules/html5-boilerplate/dist/js/vendor/modernizr-3.11.2.min.js`,
    normalize: `${base}/node_modules/html5-boilerplate/dist/css/normalize.css`,
  },

  // These are the fonts to include in your website folder under the
  // directory 'fonts'.
  fonts: {
    remote: null,
    local: [
      `${base}/node_modules/@fortawesome/fontawesome-free`,
      `${base}/site/vendor/fonts/montserrat/Montserrat`,
    ],
  },

  // These are the images to include in your website folder under the
  // directory 'img'.
  img: `${base}/site/.kasar/theme/img`,

  // These are the project dependant Javascript scripts to include in you
  // website folder under the directory 'js'. All these files are concatened
  // and uglifyed in one file 'main.js'.
  pjs: [
    `${base}/site/.kasar/theme/js/strict.js`,
    `${base}/site/.kasar/theme/js/shared.js`,
    `${base}/site/.kasar/theme/js/picoq.js`,
    `${base}/site/.kasar/theme/js/docmenu.js`,
    `${base}/site/.kasar/theme/js/header.js`,
    `${base}/site/.kasar/theme/js/mobilemenu.js`,
    `${base}/site/.kasar/theme/js/smoothscrolling.js`,
    `${base}/site/js/extra.js`,
    `${base}/site/.kasar/theme/js/main.js`,
  ],

  // These are the project Javascript scripts that must not be bundled. They are
  // included in you website folder under the directory '_dist/js'.
  js: [
    `${base}/site/.kasar/theme/js/colortheme.js`,
  ],

  // These are all the css files that are required by your website. Both project
  // and vendors. All these CSS files are bundled together in one minified file
  // 'style.css' that is included in the folder 'css'.
  // Nota:
  // pure.css must be the first file in the bundle as it includes normalize.css.
  css: [
    // From vendor:
    `${base}/node_modules/purecss/build/pure.css`,
    `${base}/node_modules/purecss/build/grids-responsive.css`,
    `${base}/node_modules/@fortawesome/fontawesome-free/css/all.css`,
    // From theme:
    `${base}/site/.kasar/theme/pages/components/_css/style.css`,
    // For customizing:
    `${base}/site/styles/override.css`,
  ],

  // These css files are copied to './site/_dist/css' such as.
  // Be carefull, if you change them, you need to update their references
  // in '.kasar/theme/colortheme.js' script.
  csshighlight: [
    `${base}/site/vendor/highlight/styles/atom-one-dark.min.css`,
    `${base}/site/vendor/highlight/styles/atom-one-light.min.css`,
  ],

  // These are the javascript trackers to insert at the bottom of the page. if
  // you don't want to insert a tracker, make the associated 'siteid' undefined
  // or null in 'site/config.js'.
  GA4: {
    xmlString: `
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id={{tracker:siteid}}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '{{tracker:siteid}}');
      </script>
    `,
  },

  KA: {
    xmlString: null,
  },

  Axeptio: {
    xmlString: `
      <!-- Axeptio Tracking Approval -->
      <script>
        // Axeptio Tracker
        window.axeptioSettings = {
          clientId: "{{tracker:siteid}}",
        };

        (function(d, s) {
          var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
          e.async = true; e.src = "//static.axept.io/sdk.js";
          t.parentNode.insertBefore(e, t);
        })(document, "script");
      </script>
    `,
  },
};
