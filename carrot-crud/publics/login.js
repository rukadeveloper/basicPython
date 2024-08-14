const handleSubmits = async (e) => {
  e.preventDefault();
  const loginForm = document.querySelector("form#login-form");
  const formData = new FormData(loginForm);
  const pwsha = await sha256(formData.get("pwval"));
  formData.set("pwval", pwsha);
  const res = await fetch("/root/login", {
    method: "post",
    body: formData,
  });
  const data = await res.json();
  let accessToken = data.access_token;

  if (res.status === 200) {
    alert("로그인 성공!");
    window.location.pathname = "/root";
    localStorage.setItem("accessToken", accessToken);
  } else if (res.status === 401) {
    alert("아이디 혹은 비밀번호 틀림!");
  }
};

const able = () => {
  const button = document.querySelector(".buttonval button");
  const idval = document.querySelector("input#idval");
  const pwval = document.querySelector("input#pwval");
  const loginForm = document.querySelector("form#login-form");

  const checkValue = () => {
    if (idval.value.trim() !== "" && pwval.value.trim() !== "") {
      button.removeAttribute("disabled");
      button.classList.add("active");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("active");
    }
  };

  idval.addEventListener("input", checkValue);
  pwval.addEventListener("input", checkValue);

  loginForm.addEventListener("submit", handleSubmits);
};

able();
