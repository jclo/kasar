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

When the library is available, you just have to uncomment in the file `theme-config` the line:

```javascript
libs: {
  minified: [
    `${base}/node_modules/jquery/dist/jquery.min.js`,
    ...
    // `${base}/site/vendor/highlight/highlight.pack.js`,
    ...
  ],
```

and in the file `config.js`, the line:

```Javascript
scripts: [
  ...
  // `${basepath}vendor/libs/highlight.pack.js`,
  ...
  `${basepath}js/main.min.js`,
],
```

That's all!
