# leaflet-basic-circles-example

Hi class, </br>

I wanted to let you know that I updated the code for the Digital NYC assignment. The assignment contains the link to the new ZIP file. </br>
</br>
The main changes are:

1. app.js (the main code) is now a very stripped down version that is meant to just let you see if the data is being loaded correctly. The other code, which interacts with all of those HTML input elements, is in app.complex.js. Whichever file is named app.js is the one that is going to be loaded.

2. If you are interested in hosting your own webserver and don't want to use Node for it, the code will work if served locally on a WAMP or MAMP. (If you don't know what this means... then probably don't try it.) The only change you have to make is to change the reference in index.html from bundle.js to app.js.

3. I figured out a way to make the map look more "dark mode" by applying CSS filters to the Google Map tile images, which makes the data a little more legible. style.css has the relevant change in it if you want to tweak it/play with it.
