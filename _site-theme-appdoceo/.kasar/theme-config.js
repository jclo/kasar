// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */


// -- Node modules
const pack = require('../../package.json');


// -- Local modules


// -- Local constants
const base       = '.'
    , libname    = 'KApp'
    , source     = `${base}/site/.kasar/theme/public/src/start.js`
    , exportname = 'KApp'
    ;


// -- Local variables


// -- Main

module.exports = {
  libname,

  // This is the entry javascript file for your library.
  ES6GLOB: '$__ES6GLOB',
  source,
  exportname,
  bundle: 'wapp',

  // This is the theme used to build your website:
  theme: {
    name: 'appdoceo',
    version: '2.0.0', // built from Kasar v^2.1.1"
  },

  // Where is the root of the project:
  base,

  // These are the files you want ot incorporate in your website and include at
  // the root level.
  files2inc: [
    `${base}/site/.kasar/theme/public/.htaccess`,
    `${base}/site/.kasar/theme/public/404.html`,
    `${base}/site/.kasar/theme/public/manifest.json`,
    `${base}/site/.kasar/theme/public/robots.txt`,
    `${base}/site/.kasar/theme/public/site.webmanifest`,
  ],

  index2inc: `${base}/site/.kasar/theme/public/index.html`,
  off2inc: `${base}/site/.kasar/theme/public/offline.html`,

  // The location of the sofware worker:
  sw: `${base}/site/.kasar/theme/public/sw.js`,

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
    js: null, // `${base}/node_modules/kiwi/_dist/js/kiwianalytics.min.js`,
    php: null, // `${base}/node_modules/kiwi/_dist/php/kiwi.php`,
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
  // img: `${base}/site/.kasar/theme/img`,

  // These are the project dependant Javascript scripts to include in you
  // website folder under the directory 'js'. All these files are concatened
  // and uglifyed in one file 'main.js'.
  pjs: [
    //
  ],

  // These are the project Javascript scripts that must not be bundled. They are
  // included in you website folder under the directory '_dist/js'.
  js: [
    //
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
    `${base}/site/.kasar/theme/public/src/_css/style.css`,
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
    xmlString: `
      <!-- Kiwi Analytics -->
      <script>
        // Kiwi Tracker
        (function(e,a,t,i,n,c,s){e.KiwiAnalyticsObject=n,e[n]=e[n]||function(){
        (e[n].q=e[n].q||[]).push(arguments)},e[n].l=new Date,c=a.createElement(t),
        s=a.getElementsByTagName(t)[0],c.async=1,c.src=i,s.parentNode.insertBefore(c,s)}
        (window,document,'script','/js/kiwianalytics.min.js','ma'));
        ma('create', '{{tracker:siteid}}');
        ma('send', 'pageview');
      </script>
    `,
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

  get license() {
    return ['/*! ****************************************************************************',
      ` * ${libname} v${pack.version}`,
      ' *',
      ` * ${pack.description}.`,
      ' * (you can download it from npm or github repositories)',
      ` * Copyright (c) ${(new Date()).getFullYear()} ${pack.author.name} <${pack.author.email}> (${pack.author.url}).`,
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' * Built from ES6Pakket v1.1.0 and from Pulsar v1.1.2.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
