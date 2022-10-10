const getName = localStorage.getItem("name");

//이름 있는지 확인, 이름 입력하는 곳으로 이동 #1
const checkNameExist = () => getName !== null;

const gotoGetName = () => location.replace("/get-name.html");

//유저 정보 추출, 유저 이름에 맞는 파일 받아오기 #2
const getInfo = (name) => name.match(/([1-2])([1-8])([0-2]\d)([가-힣]{3})/);

const init = () => {
  if (!checkNameExist()) return gotoGetName(); //#1

  //#2
  userInfo = getInfo(getName);
};

init();
