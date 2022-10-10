const nameForm = document.querySelector("#enterName");
const nameInput = nameForm.querySelector("input");
const thnksMsg = nameForm.querySelectorAll("h3");
const THNKSMSG_FADE_IN = "thnks_msg_fade_in";
const THNKSMSG_FADE_OUT = "thnks_msg_fade_out";

const guide = document.querySelector("#guide");
const GUIDE_FADE_IN = "guide_fade_in";
const GUIDE_FADE_OUT = "guide_fade_out";

const matchName = (name) => name.match(/([1-2])([1-8])([0-2]\d)/);

const checkNameValid = (name) => {
  regex = matchName(name);
  if (regex === null) return null;
  if (regex[3] === "00") return null;
  return regex;
};

const getInput = () => nameInput.value;

const setItemInLocal = (key, value) => localStorage.setItem(key, value);

const storeName = (input) => {
  setItemInLocal("name", input);
};

const showGuide = () => {
  guide.classList.add(GUIDE_FADE_IN);
  guide.classList.remove(GUIDE_FADE_OUT);
  guide.addEventListener("animationend", () => {
    setTimeout(() => {
      guide.classList.add(GUIDE_FADE_OUT);
      guide.classList.remove(GUIDE_FADE_IN);
    }, 500);
  });
};

const showThanks = () => {
  nameInput.style.display = "none";
  thnksMsg[0].classList.add(THNKSMSG_FADE_IN);
  thnksMsg[0].classList.remove(THNKSMSG_FADE_OUT);
  thnksMsg[0].addEventListener("animationend", () => {
    setTimeout(() => {
      thnksMsg[0].classList.add(THNKSMSG_FADE_OUT);
      thnksMsg[0].classList.remove(THNKSMSG_FADE_IN);
      setTimeout(() => {
        thnksMsg[0].addEventListener("animationend", () => {
          thnksMsg[1].classList.add(THNKSMSG_FADE_IN);
          thnksMsg[1].classList.remove(THNKSMSG_FADE_OUT);
          thnksMsg[1].addEventListener("animationend", () => {
            setTimeout(() => {
              thnksMsg[1].classList.add(THNKSMSG_FADE_OUT);
              thnksMsg[1].classList.remove(THNKSMSG_FADE_IN);
              setTimeout(gotoMain, 200);
            }, 500);
          });
        });
      }, 500);
    }, 500);
  });
};

const gotoMain = () => location.replace("/main.html");

const handleSubmit = function (e) {
  e.preventDefault();

  input = getInput();
  if (checkNameValid(input)) {
    storeName(input);
    showThanks(); // +gotoMain
  } else {
    showGuide();
  }
};

const checkNameExist = () => localStorage.getItem("name") !== null;

const init = () => {
  if (checkNameExist()) {
    gotoMain();
  }
  nameForm.addEventListener("submit", handleSubmit, false);
};

init();
