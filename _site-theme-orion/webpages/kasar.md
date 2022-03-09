<!-- Kasar Contents -->
# Kasar

Kasar is static site generator. It creates a static website from markdown or HTML pages. It is powered by **Gulp** and **View**.

The advantages of the static web sites are their responsiveness, the limited server resources needed and the simplicity of installation.

Thus, you can run your website on cheapest web servers and you just need to copy and paste a folder to get your web server up and running!


## How to install Kasar

You first have to create an empty NPM project. When it is done, install **Kasar** with the command:

```bash
npm install @mobilabs/kasar --save
```

Then, you should add the three following scripts in the script section of the **package.json** file:

```javascript
{
  "scripts": {
    "kinit": "kasar init",
    "build": "kasar build",
    "app": "kasar serve"
  }
}
```

## Quick Startup

### How to create your project

You have to run the following command:

```bash
npm run kinit
```

The script creates the **site** folder with the following tree:

```bash
site
  |_ .kasar
  |_ img
  |_ php
  |_ styles
  |_ tasks
  |_ tobuildweb
  |_ webpages
  |_ config.js
```

These folders and files serve as:

  * **.kasar** contains the files required to generate the website for a given theme,
  * **img** contains the images specific to your project,
  * **php** contains the php scripts, running on the server, that your website could require,
  * **styles** contains only one file, **overrride.css**, that allows you to apply minor changes to the theme,
  * **tasks** contains the Gulp file **build** used by **kasar build** (it is a simple redirection to the task **build** under **.kasar**),
  * **tobuildweb** contains some useful files required by a website (.htaccess, robot.text, etc.),
  * **webpages** contains the contents of your web pages (markdown or html),
  * **config.js** contains some configuration parameters specific to your website,


### How to build your website

Just type the following command:

```bash
npm run build
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
npm run web
```

This command launches a local web server running at the address **http://localhost:8080** that displays your website on your browser.


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
  |     |_frontpage.md
  |     |_kasar.md
  |     |_legal.md
  |
```

For instance, open the file **frontpage.md** add some text and save. You will see that the web page is automatically reloaded with the the changes you made.

The contents of a page could be written using **markdown** syntax or **HTML** syntax. **Markdown** pages must have the extension **.md** while **HTML** pages must have the extension **.html**.


### How to add new pages

In the folder **webpages** create a new file with the extension **.md**. Then, add some markdown contents and save it.

You should now register your new page in **config.js**.

Open **config.js** and go the the section:

```javascript
website: {
  home: {
    name: 'Home',
    title: 'My Company | We are expert in ...',
    description: 'this page ...',
    content: `${base}/site/webpages/frontpage.md`,
    output: `${basepath}index.html`,
  },
  kasar: {
    name: 'Kasar',
    title: 'Kasar Tutorial',
    description: 'Explains how to use it.',
    content: `${base}/site/webpages/kasar.md`,
    output: `${basepath}kasar.html`,
  },

  ...
},
```

Now, add your new page:

```javascript
website: {
  ...
  mypage: {
    name: 'My Page',
    title: 'My page ...',
    description: 'My page does ...',
    content: `${base}/site/webpages/mypage.md`,
    output: `${basepath}mypage.html`,
  },
  ...
},
```

You new page is described by an object with the properties:

  * **name**: the name you give to your page,
  * **title**: the title displayed by the metatag **`<title>`** in the head of the HTML page,
  * **description**: the content of the metatag **`<meta name="description" content="..."`**,
  * **content**: the path where to find your markdown or html file,
  * **output**: the url of your webpage,


## How Kasar works

**Kasar** consists of tho main parts: scripts and page creation.

The scripts are used to create the distribution by copying files, bundling and uglifying javascript files, bundling and minifying css files, etc.

The page creation builds the web page in a virtual DOM and then serializes it to an XML string.


### Gulp runner

The scripts are simple Gulp tasks. Gulp is a runner. It is for Javascript projects what **make** is to C/C++ projects.

The Gulp tasks are located here:

```bash
site
  |_ .kasar
        |_ theme
            |_ tasks
                |_ _kasar
                |_ build.js
                |_ cleanup.js
                |_ dohtml5.js
                |_ dopages.js
                |_ dophp.js
                |_ dopostskeleton.js
                |_ doproject.js
                |_ dositemap.js
                |_ doskeleton.js
                |_ remove.js
