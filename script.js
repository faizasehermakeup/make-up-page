const galleryTrack = document.getElementById("gallery-track");

// Only 2 images for now
const imageList = ["image1.jpg", "image2.jpg"];

// Load images
imageList.forEach(fileName => {
  const img = document.createElement("img");
  img.src = `images/${fileName}`;
  img.alt = "Makeup Portfolio";
  img.onclick = () => window.open(img.src, "_blank"); // open raw
  galleryTrack.appendChild(img);
});

// Smooth horizontal scroll with mouse wheel
const gallery = document.querySelector(".gallery");
gallery.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  gallery.scrollLeft += evt.deltaY;
});
