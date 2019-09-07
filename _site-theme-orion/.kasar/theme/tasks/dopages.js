// ESLint declarations
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const fs        = require('fs')
    , fse       = require('fs-extra')
    , Markdown  = require('markdown-it')
    , mdAttrs   = require('markdown-it-attrs')
    , MDCont    = require('markdown-it-container')
    , MDAnchors = require('markdown-it-anchor')
    ;


// -- Local modules
const config     = require('../../../config')
    , createPage = require('../pages/main')
    ;


// -- Local constants
const { dist } = config
    , { basedist } = config
    ;


// -- Local variables
let md
  , norm
  ;


// -- Private Functions --------------------------------------------------------

/**
 * Customizes Markdown render function.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          markdown token,
 * @param {Array}           token index,
 * @returns {String}        returns opening and closing tags,
 * @since 0.0.0
 */
function render(tokens, idx) {
  const callout = 'pureplus-callout'
      , m = tokens[idx].info.trim()
      ;

  let callouttype;

  switch (m) {
    case 'info':
      callouttype = 'info';
      break;

    case 'success':
      callouttype = 'success';
      break;

    case 'warning':
      callouttype = 'warning';
      break;

    case 'error':
      callouttype = 'error';
      break;

    default:
      break;
  }

  if (tokens[idx].nesting === 1) {
    // opening tag
    return `<div class="${callout} ${callout}-${callouttype}">\n`;
  }
  // closing tag
  return '</div>\n';
}

/**
 * Initializes Markdown renderer.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function initMarkdown() {
  md = new Markdown('commonmark');
  md.use(mdAttrs);
  md.use(MDCont, 'info', { render });
  md.use(MDCont, 'success', { render });
  md.use(MDCont, 'warning', { render });
  md.use(MDCont, 'error', { render });
  md.use(MDAnchors);
}

/**
 * Returns the normalize style.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        return the normalize style,
 * @since 0.0.0
 */
function getNormalize() {
  if (!norm) {
    if (fs.existsSync(`${dist}/css/normalize.style`)) {
      norm = fs.readFileSync(`${dist}/css/normalize.style`, 'utf8');
    }
  }
  return norm;
}

/**
 * Returns the HTML content of the requested file(s).
 * (convert it from markdown to html if needed)
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the file(s) path,
 * @returns {String}        the file(s) content,
 * @since 0.0.0
 */
function getContent(file) {
  let content = '';
  if (typeof file === 'string') {
    if (fs.existsSync(file)) {
      content = file.match(/.md/)
        ? md.render(fs.readFileSync(file, 'utf8'))
        : fs.readFileSync(file, 'utf8');
    }
  } else if (typeof file === 'object') {
    const { path } = file;
    for (let i = 0; i < file.blocks.length; i++) {
      if (fs.existsSync(`${path}/${file.blocks[i]}`)) {
        content += file.blocks[i].match(/.md/)
          ? md.render(fs.readFileSync(`${path}/${file.blocks[i]}`, 'utf8'))
          : fs.readFileSync(`${path}/${file.blocks[i]}`, 'utf8');
      }
    }
  }

  return content;
}

/**
 * Creates and Saves the web pages.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Object}          the side menu,
 * @returns {}              -,
 * @since 0.0.0
 */
function createWebPages(webpages, sidemenu) {
  /* eslint-disable-next-line */
  for (const key in webpages) {
    const content = getContent(webpages[key].content);
    const { name } = webpages[key];
    const { title } = webpages[key];
    const { description } = webpages[key];
    const { output } = webpages[key];

    if (output) {
      const html = createPage(name, title, description, content, getNormalize(), sidemenu);
      // Saves the returned generated page to dist.
      fse.outputFile(`${basedist}/${output}`, html, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    }
  }
}

/**
 * Creates the side menu.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the list of the nested web pages,
 * @returns {}              returns the sidemenu,
 * @since 0.0.0
 */
function createSideMenu(doc) {
  const sidemenu = [];
  for (let i = 0; i < doc.length; i++) {
    const menu = {
      text: doc[i].name ? doc[i].name : '???',
      link: doc[i].link ? doc[i].link : null,
      onlyExpanded: doc[i].onlyExpanded ? doc[i].onlyExpanded : false,
      tag: '',
      children: [],
    };
    for (let j = 0; j < doc[i].children.length; j++) {
      menu.children.push({
        text: doc[i].children[j].name,
        link: doc[i].children[j].link ? doc[i].children[j].link : doc[i].children[j].output,
        target: doc[i].children[j].target ? doc[i].children[j].target : null,
        tag: '',
      });
    }
    sidemenu.push(menu);
  }
  return sidemenu;
}


// -- Gulp Private Tasks

/**
 * Processes the pages of the website.
 */
function dopages(done) {
  // Creates the classic (independent) web pages.
  createWebPages(config.website);

  // Creates the nested doc pages if any.
  if (config.doc) {
    for (let i = 0; i < config.doc.length; i++) {
      for (let j = 0; j < config.doc[i].children.length; j++) {
        const sidemenu = createSideMenu(config.doc);
        sidemenu[i].children[j].tag = 'youarehere';
        createWebPages({ doc: config.doc[i].children[j] }, sidemenu);
      }
    }
  }
  done();
  return null;
}

// -- Main
initMarkdown();


// Gulp Public Tasks
module.exports = dopages;
