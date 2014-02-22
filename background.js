// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
function getClickHandler() {
  return function(info, tab) {
    var imageSource = info.srcUrl;

    var imageSourceParts = imageSource.split('/');
    var media = imageSourceParts[5];
    var competitionId = imageSourceParts[7];
    var image = imageSourceParts[9].substring(1);
    
    var usaMuscleImageSrc = "http://www.usamuscle.com/members/assets/content/" + media + "/galleries/" + competitionId + "/" + "hd/" + image;

    // The srcUrl property is only available for image elements.
    var url = 'info.html#' + usaMuscleImageSrc;

    // Create a new window to the info page.
    chrome.windows.create({ url: usaMuscleImageSrc });
  };
};

function printAlert(e) {
    var imageSrc = e.target.src;
    if (isBodybuilderImage(imageSrc)) {
        alert("Kavier: " + largeImageSrc(imageSrc));
    }
}
*/

function changeUrl(link, image) {
    var imageSrc = image.src;
    if (isBodybuilderImage(imageSrc)) {
		if (UrlExists(largeImageSrc(imageSrc))) {
	        link.href = largeImageSrc(imageSrc);
		} else 
		{
	        link.href = smallImageSrc(imageSrc);
		}
    }
}

function isBodybuilderImage(image) {
    if (image.indexOf('thumbnails') != -1) {
        return true;
    }
    return false;
}

function largeImageSrc(imageSource) {
	return imageSrc(imageSource, "hd", true);
}

function smallImageSrc(imageSource) {
	return imageSrc(imageSource, "fullsize", false);
}

function imageSrc(imageSource, size, isProtected) {
    var imageSourceParts = imageSource.split('/');
    var media = imageSourceParts[5];
    var competitionId = imageSourceParts[7];
    var image = imageSourceParts[9].substring(1);

    var usaMuscleImageSrc = "http://www.usamuscle.com/";
    if (isProtected) {
		usaMuscleImageSrc = usaMuscleImageSrc + "members/";
	}
	usaMuscleImageSrc = usaMuscleImageSrc + "assets/content/" + media + "/galleries/" + competitionId + "/" + size + "/" + image;
    return usaMuscleImageSrc;
}

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status != 404;
}

/**
 * Add event listener to show the image when click
document.addEventListener("DOMContentLoaded", function() {
 */
    //This code is ran when the DOM content has been loaded
    //I.E. the elements we are trying to get exist on the page
    var imgs = document.getElementsByTagName("img");
    for(var i = 0; i < imgs.length; ++i) {
        var element = imgs[i];
        changeUrl(element.parentNode, element);
    }
