/** **************************************************************************
 * Creates and returns a sitemap string.
 *
 * The input must be an array of objects having the following properties:
 * [
 *   {
 *     name: 'name of the web page',
 *     link: 'path name of the web page',
 *     priority: {Number} from 0 to 1. If missing default is 0.8,
 *   }
 * ]
 *
 * The extra pages and the pages to excludes must be an array of urls.
 *
 *
 * ************************************************************************ */
// ESLint declarations
/* eslint one-var: 0, no-underscore-dangle: 0, semi-style: 0, no-param-reassign: 0 */

'use strict';

// -- Node modules

// -- Local modules

// -- Local constants

// -- Local variables

// -- Private functions

/**
 * Adds the XML header to sitemap.xml.
 */
const _addHeader = () => {
  let s = '';
  s += '<?xml version="1.0" encoding="UTF-8"?>\n';
  s += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  return s;
};

/**
 * Adds the XML footer to sitemap.xml.
 */
const _addFooter = function() {
  return '</urlset>\n';
};

/**
 * Adds a separator comment for human readability to sitemap.xml.
 */
const _appendTitle = function(title) {
  let s = '';
  s += '\n';
  s += `  ${title}\n`;
  return s;
};

/**
 * Appends a page URL to sitemap.xml.
 */
const _appendURL = function(url, priority, timestamp) {
  let s = '';
  s += '  <url>\n';
  s += `    <loc>${url}</loc>\n`;
  s += `    <lastmod>${timestamp}</lastmod>\n`;
  s += '    <changefreq>monthly</changefreq>\n';
  s += `    <priority>${priority}</priority>\n`;
  s += '  </url>\n';
  return s;
};

/**
 * Appends an expired page URL to sitemap.xml.
 */
const _appendExpiredURL = function(timestamp, url) {
  let s = '  <url>\n';
  s += `    <loc>${url}</loc>\n`;
  s += `    <expires>${timestamp}</expires>\n`;
  s += '  </url>\n';
  return s;
};

/**
 * Appends the page URLs to sitemap.xml.
 */
const _appendPages = function(url, timestamp, pages) {
  let s = _appendTitle('<!-- Main -->');

  for (let i = 0; i < pages.length; i++) {
    const link = `${url}/${pages[i].link}`;
    const priority = pages[i].priority ? pages[i].priority : 0.8;
    s += _appendURL(link, priority, timestamp);
  }
  return s;
};

/**
 * Appends theses extra URLs to sitemap.xml.
 */
const _appendExtraPages = function(timestamp, pages) {
  if (!Array.isArray(pages) || pages.length === 0) {
    return '';
  }

  let s = _appendTitle('<!-- Extra pages -->');
  for (let i = 0; i < pages.length; i++) {
    s += _appendURL(pages[i], '0.8', timestamp);
  }

  return s;
};

/**
 * Appends the expired page URLs to sitemap.xml.
 */
const _appendExpiredPages = function(timestamp, pages) {
  if (!Array.isArray(pages) || pages.length === 0) {
    return '';
  }

  let s = _appendTitle('<!-- Expired pages -->');
  for (let i = 0; i < pages.length; i++) {
    s += _appendExpiredURL(timestamp, pages[i]);
  }

  return s;
};

/**
 * Creates sitemap.xml.
 */
const _makesiteMap = function(url, pages, extra, expired) {
  const d         = new Date()
      , timestamp = d.toISOString()
      ;

  // Add the the sitemap header:
  let s = _addHeader();

  // Add the website pages:
  s += _appendPages(url, timestamp, pages);

  // Add the extra pages:
  s += _appendExtraPages(timestamp, extra);

  // Add the expired pages:
  s += _appendExpiredPages(timestamp, expired);

  // Append the XML Footer:
  s += _addFooter();

  return s;
};


// -- Main
module.exports = function(file, url, pages, extra, expired) {
  file.contents = Buffer.from(_makesiteMap(url, pages, extra, expired));
  return file;
};
