document.body.classList.remove("is-noJs");

// fix images not loading
var images = document.querySelectorAll("img.progressiveMedia-thumbnail");
for (var i = 0; i < images.length; i++) {
    var img = images[i];
    let src = img.src;
    if (src.indexOf("freeze") >= 0)  {
        var new_src = src.replace("/freeze", "");
        new_src = new_src.replace("/24/", "/800/");
        new_src = new_src.replace("/30/", "/2000/");
        img.src = new_src
        img.classList.remove("progressiveMedia-thumbnail");
        img.classList.remove("js-progressiveMedia-thumbnail");
        img.classList.add("graf-image");
        //console.log(src, "has been changed to", new_src);
    }
}

// fix youtube not loading
var frames = document.querySelectorAll("iframe.progressiveMedia-iframe");
for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var thumb = frame.dataset.thumbnail;
    let yt_index = thumb.indexOf("ytimg.com");
    if (yt_index >= 0) {
        let video_id = thumb.substring(yt_index + 17, thumb.indexOf("%2F", yt_index + 17));
        frame.src = "https://www.youtube.com/embed/" + video_id;
    }
}
