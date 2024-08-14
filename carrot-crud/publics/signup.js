const signupForm = document.getElementById("signup-form");
const chkMsg = document.querySelector("div#upwChk");
const idMsg = document.querySelector("div#uid");
const nameMsg = document.querySelector("div#name");
const pwMsg = document.querySelector("div#upw");

const idCheck = async () => {
  const formData = new FormData(signupForm);
  const uid = formData.get("uid");
  const idRes = await fetch("/users");
  const idJson = await idRes.json();
  if (uid.trim() == "") {
    return "idnull";
  } else if (idJson.some((item) => item.id === uid)) {
    return "idisin";
  } else {
    return "OK";
  }
};

const PasswordCheck = () => {
  const formData = new FormData(signupForm);
  const pw = formData.get("upw");
  if (pw.trim() === "") {
    return false;
  } else {
    return true;
  }
};

const Password2Check = () => {
  const formData = new FormData(signupForm);
  const pw1 = formData.get("upw");
  const pw2 = formData.get("upwChk");
  if (pw1 === pw2 && pw1.trim() !== "" && pw2.trim() !== "") return true;
  else return false;
};

const nameCheck = async () => {
  const formData = new FormData(signupForm);
  const name = formData.get("name");
  const nameRes = await fetch("/users");
  const nameJson = await nameRes.json();
  if (name.trim() === "") {
    return "namenull";
  } else if (nameJson.some((item) => item.name === name)) {
    return "nameisin";
  } else {
    return "OK";
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const shaPassword = sha256(formData.get("upw"));
  console.log(shaPassword);
  formData.set("upw", shaPassword);

  if ((await idCheck()) === "idnull") {
    const b1 = document.createElement("b");
    b1.innerText = "아이디를 입력해주세요.";
    idMsg.appendChild(b1);
  } else if ((await idCheck()) === "idisin") {
    const b2 = document.createElement("b");
    b2.innerText = "이미 존재하는 아이디입니다.";
    idMsg.appendChild(b2);
  }

  if (!PasswordCheck()) {
    const bb = document.createElement("b");
    bb.innerText = "비밀번호를 입력해주세요.";
    pwMsg.appendChild(bb);
  }

  if (!Password2Check()) {
    const b = document.createElement("b");
    b.innerText = "비밀번호가 일치하지 않습니다.";
    chkMsg.appendChild(b);
  }

  if ((await nameCheck()) === "namenull") {
    const b3 = document.createElement("b");
    b3.innerText = "이름을 기입해주세요.";
    nameMsg.appendChild(b3);
  } else if ((await nameCheck()) === "nameisin") {
    const b4 = document.createElement("b");
    b4.innerText = "이미 존재하는 이름입니다.";
    nameMsg.appendChild(b4);
  }

  if (
    (await idCheck()) === "OK" &&
    PasswordCheck() &&
    Password2Check() &&
    (await nameCheck()) === "OK"
  ) {
    const realRes = await fetch("/signup", {
      method: "post",
      body: formData,
    });
    alert("회원가입에 성공했습니다.");
    window.location.pathname = "/root/login.html";
  }
};

signupForm.addEventListener("submit", handleSubmit);
