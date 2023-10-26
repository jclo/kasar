// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules
const themeconfig = require('./.kasar/theme-config')
    , docu        = require('./docsidemenu')
    ;


// -- Local constants
const FR          = 'fr'
    , EN          = 'en'
    , { base }    = themeconfig
    , { version } = require('../package.json')
    , basepath    = '/'
    ;


// -- Local variables


// -- Main

module.exports = {

  // This is where is stored the static web site:
  basedist: `${base}/site/_dist`,
  dist: `${base}/site/_dist${basepath}`,

  // Build a dev or prod version:
  // (replace 'dev' by 'prod' to build a production version)
  webtype: 'dev',

  // This is the base path of your website:
  basepath,

  // This is your website's name and version:
  product: {
    name: 'xyz',
    version,
  },

  // These are the parameters that define your company:
  company: {
    name: 'MyCompany',
    description: 'Company slogan ...',
    street: '1, avenue de France',
    city: '75001 Paris',
    country: 'France',
    phone: '+33 1 01 01 01 01',
    fax: '+33 1 01 01 01 02',
    email: 'contact(at)mycompany.com',
    url: {
      protocol: 'https',
      domain: 'www.mycompany.com',
    },
    // Nota:
    // you should not replace © by &copy; because JSDOM convert ';' to &amp. So,
    // the output becomes '&amp;copy;'
    copyright: 'Copyright © {{copyright:year}} MyCompany. All rights reserved.',
    credits: {
      name: 'mycompany',
      link: 'https://www.mycompany.com',
    },
  },

  // These are the tags to include on your pages to help google to identify
  // the owner of the website. 'google.verify.v1' is a tag to include in the
  // head section of your pages. It is provided by Google Analytics.
  // 'google.verify.v2' is a file to include at the root level of your website.
  // It is now the preferred way for Google identification. So, prefer This
  // second option to 'google.verify.v1'.
  google: {
    verify: {
      v1: '-',
      // v2: `${base}/site/googlexxxx.html`,
    },
    sitega4id: null,
  },

  // This is the tag to include in Kiwi tracker.
  kiwi: {
    siteid: null,
  },

  axeptio: {
    siteid: null,
  },

  // These are the pages to build. Google doesn't like that the title and the
  // description are shared among several pages. Take care to set a title and a
  // description unique for each page (see the yaml header of the file).
  // If the contents of your page is detailed using markdown with or without html
  // tags, choose for the extension '.md'. If your contents is entirely written
  // with html tags, choose for the extension '.html'. This page won't be
  // processed by the markdown parser.
  website: {
    fr: [
      `${base}/site/webpages/${FR}/index.md`,
      // `${base}/site/webpages/${FR}/kasar.md`,
      `${base}/site/webpages/${FR}/contact.md`,
      // `${base}/site/webpages/${FR}/legal.md`,
      `${base}/site/webpages/${FR}/404.md`,
      `${base}/site/webpages/${FR}/offline.md`,
    ],
    en: [
      `${base}/site/webpages/${EN}/index.md`,
      `${base}/site/webpages/${EN}/kasar.md`,
      `${base}/site/webpages/${EN}/contact.md`,
      `${base}/site/webpages/${EN}/legal.md`,
      `${base}/site/webpages/${EN}/404.md`,
      `${base}/site/webpages/${EN}/offline.md`,
    ],
  },

  // Adds the documentation:
  docs: docu.docs || null,

  // These are the top and bottom menus and a special 'mobile' menu that
  // replace the default menus (top and bottom) on devices with a small screen.
  /* eslint-disable object-curly-newline */
  menu: {
    fr: {
      top: {
        left: [
          { text: 'Home', link: '#home' },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Docs', link: `${basepath}${EN}/docs/introduction.html` },
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          { text: 'FR',
            link: null,
            target: null,
            lang: FR,
            children: [
              { icon: '<span class="fi fi-gb"></span>', text: 'English', link: null, lang: EN },
              { icon: '<span class="fi fi-fr"></span>', text: 'Français', link: null, lang: FR },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-color-icons-light-sun" title="Switch between dark and light mode."></span>', text: '', link: '#switchtheme', lang: null },
        ],
      },
      bottom: [
        { text: 'contact', link: `${basepath}${FR}/contact.html` },
        { text: 'legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { text: 'conçu avec &#10084;&#65039; par nous-mêmes et Kasar!', link: 'https://www.npmjs.com/package/@mobilabs/kasar', target: '_blank' },
      ],
      mobile: [
        { text: 'Home', link: `${basepath}${FR}/index.html` },
        { text: 'Contact', link: `${basepath}${FR}/contact.html` },
        { text: 'Doc', link: `${basepath}${EN}/docs/introduction.html`, tag: 'doc' },
        { text: 'Legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { icon: '<span class="fi fi-gb"></span>', text: '', link: null, lang: EN },
        { icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-color-icons-light-sun" title="Switch between dark and light mode."></span>', text: '', link: '#switchtheme', lang: null },
      ],
    },
    en: {
      top: {
        left: [
          { text: 'Home', link: '#home' },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Docs', link: `${basepath}${EN}/docs/introduction.html` },
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          {
            text: 'EN',
            link: null,
            target: null,
            lang: EN,
            children: [
              { icon: '<span class="fi fi-fr"></span>', text: 'Français', link: null, lang: FR },
              { icon: '<span class="fi fi-gb"></span>', text: 'English', link: null, lang: EN },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-color-icons-light-moon" title="Switch between dark and light mode.">', text: '', link: '#switchtheme', lang: null },
        ],
      },
      bottom: [
        { text: 'contact', link: `${basepath}${EN}/contact.html` },
        { text: 'legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { text: 'designed with &#10084;&#65039; by ourselves and Kasar!', link: 'https://www.npmjs.com/package/@mobilabs/kasar', target: '_blank' },
      ],
      mobile: [
        { text: 'Home', link: `${basepath}${EN}/index.html` },
        { text: 'Contact', link: `${basepath}${EN}/contact.html` },
        { text: 'Doc', link: `${basepath}${EN}/docs/introduction.html`, tag: 'doc' },
        { text: 'Legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { icon: '<span class="fi fi-fr"></span>', text: '', link: null, lang: FR },
        { icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-color-icons-light-moon" title="Switch between dark and light mode.">', text: '', link: '#switchtheme', lang: null },
      ],
    },
  },

  // These are the scripts to insert at the top of the head of the HTML
  // output.
  topscripts: [
    `${basepath}js/colortheme.min.js`,
  ],

  // These are the scripts to insert at the bottom of the body of the HTML
  // output.
  scripts: [
    `${basepath}vendor/libs/modernizr-3.11.2.min.js`,
    `${basepath}vendor/libs/highlight.min.js`,
    `${basepath}js/main.min.js`,
  ],
};
