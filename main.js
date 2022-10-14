const pdfjsLib = window["pdfjs-dist/build/pdf"];

const body = document.body;

const CLASS_THANKS_MSG = "thanks_msg";
const CLASS_THUMNAIL_MSG = "thumnail_msg";
const CLASS_THUMNAIL = "thumnail";
const CLASS_CHECKED = "checked";

const CLASS_MATCH = "인의예지매난국죽";
const INFO_FORMAT = /([1-2])([1-8])([0-2]\d)([가-힣]{3})/;

//create holder for information of creater
const getInfo = (rawInfo) => rawInfo.match(INFO_FORMAT);
const createThanksMsg = (info) => `${info[1]}학년 ${CLASS_MATCH[info[2] - 1]}반 ${info[4]}님이 제공해주신 정보예요!`;
const createMsgElement = (msg) => {
  const msgElement = document.createElement("h4");
  msgElement.innerHTML = msg;
  msgElement.classList.add(CLASS_THANKS_MSG);

  return msgElement;
};
const createMsgHolder = (url, a, b, c) => c(b(a(url)));

//create holder for thumnail of accordian menu
const createThumnailMsg = (msg, createrInfo) => `<h4>${createrInfo[4]}님의 <br><span>${msg}</span> 보기</h4><em></em>`;
const createThumnailElement = (thumnailMsg) => {
  const msgElement = document.createElement("label");
  msgElement.innerHTML = thumnailMsg;
  msgElement.classList.add(CLASS_THUMNAIL_MSG);

  return msgElement;
};
const createThumnailHolder = (thumnail, createrInfo, a, b) => a(b(thumnail, createrInfo));

//create accordian menu toggler
const createAccordionToggle = () => {
  const accordionToggle = document.createElement("input");
  accordionToggle.type = "checkbox";

  return accordionToggle;
};

let canvasContainers = [];
let labels = [];

const loadPdf = (container, pdfUrl, thumnailMsg, numOfImgs) => {
  const thumnail = document.createElement("span");
  thumnail.classList.add(CLASS_THUMNAIL);
  container.appendChild(thumnail);
  const togglerHolder = document.createElement("span");

  const msgHoler = createMsgHolder(pdfUrl, getInfo, createThanksMsg, createMsgElement);
  thumnail.appendChild(msgHoler);
  const accordionToggle = createAccordionToggle();
  togglerHolder.appendChild(accordionToggle);
  const labelForToggle = createThumnailHolder(thumnailMsg, getInfo(pdfUrl), createThumnailElement, createThumnailMsg);
  togglerHolder.appendChild(labelForToggle);
  labels.push(labelForToggle);

  const canvasContainer = document.createElement("div");
  container.appendChild(canvasContainer);
  canvasContainers.push(canvasContainer);

  labelForToggle.addEventListener("click", () => {
    const isChecked = canvasContainer.classList.toggle(CLASS_CHECKED);

    if (isChecked) {
      const canvases = canvasContainer.querySelectorAll("img"); // canvas -> img

      if(!canvasContainer.isLoadedOnce) {
        canvasContainer.isLoadedOnce = true;
        for(let i = 0; i < canvases.length; i++) {
          const curImg = canvases[i];
          curImg.src = curImg.dataset.src;
        }        
        canvases[canvases.length - 1].addEventListener("load", () => {
          setTimeout(() => {
            const maxHeight = canvases[0].height * canvases.length;
            canvasContainer.style.maxHeight = `${maxHeight}px`;
          }, 100);
          
          canvasContainers.forEach((div) => {
            div.classList.remove(CLASS_CHECKED);
            div.style.maxHeight = "0px";
          });
          labels.forEach((label) => {
            label.classList.remove(CLASS_CHECKED);
          })
          canvasContainer.classList.add(CLASS_CHECKED);
          labelForToggle.classList.add(CLASS_CHECKED);
          setTimeout(() => {container.scrollIntoView({ behavior: 'smooth' })}, 300);
        });
        return;
      }
      canvasContainers.forEach((div) => {
        div.classList.remove(CLASS_CHECKED);
        div.style.maxHeight = "0px";
      });
      labels.forEach((label) => {
        label.classList.remove(CLASS_CHECKED);
      })
      
      const maxHeight = canvases[0].height * canvases.length;
      canvasContainer.style.maxHeight = `${maxHeight}px`;
      
      canvasContainer.classList.add(CLASS_CHECKED);
      labelForToggle.classList.add(CLASS_CHECKED);
      setTimeout(() => {container.scrollIntoView({ behavior: 'smooth' })}, 300);
    } else {
      labelForToggle.classList.remove(CLASS_CHECKED);
      canvasContainer.style.maxHeight = "0px";
    }
  });

  thumnail.appendChild(togglerHolder);

  for(let i = 1; i <= numOfImgs; i++) {
    const imgSrc = `${pdfUrl}/${i}.png`;

    const img = document.createElement("img");
    img.dataset.src = imgSrc;

    canvasContainer.appendChild(img);
  }
};

