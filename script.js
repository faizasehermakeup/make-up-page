const galleryTrack = document.getElementById("gallery-track");

// Try to load images sequentially (image1, image2, image3...)
let index = 1;

function loadNextImage() {
  const img = new Image();
  img.src = `images/image${index}.jpg`;
  img.alt = "Makeup Portfolio";

  // If image loads → add it, then try next one
  img.onload = () => {
    img.onclick = () => window.open(img.src, "_blank"); // open raw
    galleryTrack.appendChild(img);
    index++;
    loadNextImage(); // try next image
  };

  // If image not found → stop loop
  img.onerror = () => {
    console.log(`No more images after image${index - 1}.jpg`);
  };
}

// Start loading from image1.jpg
loadNextImage();

// Smooth horizontal scroll
const gallery = document.querySelector(".gallery");
gallery.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  gallery.scrollLeft += evt.deltaY;
});
