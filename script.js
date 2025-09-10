const galleryTrack = document.getElementById("gallery-track");

const imageList = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"];

// Load images dynamically
imageList.forEach(fileName => {
  const img = document.createElement("img");
  img.src = `images/${fileName}`;
  img.alt = "Makeup Portfolio";
  img.onclick = () => window.open(img.src, "_blank"); // open raw image
  galleryTrack.appendChild(img);
});

// Get gallery container
const gallery = document.getElementById("gallery");

// Mouse wheel horizontal scroll
gallery.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  gallery.scrollLeft += evt.deltaY;
});

// Arrow navigation
const leftArrow = document.getElementById("arrow-left");
const rightArrow = document.getElementById("arrow-right");

const scrollAmount = 320; // move one image width

leftArrow.addEventListener("click", () => {
  gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
});
