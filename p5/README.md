# p5.js Starter Guide

[Reference](https://p5js.org/get-started/)

## Online Editor

You can code with the [online editor](https://editor.p5js.org/). Refer to this [guide](https://p5js.org/get-started/).

## Setup

### Downloading a Copy of the p5.js library

The easiest way to start is by using the empty example that comes with the [p5.js complete download](https://p5js.org/download/). </br>

After download, you need to set up a local server. See the instructions [here](https://github.com/processing/p5.js/wiki/Local-server). </br>

If you look in [index.html](empty-example/index.html), you'll notice that it links to the file p5.js. If you would like to use the minified version (compressed for faster page loading), change the link to p5.min.js.

```js
<script src ="../p5.min.js"></script>
```

### VS Code Live Server

Using the [Live Server extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) we can easily run a development web server for any local folder. </br>
Instructions:

* Open the VS Code extension manager(```CTRL-SHIFT-X``` / ```CMD-SHIFT-X```).
* Search for and install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
* Add a p5.js project folder to your VS Code Workspace.
* With your project's ```index.html``` or   ```sketch.js``` file open, start the Live Server using the "Go Live" button in the status bar, or by using ```ALT-L``` ```ALT-O```.
* Your sketch should now open in your default browser at location: ```127.0.0.1:5500```
**Another handy VS Code extension is [p5.vscode](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode) which includes a project generator, an easy way to install contribution libraries, and adds p5.js autocompletion support.**

### Local-server via Web Server for Chrome

[Reference](https://github.com/processing/p5.js/wiki/Local-server) </br>

**Probably the easiest way to setup a local server for all text editors.** </br>
</br>
We will be using the [Web Server for](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related) [Chrome extension](https://en.wikipedia.org/wiki/Google_Chrome_App). Note that this feature is being [deprecated](https://support.google.com/chrome/thread/174381169?visit_id=638099376104476002-4011439868&p=chrome_app_deprecation&rd=1). </br>
</br>
There are other ways to setup a localhost in the reference above. </br>
</br>
Install the extension via the Chrome Web Store. To launch, got to ```chrome://apps``` or type Web Server for Chrome in your OS search bar and select *Web Server for Chrome*. </br>
</br>
After launching the app a new window will open. There you can click [CHOOSE FOLDER] and select the folder with the HTML page for your sketch. Now you can just click on the Web Server URL (```http://127.0.0.1:8887``` by default) to see and open your sketch. if you name your sketch HTML page ```index.html``` and enable ```Automatically show index.html```, your sketch will load as soon as you open the URL! You can also choose to run the server in the background, make the web server accessible to other computers on your local area network, prevent your computer from going to sleep mode when the server is running, and can change the port of your URL.

### Using a hosted version of the p5.js library (Did not use)

Alternatively, you can link to a p5.js file hosted online. ALl versions of p5.js are stored in a CDN (Content Delivery Network). You can find a history of these versions in the [p5.js CDN](https://cdn.jsdelivr.net/npm/p5/lib/). In this case, you can change the link to:

```js
<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
```

A sample HTML page might look like this:

```js
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body>
    <main>
    </main>
  </body>
</html>
```

### Environment / Creating + Running Projects

**In this course, I am using VSCode from Microsoft** </br>
Open VSCode. Open or make the folder that your html and js files are located in. Open your JavaScript file and you can edit it in VSCode. </br>
</br>
When you're done, open your project (for our demonstration, ```empty-example```) in the Chrome browser by going to ```http://localhost:{your-port-num}/empty-example``` if you are using a local server) in Chrome to view your sketch. </br>
</br>
Parts of this tutorial were adapted from the book, Getting Started with p5.js, by Lauren McCarthy, Casey Reas, and Ben Fry, O'Reilly / Make 2015. Copyright © 2015. All rights reserved. Last modified at the p5.js 2019 Contributors Conference. </br>
