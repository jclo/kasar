---
name: 'kasar'
title: 'Kasardoceo |  Kasar Tutorial'
description: 'this page explains how to ...'
---

<!-- Kasar Contents -->

# Kasar

Kasar is static site generator. It creates a static website from markdown or HTML pages. It is powered by **npm scripts** and **RView**.

The advantages of the static web sites are their responsiveness, the limited server resources needed and the simplicity of installation. Thus, you can run your website on cheapest web servers and you just need to copy and paste a folder to get your web server up and running!


## How to install Kasar

You first have to create an empty NPM project. When it is done, install **Kasar** with the command:

::: info
npm install @mobilabs/kasar --save
:::

Then, you should add the four following scripts in the script section of the **package.json** file:

```javascript
{
  "scripts": {
    "kasar:init": "kasar init --theme $1",
    "kasar:build": "kasar build",
    "kasar:watch": "kasar watch",
    "kasar:start": "kasar serve --port $1"
    
  }
}
```

## Quick Startup

### Fill the vendor folder

The `start` and `doceo` themes requires the `Montserrat` fonts and `Highlight.js` as a code syntax highlighter. These packages must be downloaded from their respective websites. The readme file in the vendor folder gives instructions how to proceed.


### How to create your project

You have to run the following command:

```bash
npm run kasar:init
# or
npm run kasar:init --theme start
```

The script install the default **start** theme. It creates the **site** folder with the following tree:

```bash
site
  |_ .kasar
  |_ img
  |_ js
  |_ php
  |_ styles
  |_ tobuildweb
  |_ vendor
  |_ webpages
  |_ config.js
  |_ sw.js
```

These folders and files serve as:

  * **.kasar** contains the files required to generate the website for a given theme,
  * **img** contains the images specific to your project,
  * **js** contains an empty js file,
  * **php** contains the php scripts, running on the server, that your website could require,
  * **styles** contains only one file, **overrride.css**, that allows you to apply minor changes to the theme,
  * **tobuildweb** contains some useful files required by a website (.htaccess, robot.text, etc.),
  * **vendor** contains vendor libraries or fonts specific to your project,
  * **webpages** contains the contents of your web pages (markdown or html),
  * **config.js** contains some configuration parameters specific to your website,


### How to build your website

Just type the following command:

```bash
npm run kasar:build
```

A new folder, **_dist**, appears under **site**:

```bash
site
  |_ _dist
  |_ .kasar
  |_ img
  |_ ...
```

This folder contains all the files requires to run a website (index.html, css, js, etc.).


### How to run your website

Just type the following command:

```bash
npm run kasar:start
```

This command starts a local web server at the address **http://localhost:8080**. It displays your website in your browser.

If you want the local web server to listen on a different port, specify it in this way:

```bash
npm run kasar:start 8090 
```

## How to apply changes

### How to change an existing page

The contents of the pages of your website is located inside the folder **webpages**:

```bash
site
  |_ .kasar
  |_ ...
  |_ webpages
  |     |_ 404.md
  |     |_ contact.md
  |     |_ index.md
  |     |_ kasar.md
  |     |_ legal.md
  |     |_ offline.md
  |
```

For example, open **index.md**, add some text and save. You will see that the web page is automatically reloaded with the changes you have made.

The contents of a page could be written using **markdown** syntax or **HTML** syntax. **Markdown** pages must have the extension **.md** while **HTML** pages must have the extension **.html**.


### How to add new pages

In the folder **webpages** create a new file with the extension **.md**. Then, add some markdown contents and save it.

You should now register your new page in **config.js**.

Open **config.js** and go the the section:

```javascript
  website: {
    fr: [
      `${base}/site/webpages/${FR}/index.md`,
      `${base}/site/webpages/${FR}/kasar.md`,
      `${base}/site/webpages/${FR}/contact.md`,
      `${base}/site/webpages/${FR}/legal.md`,
      `${base}/site/webpages/${FR}/404.md`,
      `${base}/site/webpages/${FR}/offline.md`,
    ],
    en: [
      `${base}/site/webpages/${EN}/index.md`,
      `${base}/site/webpages/${EN}/kasar.md`,
      `${base}/site/webpages/${EN}/contact.md`,
      `${base}/site/webpages/${EN}/legal.md`,
      `${base}/site/webpages/${EN}/404.md`,
      `${base}/site/webpages/${EN}/offline.md`,
    ],
  },
```

Now, add your new page:

```javascript
  website: {
    fr: [
      `${base}/site/webpages/${FR}/mynewpage.md`,
      ...
```

You new page must contain a yaml header that provides the **title** and the **description** of your page that are added to the head section of the html page:

```md
---
name: 'mynewpage'
title: 'My New Page | Fantastic'
description: 'this page ...'
---
```

## How Kasar works

**Kasar** consists of tho main parts: scripts and page creation.

The scripts are used to create the distribution by copying files, bundling and uglifying javascript files, bundling and minifying css files, etc.

The page creation builds the web page in a virtual DOM and then serializes it to an XML string.


### Scripts

The scripts are simple npm scripts.

The npm scripts are located here:

