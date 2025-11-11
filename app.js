const btnHamburger = document.querySelector(".hamburger");
const menuPanel = document.querySelector(".menupanel");
const menuLinks = document.querySelectorAll(".menupanel a");
const frameImage = document.querySelector("#frame");
const images = ["PXL_20240814_164733313.MP.jpg", "Bridge thumbnail.jpg", "Core thumbnail.jpg", "elbowlever thumbnail.jpg", "kipupthumb.jpg", "parallelbars.jpg"];

let currentImageIndex = 0;

frameImage.addEventListener("click", () =>{
currentImageIndex++;
if(currentImageIndex >= 6) {
currentImageIndex = 0;
};
frameImage.src = "images/" + images[currentImageIndex];
});

btnHamburger.addEventListener("click", ()=> {
menuPanel.classList.toggle("active");
});

document.addEventListener("click", (event) => {
if(!menuPanel.contains(event.target) && !btnHamburger.contains(event.target)) {
    menuPanel.classList.remove("active");
}
});

menuLinks.forEach((link) => {
link.addEventListener("click", () => {
menuPanel.classList.remove("active");
});
});