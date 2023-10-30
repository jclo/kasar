// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules
const themeconfig = require('./.kasar/theme-config')
    ;


// -- Local constants
const EN          = 'en'
    , FR          = 'fr'
    , DE          = 'de'
    , IT          = 'it'
    , { base }    = themeconfig
    // , basepath    = '/'
    ;


// -- Local variables


// -- Main

module.exports = {
  docs: {
    en: [
      `${base}/site/webdocpages/${EN}/introduction.md`,
      `${base}/site/webdocpages/${EN}/quickstart.html`,
      {
        sections: [
          `${base}/site/webdocpages/${EN}/guides.md`,
          `${base}/site/webdocpages/${EN}/guides-section2.md`,
          `${base}/site/webdocpages/${EN}/guides-section3.md`,
        ],
      },
      {
        title: 'Chapter 1',
        pages: [
          `${base}/site/webdocpages/${EN}/chapter1/page1.md`,
          `${base}/site/webdocpages/${EN}/chapter1/page2.md`,
          `${base}/site/webdocpages/${EN}/chapter1/page3.md`,
        ],
      },
      {
        title: 'Chapter 2',
        pages: [
          `${base}/site/webdocpages/${EN}/chapter2/page1.md`,
          `${base}/site/webdocpages/${EN}/chapter2/page2.md`,
        ],
      },
      {
        title: 'Chapter 3',
        pages: [
          `${base}/site/webdocpages/${EN}/chapter3/page1.md`,
          `${base}/site/webdocpages/${EN}/chapter3/page2.md`,
          `${base}/site/webdocpages/${EN}/chapter3/page3.md`,
          {
            sections: [
              `${base}/site/webdocpages/${EN}/chapter3/page4.md`,
              `${base}/site/webdocpages/${EN}/chapter3/page4.2.md`,
              `${base}/site/webdocpages/${EN}/chapter3/page4.3.md`,
            ],
          },
        ],
      },
    ],
    fr: [
      `${base}/site/webdocpages/${FR}/introduction.md`,
      `${base}/site/webdocpages/${FR}/quickstart.html`,
    ],
    de: [
      `${base}/site/webdocpages/${DE}/introduction.md`,
      `${base}/site/webdocpages/${DE}/quickstart.html`,
    ],
    it: [
      `${base}/site/webdocpages/${IT}/introduction.md`,
      `${base}/site/webdocpages/${DE}/quickstart.html`,
    ],
  },
};
