# lnreader

### !Update!

The project started as an idea of making a web based substitute for the epub reader that I once have had on my laptop - Foliate, but with some quirks that are easy to implement having it as a WebApp. After I setted up Gentoo as my main system I couldn't compile Foliate and I honestly don't like any other alternatives as even for now. But I came to realize that making _everything_ web based is a bad idea and even a worse idea is too try to substitute back end side of a things with a bloated front end. Though the project was fun and educational as a part of my learning path, I'll continue its development, but considering the issue that I've made to many things on a front end side of the things I'll do a usable rework. Have a nice day!

### Preview:

![readerPreview-home](https://github.com/lnn0q/lnreader/blob/main/preview/img-home.png)
![readerPreview-addbook](https://github.com/lnn0q/lnreader/blob/main/preview/img-addbook.png)
![readerPreview-delbook](https://github.com/lnn0q/lnreader/blob/main/preview/img-delbook.png)
![readerPreview-read](https://github.com/lnn0q/lnreader/blob/main/preview/img-read.png)
<!-- <video width="320" height="240" controls> -->
  <!-- <source src="./preview/lnreader.mp4" type="video/mp4"> -->
<!-- </video> -->

### Description:

Your handy e-pub lib&amp;reader for your browser!



_It is currently in development, but you can try the test-version without the backend trough emulating it with **http-server** and **json-server** **(make sure to install them before proceeding or run using npx)**. To start the preview run "./test-run.sh" from your projects folder(requries configuration). ~~It is pretty raw but soon enough you'll be able to see the full version.~~_

### Current tasks:

0. ~~Finish the API~~;

1. ~~Add 'Upload/Delete' buttons for lib~~;

2. ~~Add React Router support~~;

3. ~~Add 'Prev/Next' buttons~~;

4. Add bookmarking;

5. Translator feature (_highlighting?_);

6. 'Edit' button for lib;

7. Merge with backend repo.

### Additional info:

As a part of his course work my friend made the server part for this project. You can check it out [here](https://github.com/taketook34/ereader-backend). 
In order for it to work you should set up the variables inside of the current project to work with this back end instead of 'json-server' as a substitute and follow the instructions written in the back end project. 

Also, unfortunately, every piece of epub info, save for the server part of its initial unpacking, is being processed by the client and some things like epub links will not work properly, because links are not being hosted by a back end and can't be accessed trough internal front end structure without the entire epub being processed and held by a client, which is by itself would've been a reason for lags and bad accessibility. Also, the back end doesn't implement a translator feature and even though we can do this purely with a front end it is ultimately a bad idea to use a secret keys on a client side and is considered to be a bad practice.
