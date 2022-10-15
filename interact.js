const header = document.querySelector("header");
const thumImg = document.querySelector(".thumnail_img");

window.onload = () => {
  const thumImgPos = thumImg.getBoundingClientRect();
  if(-thumImgPos.y > 30) {
    thumImg.style.height = "0px";
    return;
  }
  thumImg.style.transitionDuration = ".9s";
  thumImg.style.transitionTimingFunction = "cubic-bezier(0.83, 0, 0.17, 1)";
  thumImg.style.opacity = 1;
  header.style.transitionDuration = ".3s";
};

thumImg.addEventListener("touchstart", () => {
  thumImg.style.height = "0px";
  // thumImg.style.width = "0px";
  // thumImg.style.border = "50% 20% / 10% 40%";
});