```bash
site
  |_ .kasar
        |_ theme
            |_ tasks
                |_ libs
                |_ build.skeleton.js             # <-- create the skeleton of the web site (js, css, php, etc.),
                |_ build.skeleton.css.js
                |_ build.skeleton.fonts.js
                |_ build.skeleton.html5.js
                |_ build.skeleton.img.js
                |_ build.skeleton.js.js
                |_ build.skeleton.js.libs.js
                |_ build.skeleton.php.js
                |_ build.skeleton.post.js
                |_ build.skeleton.trackers.js
                |_ build.project.js              # <-- convert md files to html pages,
                |_ build.project.img.js
                |_ build.project.pages.js
                |_ build.project.sitemap.js
```

Each script is dedicated to a specific task. In brief:

  * **build.skeleton.js** is the entry point. It creates the website through dedicated scripts,
  * **build.project.js** creates the web pages from md files and generate sitemap.xml,

From one theme to another, most of the scripts won't be affected. In general, only **build.project.js** could need to be adapted in function of the complexity of your theme.


### Page creation

The webpages are created in a virtual DOM in a similar way we create web apps. For this, we rely on two npm modules: **jsdom** and **@mobilabs/rview**.

**jsdom** creates the virtual DOM in which **@mobilabs/rview** creates the web pages.


#### Main section

The **pages/main.js** file offers a function **createPage** that acts as the interface with **build.project.pages.js**.

**createPage** creates the Virtual DOM and fills it with the head section, an empty body and the script section. Then, it asks to **pages/components/app/app.js** to generate the body contents in the virtual DOM. Finally, it serializes the contents of the virtual DOM and returns an XML string, representing the web page, to **build.project.pages.js**.


### Components section

This is the place where the body contents of the web page is produced.

**pages/components/app/app.js** creates the body contents skeleton and then asks to specialized components to fill it:

  * **header** fills the VDOM with the header section,
  * **marketing** fills the VDOM with the marketing section of the front page,
  * **content** fills the VDOM with the contents for the internal pages,
  * **menus** fills the VDOM with the menus,
  * **footer** fills the VDOM with the footer,


### Components structure

Components (header, menus, footer, etc.) are created thanks to **@mobilabs/rview**. A component folder is generally composed of two files a `.css` and a `.js` file.

The `.css` file contains the style to apply to a component and the `.js` file is a **View** component.

For instance, the folder **footer** contains the files `footer.css` and `main.js`. And `main.js` contains:

```javascript
const Footer = RView.Component({

  // -- Overwritten Methods ----------------------------------------------------

  /**
   * Returns the XMLString of the component.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the state properties,
   * @param {Object}        the optional properties,
   * @returns {XMLString}   returns the XMLString of the component,
   * @since 0.0.0
   */
  render(state/* , props */) {
    this.children = { '<BOTMenu />': BOTMenu };

    return `
      <footer class="container">
        <!-- legal -->
        <div class="legal">
          <div>
            <p class="copyright">${state.copyright || 'unknown copyright'}</p>
          </div>
          <div>
            <BOTMenu />
          </div>
        </div><!-- /.legal -->
      </footer><!-- /.footer -->
    `;
  },


  // -- Specific Methods -------------------------------------------------------

  /**
   * Adds the copyright.
   *
   * @method (arg1)
   * @public
   * @param {String}        the copyright,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  set(copyright) {
    this.$setState({ copyright });
    return this;
  },
});
```

This is pretty straightforward to understand. But, if you want to create your own components, you have to learn how **@mobilabs/rview** works.


## How to change a theme

### Minor changes

If you need just to apply some cosmetic styling modifications, you can overwrite the theme styling thanks to the file **site/styles/override.css**.


### Consistent changes

If you want to apply more consistent changes, you have to modify some components of the default theme.

For instance, if you want to change the layout of the footer, you have to change the template of the **site/.kasar/theme/pages/components/footer/main.js** file:

```Javascript
render(state/* , props */) {
  this.children = { '<BOTMenu />': BOTMenu };

  return `
    <footer class="container">
      <!-- legal -->
      <div class="legal">
        <div>
          <p class="copyright">${state.copyright || 'unknown copyright'}</p>
        </div>
        <div>
          <BOTMenu />
        </div>
      </div><!-- /.legal -->
    </footer><!-- /.footer -->
  `;
```

As the template is a pure set of HTML tags (no directives!), it is pretty straightforward to set a new layout.


## How to create a new theme

**Kasar** is currenlty shipped with two templates: **start** and **doceo**.

**start** is a very basic template with four pages while **doceo** is more a sophisticated one. This later has been designed to build code documentation websites.


### How to install a specific theme

By default, the `npm run kinit` command installs the **start** theme. If you want to install **doceo** theme, you have to pass arguments to the kasar:init script like this:
```javascript
{
  "scripts": {
    "kasar:init": "kasar init --theme doceo",
    ...
  }
}
```

### The differences

If you compare these  two themes, you will notice that the npm scripts are identical except the **build.project.pages.js** script. It is a bit more complex for the **doeco** theme as there are more parameters to manage.

**pages/main.js** files are almost identical too. In fact the main differences are on the **components** (the files under **pages/components**). It is easily understandable as these files define the layout of the web pages and the style.


### How to Start

Thus, the best option is to start from the the **start** theme and adapt the **page/components** section to match your layout.

That's all!

<!-- /.kasar contents -->
