// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */


// -- Node modules

// -- Local modules
const themeconfig = require('./.kasar/theme-config')
    // , docu        = require('./docsidemenu')
    ;


// -- Local constants
const FR          = 'fr'
    , EN          = 'en'
    , DE          = 'de'
    , IT          = 'it'
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

  // These are the parameters that define your app & company:
  title: '???',
  description: '???',
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
      // v2: `${base}/site/tobuildweb/google123.html`,
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
    en: [
      `${base}/site/webpages/${EN}/introduction.md`,
      `${base}/site/webpages/${EN}/subfolder/quickstart.html`,
      {
        sections: [
          `${base}/site/webpages/${EN}/guides.md`,
          `${base}/site/webpages/${EN}/guides-section2.md`,
          `${base}/site/webpages/${EN}/guides-section3.md`,
        ],
      },
      {
        title: 'Chapter 1',
        pages: [
          `${base}/site/webpages/${EN}/chapter1/page1.md`,
          `${base}/site/webpages/${EN}/chapter1/page2.md`,
          `${base}/site/webpages/${EN}/chapter1/page3.md`,
        ],
      },
      {
        title: 'Chapter 2',
        pages: [
          `${base}/site/webpages/${EN}/chapter2/page1.md`,
          `${base}/site/webpages/${EN}/chapter2/page2.md`,
        ],
      },
      {
        title: 'Chapter 3',
        pages: [
          `${base}/site/webpages/${EN}/chapter3/page1.md`,
          `${base}/site/webpages/${EN}/chapter3/page2.md`,
          `${base}/site/webpages/${EN}/chapter3/page3.md`,
          {
            sections: [
              `${base}/site/webpages/${EN}/chapter3/page4.md`,
              `${base}/site/webpages/${EN}/chapter3/page4.2.md`,
              `${base}/site/webpages/${EN}/chapter3/page4.3.md`,
            ],
          },
        ],
      },
    ],
    fr: [
      `${base}/site/webpages/${FR}/introduction.md`,
      `${base}/site/webpages/${FR}/quickstart.html`,
    ],

    de: [
      `${base}/site/webpages/${DE}/introduction.md`,
      `${base}/site/webpages/${DE}/quickstart.html`,
    ],
    it: [
      `${base}/site/webpages/${IT}/introduction.md`,
      `${base}/site/webpages/${IT}/quickstart.html`,
    ],

  },

  // Adds the documentation:
  // docs: docu.docs || null,

  // These are the top and bottom menus and a special 'mobile' menu that
  // replace the default menus (top and bottom) on devices with a small screen.
  /* eslint-disable object-curly-newline */
  menu: {
    en: {
      top: {
        left: [
          { text: 'Home', link: `${basepath}${EN}` },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          {
            text: 'EN',
            link: '#',
            target: null,
            lang: EN,
            children: [
              { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
              { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
              { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
              { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { text: '', link: '#switchtheme', lang: null, icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode.">' },
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
        { text: 'Legal', link: `${basepath}${EN}/Legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        {
          text: '',
          link: '#',
          target: null,
          lang: EN,
          icon: '<span class="fi fi-gb"></span>',
          tag: 'lang',
          children: [
            { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
            { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
            { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
          ],
        },
        { text: '', link: '#switchtheme', lang: EN, icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode.">' },
      ],
    },

    fr: {
      top: {
        left: [
          { text: 'Home', link: `${basepath}${FR}` },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          { text: 'FR',
            link: '#',
            target: null,
            lang: FR,
            children: [
              { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
              { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
              { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
              { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { text: '', link: '#switchtheme', lang: null, icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
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
        { text: 'Legal', link: `${basepath}${EN}/Legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        {
          text: '',
          link: '#',
          target: null,
          lang: FR,
          icon: '<span class="fi fi-fr"></span>',
          tag: 'lang',
          children: [
            { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
            { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
            { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
          ],
        },
        { text: '', link: '#switchtheme', lang: FR, icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
      ],
    },

    de: {
      top: {
        left: [
          { text: 'Home', link: `${basepath}${DE}` },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          { text: 'DE',
            link: '#',
            target: null,
            lang: DE,
            children: [
              { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
              { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
              { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
              { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { text: '', link: '#switchtheme', lang: null, icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
        ],
      },
      bottom: [
        { text: 'contact', link: `${basepath}${EN}/contact.html` },
        { text: 'legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { text: 'conçu avec &#10084;&#65039; par nous-mêmes et Kasar!', link: 'https://www.npmjs.com/package/@mobilabs/kasar', target: '_blank' },
      ],
      mobile: [
        { text: 'Home', link: `${basepath}${DE}/index.html` },
        { text: 'Contact', link: `${basepath}${DE}/contact.html` },
        { text: 'Doc', link: `${basepath}${EN}/docs/introduction.html`, tag: 'doc' },
        { text: 'Legal', link: `${basepath}${EN}/Legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        {
          text: '',
          link: '#',
          target: null,
          lang: DE,
          icon: '<span class="fi fi-de"></span>',
          tag: 'lang',
          children: [
            { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
            { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
            { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
          ],
        },
        { text: '', link: '#switchtheme', lang: DE, icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
      ],
    },


    it: {
      top: {
        left: [
          { text: 'Home', link: `${basepath}${IT}` },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
        ],
        right: [
          { text: 'Google', link: 'https://www.google.com', target: '_blank' },
          { text: 'IT',
            link: '#',
            target: null,
            lang: IT,
            children: [
              { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
              { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
              { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
              { text: 'Italiano', link: `${basepath}${IT}/#`, lang: IT, icon: '<span class="fi fi-it"></span>' },
            ],
          },
          { text: 'Yahoo', link: 'https://www.yahoo.com', target: '_blank' },
          { text: '', link: '#switchtheme', lang: null, icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
        ],
      },
      bottom: [
        { text: 'contact', link: `${basepath}${IT}/contact.html` },
        { text: 'legal', link: `${basepath}${EN}/legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        { text: 'conçu avec &#10084;&#65039; par nous-mêmes et Kasar!', link: 'https://www.npmjs.com/package/@mobilabs/kasar', target: '_blank' },
      ],
      mobile: [
        { text: 'Home', link: `${basepath}${IT}/index.html` },
        { text: 'Contact', link: `${basepath}${IT}/contact.html` },
        { text: 'Doc', link: `${basepath}${EN}/docs/introduction.html`, tag: 'doc' },
        { text: 'Legal', link: `${basepath}${EN}/Legal.html` },
        { text: 'Kasar', link: `${basepath}${EN}/kasar.html` },
        {
          text: '',
          link: '#',
          target: null,
          lang: IT,
          icon: '<span class="fi fi-it"></span>',
          tag: 'lang',
          children: [
            { text: 'Français', link: `${basepath}${FR}/#`, lang: FR, icon: '<span class="fi fi-fr"></span>' },
            { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
            { text: 'Deutsch', link: `${basepath}${DE}/#`, lang: DE, icon: '<span class="fi fi-de"></span>' },
          ],
        },
        { text: '', link: '#switchtheme', lang: IT, icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode."></span>' },
      ],
    },
  },

  // These are the scripts to insert at the bottom of the body of the HTML
  // output.
  scripts: [
    `${basepath}vendor/libs/highlight.min.js`,
  ],
};
