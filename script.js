// alert("Baaaaaaaaaaaaa! Youre on! 🎇");
// console.log("Hi there!");

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//unsplash API
let count = 10;
const apiKey = "BF-O9zwbUVAhtj6dAlCyqpk_RU8y_CvInUbHY-QB7so";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if image is loaded---
function imageLoaded() {
  loader.hidden = true;
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;

    count = 30;
  }
}

//helper function for attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elelments and add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    //create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img>
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //adding loade event listener to image--

    img.addEventListener("load", imageLoaded);

    //put image inside <a>. and put both inside image container.

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash
async function getPhotos() {
  //   loader.hidden = false;
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();

    displayPhotos();
    // loader.hidden = true;
  } catch (err) {
    console.log(err.message);
  }
}

//check to see if scrolling near bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
