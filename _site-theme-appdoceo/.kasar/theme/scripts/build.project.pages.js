/* *****************************************************************************
 *
 * Generates the HTML pages from MD files.
 *
 *
 * Private Functions:
 *  . render                      customizes Markdown render function,
 *  . _initMarkdown               initializes Markdown renderer,
 *  . _getNormalize               returns the normalize style,
 *  . _replaceVariables           replaces variables in html or md contents,
 *  . _getContent                 returns the HTML con tent of the requested file,
 *  . _convertWeb2HTML            converts source files to html pages,
 *  . _generateWebPage            extracts data from the selected source file,
 *  . _createWebPages             creates the web pages by parsing 'config.website',
 *
 *
 * Public Functions:
 *  . Build                       executes build:project:pages,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */

'use strict';


// -- Vendor Modules
const fs        = require('fs')
    , fse       = require('fs-extra')
    , Markdown  = require('markdown-it')
    , mdAttrs   = require('markdown-it-attrs')
    , MDCont    = require('markdown-it-container')
    , MDAnchors = require('markdown-it-anchor')
    , yaml      = require('js-yaml')
    ;


// -- Local Modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    , TK          = require('./libs/token')
    ;


// -- Local Constants
const { base }     = themeconfig
    , { basepath } = config
    , { dist }     = config
    , { basedist } = config
    , md           = new Markdown('commonmark').use(mdAttrs)
    ;


// -- Local variables
let norm
  ;


// -- Private Functions --------------------------------------------------------

/**
 * Customizes Markdown render function.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the markdown token,
 * @param {Array}           the token index,
 * @returns {String}        returns opening and closing tags,
 * @since 0.0.0
 */
