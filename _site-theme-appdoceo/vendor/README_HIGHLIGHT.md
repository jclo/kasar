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
    // `${base}/site/vendor/highlight/highlight.min.js`,  <--- uncomment
    ...
  ],
  ...
  csshighlight: [
    // `${base}/site/vendor/highlight/styles/atom-one-dark.min.css`,  <--- uncomment
    // `${base}/site/vendor/highlight/styles/atom-one-light.min.css`,  <--- uncomment
  ],
```

in the file `config.js`, the line:

```Javascript
scripts: [
  ...
  // `${basepath}vendor/libs/highlight.min.js`,  <--- uncomment
  ...
  `${basepath}js/main.min.js`,
],
```

In the file `.kasar/theme/js/main.js`, the line:

```javascript
// -- Start highlight script:
// hljs.highlightAll();  <--- uncomment
```

And in the file `.kasar/theme/js/colortheme.js`, the lines:

````javascript
  const IMGDARK  = 'img/theme-dark-moon-3-stars.svg'
      , IMGLIGHT = 'img/theme-light-sun.svg'
      // , CSSDARK  = 'atom-one-dark.min.css'   <--- uncomment
      // , CSSLIGHT = 'atom-one-light.min.css'  <--- uncomment
      ;
...
  window.addEventListener('load', () => {
    const theme = document.querySelector('#switchtheme');
    setThemeIcon(theme);
    // setHighlight();

    theme.addEventListener('click', (e) => {
      e.preventDefault();
      toogleTheme();
      setThemeIcon(theme);
      // setHighlight();
    });
  });
````

That's all!
