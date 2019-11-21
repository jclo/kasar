# How to Highlight your Code

If you want to include some code examples in your documentation, you can do it like this:

```js
function buildsitemap() {
  const pages = { internal: { base: '' } };

  for (const key in website) {
    if (key === 'home') {
      pages[key] = website[key].name;
    } else if (key !== 'oops') {
      pages.[key] = website[key].name.replace(/.html/, '');
    }
  }

  return src(empty)
    .pipe(sitemap(url, pages, extra, expired))
    .pipe(concat(output))
    .pipe(dest(dist))
  ;
}
```

The code is highlighted if you download the library `highlight.js` and put it in this folder. It is available [here](https://highlightjs.org). The library isn't included here because it requires building (see instruction on the website).

When the library is available, you just have to uncomment, in the file `./kasar/theme-config`, the lines:

```javascript
libs: {
  minified: [
    `${base}/node_modules/jquery/dist/jquery.min.js`,
    ...
    // `${base}/site/vendor/highlight/highlight.pack.js`,  <--- uncomment
    ...
  ],
  ...
  css: [
    // From vendor:
    `${base}/node_modules/purecss/build/pure.css`,
    ...
    // `${base}/site/vendor/highlight/styles/default.css`,  <--- uncomment
  ],
```

in the file `config.js`, the line:

```Javascript
scripts: [
  ...
  // `${basepath}vendor/libs/highlight.pack.js`,  <--- uncomment
  ...
  `${basepath}js/main.min.js`,
],


```


and, in the file `.kasar/theme/js/main.js`, the line:

```javascript
// -- Start highlight script:
// hljs.initHighlightingOnLoad();  <--- uncomment
```

That's all!