function render(tokens, idx) {
  const callout = 'pureplus-callout'
      , m = tokens[idx].info.trim()
      ;

  let callouttype
    , name
    ;

  switch (m) {
    case 'note':
      callouttype = 'note';
      name = 'note';
      break;

    case 'info':
      callouttype = 'info';
      name = 'info';
      break;

    case 'success':
      callouttype = 'success';
      name = 'success';
      break;

    case 'warning':
      callouttype = 'warning';
      name = 'warning';
      break;

    case 'error':
      callouttype = 'error';
      name = 'error';
      break;

    default:
      break;
  }

  if (tokens[idx].nesting === 1) {
    // opening tag
    return `
      <div class="${callout} ${callout}-${callouttype}">
        <div>${name}</div>
    `;
  }
  // closing tag
  return '</div>';
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
function _initMarkdown() {
  md.use(mdAttrs);
  md.use(MDCont, 'note', { render });
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
 * @param {}          -,
 * @returns {String}  return the normalize style,
 * @since 0.0.0
 */
function _getNormalize() {
  if (!norm) {
    if (fs.existsSync(`${dist}/css/normalize.style`)) {
      norm = fs.readFileSync(`${dist}/css/normalize.style`, 'utf8');
    }
  }
  return norm;
}

/**
 * Replaces variables in html or md contents.
 *
 * @function (arg1)
 * @private
 * @param {String}    the md or html contents,
 * @returns {String}  return the updated contents,
 * @since 0.0.0
 */
function _replaceVariables(data) {
  const content = data
    .replace(/{{base:path}}/g, basepath)
  ;

  return content;
}

/**
 * Returns the HTML content of the requested file.
 * (convert it from markdown to html if needed)
 *
 * @function (arg1)
 * @private
 * @param {String}    the file(s) path,
 * @returns {Array}   the yaml header and the file(s) content,
 * @since 0.0.0
 */
function _getContent(file) {
  let input
    , content
    ;

  if (typeof file === 'string') {
    if (fs.existsSync(file)) {
      input = fs.readFileSync(file, 'utf8');
      content = file.match(/.md/)
        ? md.render(_replaceVariables(input.replace(/---([\s\S]*?)---/, '')))
        : _replaceVariables(input.replace(/---([\s\S]*?)---/, ''))
      ;
    }
  }

  if (typeof file === 'object') {
    input = '';
    for (let i = 0; i < file.sections.length; i++) {
      if (fs.existsSync(file.sections[i])) {
        input += fs.readFileSync(file.sections[i], 'utf8');
      }
    }
    content = file.sections[0].match(/.md/)
      ? md.render(_replaceVariables(input.replace(/---([\s\S]*?)---/, '')))
      : _replaceVariables(input.replace(/---([\s\S]*?)---/, ''))
    ;
  }

  // Extract yaml header if any:
  let header = {};
  const result = input.match(/---([\s\S]*?)---/);
  if (Array.isArray(result)) {
    header = yaml.load(result[1]);
  }

  return [header, content];
}

/**
 * Writes html content aand sidemenu to dist.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Array}           the menu,
 * @param {Number}          the total of files to save,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in, no-param-reassign, max-len */
function _write(webpages, sidemenu, total, done) {
  /**
   * Executes done at the completion.
   */
  let pending = total;
  function next() {
    pending -= 1;
    if (!pending) {
      fs.writeFile(`${dist}/sidemenu.json`, JSON.stringify(sidemenu), { encoding: 'utf8' }, (err) => {
        if (err) throw new Error(err);

        done(webpages);
      });
    }
  }

  for (const lang in webpages) {
    for (const page in webpages[lang]) {
      if (webpages[lang][page].output) {
        fse.outputFile(`${dist}/${webpages[lang][page].output}`, webpages[lang][page].content, (err) => {
          if (err) throw new Error(err);
          next();
        });
      }
    }
  }
}
/* eslint-enable no-restricted-syntax, guard-for-in, no-param-reassign, max-len */

/**
 * Extracts data from the selected source file.
 *
 * @function (arg1)
 * @private
 * @param {String/Object}   the input file(s),
 * @returns {Object}        the page data,
 * @since 0.0.0
 */
function _generateWebPage(page, lang) {
  const PATH_IN  = `${base}/site/webpages/`
      , PATH_OUT = ''
      ;

  const output = typeof page === 'object'
    ? page.sections[0].replace(PATH_IN, PATH_OUT).replace(/\.md/, '.html')
    : page.replace(PATH_IN, PATH_OUT).replace(/\.md/, '.html')
  ;

  let menuname;
  const [header, content] = _getContent(page);
  const result = content.match(/<h1.*>(.*)<\/h1/);
  if (Array.isArray(result)) {
    [, menuname] = result;
  }

  // Add a loading script at the begining of the
  // file:
  let contentplus = `<script>window.location.href="${basepath}?page=${lang}:${header.name}"</script>`;
  contentplus += content;

  return {
    type: 'web',
    lang,
    name: header.name,
    token: TK.get(8),
    title: header.title,
    description: header.description,
    company: config.company,
    menuname,
    content: contentplus,
    output,
    link: `${basepath}${output}`,
  };
}

/**
 * Creates the web pages by parsing 'config.website'.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the list of the web pages,
 * @param {Object}          the menu,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in */
function _createWebPages(webpages, menu, done) {
  const web      = {}
      , sidemenu = {}
      ;

  let count = 0
    , page
    , sidechildren
    , name
    ;

  for (const lang in webpages) {
    if (!web[lang]) web[lang] = [];
    if (!sidemenu[lang]) sidemenu[lang] = [];

    for (let i = 0; i < webpages[lang].length; i++) {
      if (typeof webpages[lang][i] === 'string' || (typeof webpages[lang][i] === 'object' && webpages[lang][i].sections)) {
        page = _generateWebPage(webpages[lang][i], lang);
        web[lang][page.name] = page;
        sidemenu[lang].push({
          name: page.name,
          token: page.token,
          title: page.title,
          description: page.description,
          lang: page.lang,
          text: page.menuname,
          link: page.link,
          vlink: `#sidemenu:${lang}:${page.name}`,
        });

        count += 1;
      } else if (typeof webpages[lang][i] === 'object' && webpages[lang][i].pages) {
        sidechildren = [];

        for (let j = 0; j < webpages[lang][i].pages.length; j++) {
          page = _generateWebPage(webpages[lang][i].pages[j], lang);
          web[lang][page.name] = page;
          sidechildren.push({
            name: page.name,
            token: page.token,
            title: page.title,
            description: page.description,
            lang: page.lang,
            text: page.menuname,
            link: page.link,
            vlink: `#sidemenu:${lang}:${page.name}`,
          });
          count += 1;
        }

        name = webpages[lang][i].title.replace(/\s+/g, '').toLowerCase();
        sidemenu[lang].push({
          name,
          token: TK.get(8),
          lang,
          text: webpages[lang][i].title,
          vlink: `#sidemenu:${lang}:${name}`,
          children: sidechildren,
        });
      }
    }
  }

  _write(web, sidemenu, count, done);
}
/* eslint-enable no-restricted-syntax, guard-for-in */


// -- Public -------------------------------------------------------------------

/**
 * Executes build:js.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:pages\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING
    , webpages
    ;

  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:pages\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done(webpages);
    }
  }

  _initMarkdown();
  _createWebPages(config.website, config.menu, (data) => {
    webpages = data;
    next();
  });
}


// -- Export
module.exports = Build;
