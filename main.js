const pdfjsLib = window["pdfjs-dist/build/pdf"];

const body = document.body;

const CLASS_THANKS_MSG = "thanks_msg";
const CLASS_THUMNAIL_MSG = "thumnail_msg";
const CLASS_THUMNAIL = "thumnail";

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
const createThumnailMsg = (msg, createrInfo) => `<h4>${createrInfo[4]}님의 "${msg}" 보기</h4><em></em>`;
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

const loadPdf = (container, pdfUrl, thumnailMsg) => {
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
  const toggler = document.createElement("em");
  labelForToggle.appendChild(toggler);

  thumnail.appendChild(togglerHolder);

  const canvasContainer = document.createElement("div");
  container.appendChild(canvasContainer);

  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  loadingTask.promise.then(
    function(pdf) {
      const numOfPages = pdf.numPages;

      for (let i = 1; i <= numOfPages; i++) {
        const curPageNum = i;
        pdf.getPage(curPageNum).then(function(page) {
          const scale = 1;
          const viewport = page.getViewport({ scale: scale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width * 2;
          canvas.height = viewport.height * 2;
          ctx.scale(2, 2);
          canvasContainer.appendChild(canvas);

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          const renderTask = page.render(renderContext);
        });
      }
    },
    function(reason) {
      alert("pdf 로딩 도중 에러 발생..ㅠㅠ");
    }
  );
};

const init = () => {
  const pdfLoader_2107 = document.querySelector("#pdf_2107");
  loadPdf(pdfLoader_2107, "/pdf/2107박장우.pdf", "고흥 소록도와 거금도");
  const pdfLoader_2110 = document.querySelector("#pdf_2110");
  loadPdf(pdfLoader_2110, "/pdf/2110신동연.pdf", "국립대전현충원");
  const pdfLoader_2117 = document.querySelector("#pdf_2117");
  loadPdf(pdfLoader_2117, "/pdf/2117이승현.pdf", "군산 새만금방조제");
  const pdfLoader_2205 = document.querySelector("#pdf_2205");
  loadPdf(pdfLoader_2205, "/pdf/2205김석훈.pdf", "화개장터와 섬진강");
  const pdfLoader_2210 = document.querySelector("#pdf_2210");
  loadPdf(pdfLoader_2210, "/pdf/2210변선웅.pdf", "고흥 소록도와 거금도");
  const pdfLoader_2312 = document.querySelector("#pdf_2312");
  loadPdf(pdfLoader_2312, "/pdf/2312소현형.pdf", "국립대전현충원");
  const pdfLoader_2316 = document.querySelector("#pdf_2316");
  loadPdf(pdfLoader_2316, "/pdf/2316이서종.pdf", "나로우주센터");
  const pdfLoader_2411 = document.querySelector("#pdf_2411");
  loadPdf(pdfLoader_2411, "/pdf/2411이래은.pdf", "금강습지생태공원, 진포시비공원");
  const pdfLoader_2414 = document.querySelector("#pdf_2414");
  loadPdf(pdfLoader_2414, "/pdf/2414이채은.pdf", "화개장터와 섬진강");
  const pdfLoader_2417 = document.querySelector("#pdf_2417");
  loadPdf(pdfLoader_2417, "/pdf/2417전지호.pdf", "국립대전현충원");
  const pdfLoader_2421 = document.querySelector("#pdf_2421");
  loadPdf(pdfLoader_2421, "/pdf/2421홍채린.pdf", "화개장터와 섬진강");
  const pdfLoader_2510 = document.querySelector("#pdf_2510");
  loadPdf(pdfLoader_2510, "/pdf/2510송효주.pdf", "화개장터와 섬진강");
  const pdfLoader_2606 = document.querySelector("#pdf_2606");
  loadPdf(pdfLoader_2606, "/pdf/2606김채영.pdf", "국립대전현충원");
  const pdfLoader_2607 = document.querySelector("#pdf_2607");
  loadPdf(pdfLoader_2607, "/pdf/2607김태이.pdf", "국립대전현충원");
  const pdfLoader_2611 = document.querySelector("#pdf_2611");
  loadPdf(pdfLoader_2611, "/pdf/2611변환주.pdf", "고하도");
  const pdfLoader_2613 = document.querySelector("#pdf_2613");
  loadPdf(pdfLoader_2613, "/pdf/2613양진서.pdf", "국립대전현충원");
  const pdfLoader_2614 = document.querySelector("#pdf_2614");
  loadPdf(pdfLoader_2614, "/pdf/2614오정윤.pdf", "고하도");
  const pdfLoader_2804 = document.querySelector("#pdf_2804");
  loadPdf(pdfLoader_2804, "/pdf/2804김민지.pdf", "속리산 문장대");
};

init();