```

Each script is dedicated to a specific task. In brief:

  * **build.js** is the entry point. This script call the scripts `remove.js`, `doskeleton.js`, `dopages.js`, `dositemap.js` and `cleanup.js` in sequence,
  * **remove.js** removes the previous distribution,
  * **doskeleton.js** creates the distribution and fills it with everything (js, css, etc.) except the webpages,
  * **dopages.js** calls the page creation module to generate the webpages,
  * **dositemap.js** creates the `sitemap.xml` file,
  * **cleanup.js** removes the created temporary files,

The other scripts are just companion scripts to `doskeleton.js`. Their goal is to supply `doskeleton.js` in a very specialized tasks (bundle js, budndle css, etc.).

From one theme to another, most of the scripts won't be affected. In general, only **dopages.js** could need to be adapted in function of the complexity of your theme.


### Page creation

The webpages are created in a virtual DOM in a similar way we create web apps. For this, we rely on two npm modules: **jsdom** and **@mobilabs/view**.

**jsdom** creates the virtual DOM in which **@mobilabs/view** creates the web pages.


#### Main section

The **pages/main.js** file offers a function **createPage** that acts as the interface with **dopages.js**.

**createPage** creates the Virtual DOM and fills it with the head section, an empty body and the script section. Then, it asks to **pages/components/app/app.js** to generate the body contents in the virtual DOM. Finally, it serializes the contents of the virtual DOM and returns an XML string, representing the web page, to **dopages.js**.


### Components section

This is the place where the body contents of the web page is produced.

**pages/components/app/app.js** creates the body contents skeleton and then asks to specialized components to fill it:

  * **header** fills the VDOM with the header section,
  * **marketing** fills the VDOM with the marketing section of the front page,
  * **content** fills the VDOM with the contents for the internal pages,
  * **menus** fills the VDOM with the menus,
  * **footer** fills the VDOM with the footer,


### Components structure

Components (header, menus, footer, etc.) are created thanks to **@mobilabs/view**. A component folder is generally composed of two files a `.css` and a `.js` file.

The `.css` file contains the style to apply to a component and the `.js` file is a **View** component.

For instance, the folder **footer** contains the files `footer.css` and `main.js`. And `main.js` contains:

```javascript
const Footer = View.Component({

  /**
   * Adds the copyright.
   */
  set(copyright) {
    this.$('.copyright').text(copyright);
    return this;
  },

  /**
   * Renders the web component.
   */
  render() {
    this.children = { '<BOTMenu />': BOTMenu };

    return `
      <footer class="container">
        <!-- legal -->
        <div class="legal pure-g">
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p class="copyright">{{head:copyright}}</p>
          </div>
          <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <BOTMenu />
          </div>
        </div><!-- /.legal -->
      </footer><!-- /.footer -->
    `;
  },
});
```

This is pretty straightforward to understand. But, if you want to create your own components, you have to learn how **@mobilabs/view** works.


## How to change a theme

### Minor changes

If you need just to apply some cosmetic styling modifications, you can overwrite the theme styling thanks to the file **site/styles/override.css**.


### Consistent changes

If you want to apply more consistent changes, you have to modify some components of the default theme.

For instance, if you want to change the layout of the folder, you have to change the template of the **site/.kasar/theme/pages/components/folder/main.js** file:

```Javascript
  render() {
  this.children = { '<BOTMenu />': BOTMenu };

  return `
    <footer class="container">
      <!-- legal -->
      <div class="legal pure-g">
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <p class="copyright">{{head:copyright}}</p>
        </div>
        <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          <BOTMenu />
        </div>
      </div><!-- /.legal -->
    </footer><!-- /.footer -->
  `;
  },
```

As the template is a pure set of HTML tags (no directives!), it is pretty straightforward to set a new layout.


## How to create a new theme

**Kasar** is shipped with two templates: **start** and **orion**.

**start** is a very basic template with four pages while **orion** is more a sophisticated one. This later has been designed to display code documentation.


### How to install a specific theme

By default, the `npm run kinit` command installs the **start** theme. If you want to install **orion** theme, you have to pass arguments to the kinit script like this:
```javascript
{
  "scripts": {
    "kinit": "kasar init -theme orion",
    ...
  }
}
```

### The differences

If you compare these  two themes, you will notice that the Gulp scripts are identical except the **dopages.js** script. It is a bit more complex for the **orion** theme as there are more parameters to manage.

**pages/main.js** files are almost identical too. In fact the main differences are on the **components** (the files under **pages/components**). It is easily understandable as these files define the layout of the web pages and the style.


### How to Start

Thus, the best option is to start from the the **start** theme and adapt the **page/components** section to match your layout.

That's all!

<!-- /.kasar contents -->
