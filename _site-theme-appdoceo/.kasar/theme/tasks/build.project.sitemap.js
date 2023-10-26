/* *****************************************************************************
 *
 * Creates the sitemap.xml file.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _addFooter                  adds a footer to sitemap.xml,
 *  . _appendURL                  adds a page link to sitemap.xml,
 *  . _appendTitle                adds a title to sitemap.xml
 *  . _appendExpiredPages         adds the expired html pages to sitemap.xml,
 *  . _appendExtraPages           adds the extra html pages to sitemap.xml,
 *  . _appendPages                adds the html pages to sitemap.xml,
 *  . _addHeader                  adds the header to sitemap.xml,
 *  . _makesiteMap                generates the sitemap.xml contents,
 *  . _buildsitemap               creates sitemap.xml file,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:project:sitemap,
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


// -- Node modules
const fs = require('fs')
    ;


// -- Local modules
const config      = require('../../../config')
    , extra       = require('../../../tobuildweb/extraUrls')
    , expired     = require('../../../tobuildweb/expiredUrls')
    ;


// -- Local constants
const { dist }    = config
    , url         = `${config.company.url.protocol}://${config.company.url.domain}`
    // , { website } = config
    , sitemap     = `${dist}/sitemap.xml`
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Adds a footer to sitemap.xml.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _addFooter() {
  return '</urlset>\n';
}

/**
 * Adds a page link to sitemap.xml.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the page url,
 * @param {String}          the page priority,
 * @param {String}          the date the page is generated
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _appendURL(link, priority, timestamp) {
  let s = '';
  s += '  <url>\n';
  s += `    <loc>${link}</loc>\n`;
  s += `    <lastmod>${timestamp}</lastmod>\n`;
  s += '    <changefreq>monthly</changefreq>\n';
  s += `    <priority>${priority}</priority>\n`;
  s += '  </url>\n';
  return s;
}

/**
 * Adds a title to sitemap.xml.
 *
 * @function (arg1)
 * @private
 * @param {String}          the title to add,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _appendTitle(title) {
  let s = '';
  s += '\n';
  s += `  ${title}\n`;
  return s;
}

/**
 * Adds the expired html pages to sitemap.xml.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the date the page is generated,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _appendExpiredPages(timestamp) {
  if (!Array.isArray(expired) || expired.length === 0) {
    return '';
  }

  let s = _appendTitle('<!-- Expired pages -->\n');
  for (let i = 0; i < expired.length; i++) {
    s += '  <url>\n';
    s += `    <loc>${expired[i]}</loc>\n`;
    s += `    <expires>${timestamp}</expires>\n`;
    s += '  </url>\n';
  }

  return s;
}

/**
 * Adds the extra html pages to sitemap.xml.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the date the page is generated,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _appendExtraPages(timestamp) {
  if (!Array.isArray(extra) || extra.length === 0) {
    return '';
  }

  let s = _appendTitle('<!-- Extra pages -->');
  for (let i = 0; i < extra.length; i++) {
    s += _appendURL(extra[i], '0.8', timestamp);
  }

  return s;
}

/**
 * Adds the html pages to sitemap.xml.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}          the date the page is generated,
 * @param {Array}           the list of pages,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _appendPages(timestamp, pages) {
  let s = _appendTitle('<!-- Main -->');

  for (let i = 0; i < pages.length; i++) {
    const link = `${url}/${pages[i].link}`;
    const priority = pages[i].priority ? pages[i].priority : 0.8;
    s += _appendURL(link, priority, timestamp);
  }
  return s;
}

/**
 * Adds the header to sitemap.xml.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {XMLString}     return data,
 * @since 0.0.0
 */
function _addHeader() {
  let s = '';
  s += '<?xml version="1.0" encoding="UTF-8"?>\n';
  s += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  return s;
}

/**
 * Generates the sitemap.xml contents.
 *
 * @function (arg1)
 * @private
 * @param {Array}           the list of html pages,
 * @returns {XMLString}     return sitemap.xml,
 * @since 0.0.0
 */
function _makesiteMap(pages) {
  const d         = new Date()
      , timestamp = d.toISOString()
      ;

  // Add the the sitemap header:
  let s = _addHeader();

  // Add the website pages:
  s += _appendPages(timestamp, pages);

  // Add the extra pages:
  s += _appendExtraPages(timestamp);

  // Add the expired pages:
  s += _appendExpiredPages(timestamp);

  // Append the XML Footer:
  s += _addFooter();

  return s;
}

/**
 * Creates sitemap.xml file.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the list of webpages,
 * @param {Object}          the list of docpages,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, guard-for-in */
function _buildsitemap(website, docsite, done) {
  const pages = [];

  /* eslint-disable-next-line */
  for (const lang in website) {
    for (const page in website[lang]) {
      if (page === 'home') {
        pages.push({
          name: page,
          link: website[lang][page].output.replace(/^\//, '').replace('/index.html', ''),
          priority: '1.0',
        });
      } else if (page !== 'oops') {
        pages.push({
          name: page,
          link: website[lang][page].output.replace(/^\//, ''),
          priority: '0.8',
        });
      }
    }
  }

  if (docsite) {
    for (const lang in docsite) {
      for (const page in docsite[lang]) {
        pages.push({
          name: page,
          link: docsite[lang][page].output.replace(/^\//, ''),
          priority: '0.6',
        });
      }
    }
  }

  fs.writeFile(sitemap, _makesiteMap(pages), { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);
    done();
  });
}
/* eslint-enable no-restricted-syntax, guard-for-in */


// -- Public -------------------------------------------------------------------

/**
 * Executes build:project:sitemap.
 *
 * @function (arg1, arg2, arg3)
 * @public
 * @param {Array}           the list of web pages,
 * @param {Array}           the list of doc pages,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(webpages, docpages, done) {
  const PENDING = 1;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:project:sitemap\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:project:sitemap\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildsitemap(webpages, docpages, next);
}


// -- Export
module.exports = Build;
