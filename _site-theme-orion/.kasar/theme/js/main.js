/* ****************************************************************************
 * This script makes initializations.
 *
 * ************************************************************************** */
// ESLint declarations
/* global jQuery, cookieChoices, hljs, Pixi */
/* eslint one-var: 0, strict: ["error", "function"], semi-style: 0 */
(function($) {
  'use strict';

  $(document).ready(function() {
    var date
      , year
      , attr
      , text
      ;

    // -- Update the copyright date in the head and footer sections:
    date = new Date();
    year = date.getFullYear();
    attr = $('meta[name=copyright]').attr('content');
    $('meta[name=copyright]').attr('content', attr.replace('{{copyright:year}}', year));
    text = $('footer p.copyright').text();
    $('footer p.copyright').text(text.replace('{{copyright:year}}', year));

    // -- Start highlight script:
    // hljs.initHighlightingOnLoad();

    // -- Start the smooth scrolling:
    $('body').smoothScrolling({ buttons: '.nav' }, function() {
      //
    });

    //
  });
}(jQuery));
