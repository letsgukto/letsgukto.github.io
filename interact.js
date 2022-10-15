const header = document.querySelector("header");
const thumImg = document.querySelector(".thumnail_img");
const navBar = document.querySelector(".nav_bar");
  const navBtns = navBar.querySelectorAll(".nav_btn");
  let navBtnFocused = navBar.querySelector(".focus");
const days = document.querySelectorAll(".day");
const wraper = document.querySelector("#wraper");

const NAV_BAR_WIDTH = 1080; 
const NAV_BTN_WIDTH = 180;

let windowFocusingTimers = [];
let navBarFocusingTimers = [];

let windowHandler;
let navBarHandler;

let windowTimers = [];
let navBarTimers = [];

windowHandler = () => {
  const curY = window.scrollY + 58;
  let coorToScroll;
  if(curY < days[0].offsetTop - 58) {
    navBar.style.opacity = 0;
  } else {
    navBar.style.opacity = 1;
  }
  if(curY < days[0].offsetTop) {
    coorToScroll = NAV_BTN_WIDTH * (1.5) - window.screen.availWidth / 2;
  } else if(curY < days[1].offsetTop) {
    coorToScroll = NAV_BTN_WIDTH * (1.5) - window.screen.availWidth / 2
      + (curY - days[0].offsetTop) * (NAV_BTN_WIDTH) / (days[1].offsetTop - days[0].offsetTop);
  } else if(curY < days[2].offsetTop) {
    coorToScroll = NAV_BTN_WIDTH * (2.5) - window.screen.availWidth / 2
      + (curY - days[1].offsetTop) * (NAV_BTN_WIDTH) / (days[2].offsetTop - days[1].offsetTop);
  } else if(curY < days[3].offsetTop) {
    coorToScroll = NAV_BTN_WIDTH * (3.5) - window.screen.availWidth / 2
      + (curY - days[2].offsetTop) * (NAV_BTN_WIDTH) / (days[3].offsetTop - days[2].offsetTop);
  } else if(curY < days[4].offsetTop) {
    coorToScroll = NAV_BTN_WIDTH * (4.5) - window.screen.availWidth / 2
      + (curY - days[3].offsetTop) * (NAV_BTN_WIDTH) / (days[4].offsetTop - days[3].offsetTop);
  } else {
    coorToScroll = NAV_BTN_WIDTH * (5.5) - window.screen.availWidth / 2
      + (curY - days[4].offsetTop) * (NAV_BTN_WIDTH) / (wraper.offsetHeight - days[4].offsetTop);
  }

  navBar.removeEventListener("scroll", navBarHandler);
  navBar.scrollTo({ left : coorToScroll });
  navBarTimers.forEach((timer) => {
    clearTimeout(timer);
  });
  navBarTimers = [];
  navBarTimers.push(setTimeout(() => {
    navBar.addEventListener("scroll", navBarHandler);
    navBarTimers.forEach((timer) => {
      clearTimeout(timer);
    });
    navBarTimers = [];
  }, 100));
}


navBarHandler = () => {
  const curX = navBar.scrollLeft - NAV_BTN_WIDTH / 2;
  let coorToScroll = days[0].offsetTop;
  if(curX <= 0) {
    navBar.style.opacity = 0;
  } else {
    navBar.style.opacity = 1;
  }
  if(curX < NAV_BTN_WIDTH) {
    coorToScroll = days[0].offsetTop - 58 + curX * days[0].offsetHeight / NAV_BTN_WIDTH;
  } else if(curX < NAV_BTN_WIDTH * 2) {
    coorToScroll = days[1].offsetTop - 58 + (curX - NAV_BTN_WIDTH) * days[1].offsetHeight / NAV_BTN_WIDTH;
  } else if(curX < NAV_BTN_WIDTH * 3) {
    coorToScroll = days[2].offsetTop - 58 + (curX - NAV_BTN_WIDTH * 2) * days[2].offsetHeight / NAV_BTN_WIDTH;
  } else if(curX < NAV_BTN_WIDTH * 4) {
    coorToScroll = days[3].offsetTop - 58 + (curX - NAV_BTN_WIDTH * 3) * days[3].offsetHeight / NAV_BTN_WIDTH;
  } else if(curX < NAV_BTN_WIDTH * 5) {
    coorToScroll = days[4].offsetTop - 58 + (curX - NAV_BTN_WIDTH * 4) * days[4].offsetHeight / NAV_BTN_WIDTH;
  }

  window.removeEventListener("scroll", windowHandler);
  window.scrollTo({ top : coorToScroll });
  windowTimers.forEach((timer) => {
    clearTimeout(timer);
  });
  windowTimers = [];
  windowTimers.push(setTimeout(() => {
    window.addEventListener("scroll", windowHandler);
    windowTimers.forEach((timer) => {
      clearTimeout(timer);
    });
    windowTimers = [];
  }, 100));
}

const scrollToFocus = (index) => {
  const scrollPos = NAV_BTN_WIDTH * (index + 1.5) - window.screen.availWidth / 2;
  window.removeEventListener("scroll", windowHandler);
  navBar.scrollTo({ left : scrollPos, behavior : "smooth" });
  windowFocusingTimers.forEach((timer) => {
    clearTimeout(timer);
  });
  windowFocusingTimers = [];
  windowFocusingTimers.push(setTimeout(() => {
    window.addEventListener("scroll", windowHandler);
    windowFocusingTimers.forEach((timer) => {
      clearTimeout(timer);
    });
    windowFocusingTimers = [];
  }, 500));
}

scrollToFocus(0);

window.onload = () => {
  const thumImgPos = thumImg.getBoundingClientRect();
  if(-thumImgPos.y > 30) {
    thumImg.style.height = "0px";
    return;
  }
  navBar.style.transitionDuration = ".6s";
  thumImg.style.transitionDuration = ".9s";
  thumImg.style.transitionTimingFunction = "cubic-bezier(0.83, 0, 0.17, 1)";
  thumImg.style.opacity = 1;
  header.style.transitionDuration = ".3s";
};

thumImg.addEventListener("touchstart", () => {
  thumImg.style.height = "0px";
});

window.addEventListener("scroll", windowHandler);
navBar.addEventListener("scroll", navBarHandler);

navBtns.forEach((btn, index) => {
  console.log("d")
  // btn.addEventListener("touchstart", (e) => {
  //   btn.lateX = e.targetTouches.clientX; 
  //   btn.lateY = e.targetTouches.clientY; 
  // });
  btn.addEventListener("touchmove", (e) => {
      btn.touchMoved = true;
  });
  btn.addEventListener("touchend", () => {
    if(!btn.touchMoved) {
      navBtnFocused.classList.remove("focus");
      btn.classList.add("focus");
      navBtnFocused = btn;
  
      scrollToFocus(index); 
    }
    btn.touchMoved = false;
  });
});