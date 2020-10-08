// ESLint declarations
/* eslint one-var: 0, semi-style: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const { src, dest } = require('gulp')
    , concat        = require('gulp-concat')
    , { sitemap }   = require('./_kasar')
    ;


// -- Local modules
const themeconfig = require('../../theme-config')
    , config      = require('../../../config')
    , extra       = require('../../../tobuildweb/extraUrls')
    , expired     = require('../../../tobuildweb/expiredUrls.js')
    ;


// -- Local constants
const { base }     = themeconfig
    , { dist }     = config
    , empty        = `${base}/site/tobuildweb/sitemap.xml`
    , url          = `${config.company.url.protocol}://${config.company.url.domain}`
    , { website }  = config
    , { doc }      = config
    , output       = 'sitemap.xml'
    ;


// -- Local variables


// -- Gulp Private Tasks

/**
 * Creates the sitemap file.
 */
function buildsitemap() {
  const pages = [];

  /* eslint-disable-next-line */
  for (const key in website) {
    if (key === 'home') {
      pages.push({
        name: website[key].name,
        link: website[key].output.replace('/index.html', ''),
        priority: '1.0',
      });
    } else if (key !== 'oops') {
      pages.push({
        name: website[key].name,
        link: website[key].output.replace(/^\//, ''),
        priority: '0.8',
      });
    }
  }

  if (doc) {
    for (let i = 0; i < doc.length; i++) {
      for (let j = 0; j < doc[i].children.length; j++) {
        if (doc[i].children[j].output) {
          pages.push({
            name: doc[i].children[j].name,
            link: doc[i].children[j].output.replace(/^\//, ''),
            priority: '0.8',
          });
        }
      }
    }
  }

  return src(empty)
    .pipe(sitemap(url, pages, extra, expired))
    .pipe(concat(output))
    .pipe(dest(dist))
  ;
}


// Gulp Public Tasks:
module.exports = buildsitemap;
