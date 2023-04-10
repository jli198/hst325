# iZone

You've found a dataset, now you've got to visualize it using Leaflet! </br>
</br>
How to go about this:

1. Download my visualization example here: [leaflet-basic-circles-example.zip](/leaflet-basic-circles-example/). Install it with **npm** like before. Make sure it works first. It has two versions of its itself inside: one called **app.js** which is a VERY SIMPLIFIED version of the visualization, and the other called **app.complex.js** which shows how the visualization works with more complex filters. Whichever is named app.js is the one in use by the program; feel free to rename them to see the differences. I would start with app.js to get your data visible in the first place, and then start bringing in more features. **Note that I have updated this ZIP file since we saw it in class.**

2. Open up the .csv file that it uses for its data source in Excel or Google Sheets or whatever spreadsheet program you have. Take a look at what it looks like. Each column needs to have a single row header. There needs to be some field with latitude and longitude points. Take a look at what the other fields (columns) look like.

3. Download the dataset you chose from the previous assignment (you can also change datasets at any time if you find that one doesn't work well for this). You will need to find a way to convert it to something that can be read in Excel/Sheets. Once you have it into Excel/Sheets, make sure it has the right row headings (again, there needs to be a SINGLE row of headers, there can't be two!), and do any sorting/culling you need to do to reduce the size of the dataset.

4. Hopefully your data will have latitude and longitude already. If not, you will need to **geocode** the addresses. I'll post a tutorial on doing that ASAP.

5. Then, work to **modify** the visualization code (look at both **index.html** and **app.js**) so that it shows your new dataset. This will involve modifying the names of variables, most likely, and possibly deleting or adding some functions based on the ones already there. **Feel free to reach out to me or Isaac if you don't know how to do something**.

6. When you're done and happy with it, upload it to the OneDrive into a folder called "**digital-nyc**." Write a **short discussion** of your dataset and your trials and tribulations here as what you turn in on Canvas.

I've been able to get comments back to most of you who turned in the Digital NYC assignment (if I haven't gotten them back to you, I will ASAP). </br>
</br>
My sense is that a lot of people did NOT get the previous assignment working, some got it SOMEWHAT working, and a few got it REALLY working. </br>
</br>
If you are in the "didn't get it working" category: meet with me or Isaac or someone else, and work to get it working! That is your assignment for this week. </br>
</br>
If you are in the "somewhat working" category: spend some time this week adding additional functionality to it. Colors, filtering, etc. </br>
</br>
If you are in the "really working" category: you can add more functionality if there's any you can think of, or you can spend the week making the interface look better (CSS styling). </br>
</br>
Either way — this is basically one more week to really figure out what was up with the Digital NYC visualization, and push it beyond! </br>
</br>
No write-up is necessary, but let me know what changes you made, briefly.
