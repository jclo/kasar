/* *****************************************************************************
 *
 * Generates the css output file.
 *
 * Private Functions:
 *  . _cptarteaucitroncss         copies ./styles/tarteaucitron.css to '_dist/css,
 *  . _cphighlightcss             copies css files to '_dist/css,
 *  . _buildcss                   bundles the css project files,
 *
 *
 * Public Static Methods:
 *  . Build                       executes build:skeleton:css,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* global */
/* eslint curly: 0 */


// -- Vendor Modules
import fs from 'fs';
import path from 'path';
import CleanCSS from 'clean-css';


// -- Local Modules
import themeconfig from '../../theme-config.js';
import config from '../../../config.js';


// -- Local Constants
const SRC               = './site/styles'
    , TARTEAUCITRON     = 'tarteaucitron.css'
    , { dist }          = config
    , { css }           = themeconfig
    , { csshighlight }  = themeconfig
    , { tarteaucitron } = config
    , { bundle }        = themeconfig
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Copies ./styles/tarteaucitron.css file to '_dist/css.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cptarteaucitroncss(done) {
  if (!tarteaucitron || !tarteaucitron.sitega4id) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css:copy:tarte:au:citron:css\x1b[89m\x1b[0m\'...\n');

  fs.cp(`${SRC}/${TARTEAUCITRON}`, `${dist}/css/${TARTEAUCITRON}`, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css:copy:tarte:au:citron:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Copies css files to '_dist/css.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cphighlightcss(done) {
  if (!csshighlight || !csshighlight.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css:copy:highlight:css\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = csshighlight.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css:copy:highlight:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < csshighlight.length; i++) {
    filename = path.basename(csshighlight[i]);
    fs.cp(csshighlight[i], `${dist}/css/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}

/**
 * Bundles the css project files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _buildcss(done) {
  if (!css || !css.length) {
    done();
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css:build:css\x1b[89m\x1b[0m\'...\n');

  const options = {
    specialComments: 1,
    format: 'keep-breaks',
    // rebaseTo: './theme/pages/components/css',
  };

  let mincss = ''
    , content
    , afile
    ;

  for (let i = 0; i < css.length; i++) {
    content = fs.readFileSync(css[i], 'utf-8');

    afile = path.resolve(css[i]);
    options.rebaseTo = path.dirname(afile);
    mincss += new CleanCSS(options).minify({ [afile]: { styles: content } }).styles;
  }
  mincss = mincss.replace(/..\/webfonts/g, '../fonts/fontawesome-free/webfonts');

  fs.writeFile(`${dist}/css/${bundle}.min.css`, mincss, { encoding: 'utf8' }, (err) => {
    if (err) throw new Error(err);

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css:build:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}


// -- Public -------------------------------------------------------------------

/**
 * Executes build:css.
 *
 * @function (arg1)
 * @public
 * @param {Function}        to be call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function Build(done) {
  const PENDING = 3;

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:css\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:css\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  _buildcss(next);
  _cphighlightcss(next);
  _cptarteaucitroncss(next);
}


// -- Export
export default Build;
