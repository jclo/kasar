// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules
const themeconfig = require('./.kasar/theme-config')
    ;


// -- Local constants
const { base }    = themeconfig
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
    siteid: 'UA-XXXXXXX-X',
  },

  // These are the pages to build. Google doesn't like that the title and the
  // description are shared among several pages. Take care to set a title and a
  // description unique for each page.
  // If the contents of your page is detailed using markdown with or without html
  // tags, choose for the extension '.md'. If your contents is entirely written
  // with html tags, choose for the extension '.html'. This page won't be
  // processed by the markdown parser.
  website: {
    home: {
      name: 'Home',
      title: 'My Company | We are expert in ...',
      description: 'this page ...',
      content: `${base}/site/webpages/frontpage.md`,
      output: `${basepath}index.html`,
    },
    kasar: {
      name: 'Kasar',
      title: 'Kasar Tutorial',
      description: 'Explains how to use it.',
      content: `${base}/site/webpages/kasar.md`,
      output: `${basepath}kasar.html`,
    },
    contact: {
      name: 'Contact',
      title: 'contact page',
      description: '...',
      content: `${base}/site/webpages/contact.md`,
      output: `${basepath}contact.html`,
    },
    legal: {
      name: 'Legal',
      title: 'My Company | Legal Terms',
      description: '...',
      content: `${base}/site/webpages/legal.md`,
      output: `${basepath}legal.html`,
    },
    oops: {
      name: 'Error page',
      title: 'My Company | Error 404 Page',
      description: '...',
      content: `${base}/site/webpages/404.md`,
      output: `${basepath}404.html`,
    },
  },

  // These are the scripts to insert at the bottom of the body of the HTML
  // output.
  scripts: [
    `${basepath}vendor/libs/modernizr-3.8.0.min.js`,
    `${basepath}vendor/libs/jquery.min.js`,
    `${basepath}vendor/libs/jquery.easing.min.js`,
    `${basepath}js/main.min.js`,
  ],
};
