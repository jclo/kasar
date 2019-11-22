// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules

// -- Local constants
const base = '../..';

// -- Local variables


// -- Main

module.exports = {

  // This is the theme used to build your website:
  theme: {
    name: 'Orion',
    version: '{{theme:version}}',
  },

  // Where is the root of the project:
  base,

  // These are the files you want ot incorporate in your website and include at
  // the root level.
  files2inc: [
    `${base}/site/tobuildweb/.htaccess`,
    `${base}/site/tobuildweb/maintenance.html`,
    `${base}/site/tobuildweb/robot.txt`,
  ],

  // These are the vendor Javascript scripts that must not be bundled. They are
  // included in you website folder under the directory 'vendor/libs'.
  js: [
    // '',
  ],

  // These are the vendor Javascript scripts to include in you website folder
  // under the directory 'vendor/libs'. These files are copied as is or bundled
  // together on one file depending on the configuration of the task script
  // 'skeleton.js'.
  libs: {
    minified: [
      `${base}/node_modules/jquery/dist/jquery.min.js`,
      `${base}/node_modules/jquery/dist/jquery.min.map`,
      `${base}/node_modules/jquery.easing/jquery.easing.min.js`,
      // `${base}/site/vendor/highlight/highlight.pack.js`,
    ],
    tominify: [
      // '',
    ],
  },

  // These are the tracker script files. The javascript file must be included
  // in the folder './js' and the php file in the folder './php'.
  // theme-config-plus:
  tracker: {
    // js: ``,
    // php: ``,
  },

  // These are the PHP files to include in your website folder.
  //
  php: [
    `${base}/site/php/.htaccess`,
  ],

  // These are the files from 'HTML5 Boilerplate' to include in the project.
  html5: {
    modernizr: `${base}/node_modules/html5-boilerplate/dist/js/vendor/modernizr-3.8.0.min.js`,
    normalize: `${base}/node_modules/html5-boilerplate/dist/css/normalize.css`,
  },

  // These are the fonts to include in your website folder under the
  // directory 'fonts'.
  fonts: {
    remote: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,600',
    local: [
      `${base}/node_modules/font-awesome/fonts/*`,
    ],
  },

  // These are the images to include in your website folder under the
  // directory 'img'.
  img: `${base}/site/.kasar/theme/img/**/*`,

  // These are the project dependant Javascript scripts to include in you
  // website folder under the directory 'js'. All these files are concatened
  // and uglifyed in one file 'main.js'.
  pjs: [
    `${base}/site/.kasar/theme/js/alertbrowser.js`,
    `${base}/site/.kasar/theme/js/menus.js`,
    `${base}/site/.kasar/theme/js/sidemenu.js`,
    `${base}/site/.kasar/theme/js/smoothscrolling.js`,
    `${base}/site/.kasar/theme/js/main.js`,
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
    `${base}/node_modules/font-awesome/css/font-awesome.css`,
    // `${base}/site/vendor/highlight/styles/default.css`,
    // From theme:
    `${base}/site/.kasar/theme/pages/components/app/app.css`,
    `${base}/site/.kasar/theme/pages/components/app/pureplus-callout.css`,
    `${base}/site/.kasar/theme/pages/components/header/header.css`,
    `${base}/site/.kasar/theme/pages/components/menus/menus.css`,
    `${base}/site/.kasar/theme/pages/components/menus/contentmenu.css`,
    `${base}/site/.kasar/theme/pages/components/sidemenu/sidemenu.css`,
    `${base}/site/.kasar/theme/pages/components/sidemenu/menu-button.css`,
    `${base}/site/.kasar/theme/pages/components/content/marketing.css`,
    `${base}/site/.kasar/theme/pages/components/content/content.css`,
    `${base}/site/.kasar/theme/pages/components/content/doc.css`,
    `${base}/site/.kasar/theme/pages/components/content/extra.css`,
    `${base}/site/.kasar/theme/pages/components/footer/footer.css`,
    `${base}/site/.kasar/theme/pages/components/404/404.css`,
    // For customizing:
    `${base}/site/styles/override.css`,
  ],

  // These are the javascript trackers to insert at the bottom of the page. if
  // you don't want to insert a tracker, make the associated 'siteid' undefined
  // or null in 'site/config.js'.
  GA: `
    // Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '{{tracker:siteid}}', 'auto');
    ga('send', 'pageview');
  `,
};