const init = () => {
  const pdfLoader_2107 = document.querySelector("#pdf_2107");
  loadPdf(pdfLoader_2107, "/img/2107박장우", "고흥 소록도와 거금도", 10);
  const pdfLoader_2110 = document.querySelector("#pdf_2110");
  loadPdf(pdfLoader_2110, "/img/2110신동연", "국립대전현충원", 11);
  const pdfLoader_2117 = document.querySelector("#pdf_2117");
  loadPdf(pdfLoader_2117, "/img/2117이승현", "군산 새만금방조제", 6);
  const pdfLoader_2205 = document.querySelector("#pdf_2205");
  loadPdf(pdfLoader_2205, "/img/2205김석훈", "화개장터와 섬진강", 4);
  const pdfLoader_2210 = document.querySelector("#pdf_2210");
  loadPdf(pdfLoader_2210, "/img/2210변선웅", "고흥 소록도와 거금도", 2);
  const pdfLoader_2312 = document.querySelector("#pdf_2312");
  loadPdf(pdfLoader_2312, "/img/2312소현형", "국립대전현충원", 5);
  const pdfLoader_2316 = document.querySelector("#pdf_2316");
  loadPdf(pdfLoader_2316, "/img/2316이서종", "나로우주센터", 2);
  const pdfLoader_2408 = document.querySelector("#pdf_2408");
  loadPdf(pdfLoader_2408, "/img/2408안서연", "고하도", 4);
  const pdfLoader_2411 = document.querySelector("#pdf_2411");
  loadPdf(pdfLoader_2411, "/img/2411이래은", "금강습지, 진포시비공원", 2);
  const pdfLoader_2414 = document.querySelector("#pdf_2414");
  loadPdf(pdfLoader_2414, "/img/2414이채은", "화개장터와 섬진강", 5);
  const pdfLoader_2417 = document.querySelector("#pdf_2417");
  loadPdf(pdfLoader_2417, "/img/2417전지호", "국립대전현충원", 4);
  const pdfLoader_2421 = document.querySelector("#pdf_2421");
  loadPdf(pdfLoader_2421, "/img/2421홍채린", "화개장터와 섬진강", 3);
  const pdfLoader_2510 = document.querySelector("#pdf_2510");
  loadPdf(pdfLoader_2510, "/img/2510송효주", "화개장터", 1);
  const pdfLoader_2517 = document.querySelector("#pdf_2517");
  loadPdf(pdfLoader_2517, "/img/2517이지혜", "화개장터", 1);
  const pdfLoader_2606 = document.querySelector("#pdf_2606");
  loadPdf(pdfLoader_2606, "/img/2606김채영", "국립대전현충원", 1);
  const pdfLoader_2607 = document.querySelector("#pdf_2607");
  loadPdf(pdfLoader_2607, "/img/2607김태이", "국립대전현충원", 6);
  const pdfLoader_2611 = document.querySelector("#pdf_2611");
  loadPdf(pdfLoader_2611, "/img/2611변환주", "고하도", 1);
  const pdfLoader_2613 = document.querySelector("#pdf_2613");
  loadPdf(pdfLoader_2613, "/img/2613양진서", "국립대전현충원", 2);
  const pdfLoader_2614 = document.querySelector("#pdf_2614");
  loadPdf(pdfLoader_2614, "/img/2614오정윤", "고하도", 1);
  const pdfLoader_2804 = document.querySelector("#pdf_2804");
  loadPdf(pdfLoader_2804, "/img/2804김민지", "속리산 문장대", 1);
};

init();
