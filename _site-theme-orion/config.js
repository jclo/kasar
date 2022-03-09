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

  // This is the lang to specify in the html tag (<html class="no-js" lang="en">)
  lang: 'en',

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
      content: {
        path: `${base}/site/webpages/front`,
        // If your consider that a page contains multiple sections and you prefer
        // multiple files to describe it, you can. You just have to add the
        // property block and list in it your files.
        blocks: [
          'marketing.md',
          'contactus.md',
        ],
      },
      // All the files are merged together in an unique output file following
      // the order defined in the 'blocks' array.
      output: `${basepath}index.html`,
    },
    contact: {
      name: 'Contact',
      title: 'Contact page',
      description: 'bla bla ...',
      content: `${base}/site/webpages/contact.md`,
      output: `${basepath}contact.html`,
    },
    legal: {
      name: 'Legal',
      title: 'My Company | Legal Terms',
      description: 'bla bla ...',
      content: `${base}/site/webpages/legal.md`,
      output: `${basepath}legal.html`,
    },
    kasar: {
      name: 'Kasar',
      title: 'Kasar Tutorial',
      description: 'Explains how to use it.',
      content: `${base}/site/webpages/kasar.md`,
      output: `${basepath}kasar.html`,
    },
    offline: {
      name: 'Offline',
      title: 'Offline',
      description: '...',
      content: `${base}/site/webpages/offline.md`,
      output: `${basepath}offline.html`,
    },
  },

  // This is the special doc page containing nested pages.
  doc: [
    {
      name: 'Book 1',
      link: `${basepath}doc/book1/chapter1.html`,
      children: [
        {
          name: 'Chapter 1',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: `${base}/site/webpages/doc/book1/chapter1.md`,
          output: `${basepath}doc/book1/chapter1.html`,
        },
        {
          name: 'Chapter 2',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: `${base}/site/webpages/doc/book1/chapter2.md`,
          output: `${basepath}doc/book1/chapter2.html`,
        },
        {
          name: 'Chapter 3',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: `${base}/site/webpages/doc/book1/chapter3.md`,
          output: `${basepath}doc/book1/chapter3.html`,
        },
      ],
    },
    {
      name: 'Book 2',
      link: `${basepath}doc/book2/chapter1.html`,
      children: [
        {
          name: 'Chapter 1',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: {
            path: `${base}/site/webpages/doc/book2`,
            blocks: [
              'chapter1_section1.md',
              'chapter1_section2.md',
            ],
          },
          output: `${basepath}doc/book2/chapter1.html`,
        },
        {
          name: 'Chapter 2',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: {
            path: `${base}/site/webpages/doc/book2`,
            blocks: [
              'chapter2_section1.md',
              'chapter2_section2.md',
            ],
          },
          output: `${basepath}doc/book2/chapter2.html`,
        },
      ],
    },
    {
      name: 'Book 3',
      link: `${basepath}doc/book3/chapter1.html`,
      children: [
        {
          name: 'Chapter 1',
          title: 'bla bla ...',
          description: 'zzz ...',
          content: `${base}/site/webpages/doc/book3/chapter1.md`,
          output: `${basepath}doc/book3/chapter1.html`,
        },
      ],
    },

    {
      name: 'External',
      link: '#',
      onlyExpanded: false,
      children: [
        {
          name: 'Google',
          link: 'https://www.google.com',
          target: '_blank',
        },
        {
          name: 'Yahoo',
          link: 'http://www.yahoo.com',
          target: '_blank',
        },
      ],
    },
  ],

  // These are the top and bottom menus and a special 'mobile' menu that
  // replace the default menus (top and bottom) on devices with a small screen.
  menu: {
    top: {
      left: {
        title: { text: 'Kasar', link: `${basepath}` },
        menu: [
          { text: 'Home', link: '#home' },
          { text: 'Section 1', link: '#section1' },
          { text: 'Section 2', link: '#section2' },
          { text: 'Section 3', link: '#section3' },
          { text: 'Section 4', link: '#section4' },
          { text: 'Section 5', link: '#section5' },
          { text: 'contact us', link: '#contactus' },
        ],
      },
      right: [
        { text: 'Book 1', link: `${basepath}doc/book1/chapter1.html` },
        { text: 'Book 2', link: `${basepath}doc/book2/chapter1.html` },
        { text: 'Book 3', link: `${basepath}doc/book3/chapter1.html` },
        { text: 'Google', link: 'https://www.google.com', target: '_blank' },
      ],
    },
    bottom: [
      { text: 'contact', link: `${basepath}contact.html` },
      { text: 'legal', link: `${basepath}legal.html` },
      { text: 'Kasar', link: `${basepath}kasar.html` },
      { text: 'built with Kasar', link: 'https://www.npmjs.com/package/@mobilabs/kasar' },
    ],
    mobile: {
      title: { text: 'Kasar', link: '#home' },
      menu: [
        { text: 'Home', link: `${basepath}` },
        { text: 'Documentation', link: `${basepath}doc/book1/chapter1.html`, tag: 'here' },
        { text: 'contact', link: `${basepath}contact.html` },
        { text: 'legal', link: `${basepath}legal.html` },
        { text: 'Kasar', link: `${basepath}kasar.html` },
        { text: 'built with Kasar', link: 'https://www.npmjs.com/package/@mobilabs/kasar', tag: 'credits' },
      ],
    },
  },

  // These are the scripts to insert at the bottom of the body of the HTML
  // output.
  scripts: [
    `${basepath}vendor/libs/modernizr-3.11.2.min.js`,
    `${basepath}vendor/libs/jquery.min.js`,
    `${basepath}vendor/libs/jquery.easing.min.js`,
    `${basepath}js/main.min.js`,
  ],
};
