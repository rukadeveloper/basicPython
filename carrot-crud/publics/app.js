const calTime = (timestamp) => {
  const currentTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const distTime = new Date(currentTime - timestamp);
  const hour = distTime.getHours();
  const minute = distTime.getMinutes();
  const second = distTime.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}분 전`;
  else return "방금 전";
};

const dataRender = (data) => {
  const ul = document.querySelector(".main__inner > ul");
  if (data &&   data.length !== 0) {
    data.reverse().forEach(async (ele) => {
      const li = document.createElement("li");

      const divImg = document.createElement("div");
      divImg.className = "lists__img";
      const divRealImg = document.createElement("img");
      const res = await fetch(`/images/${ele.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      divRealImg.src = url;
      divImg.appendChild(divRealImg);

      const divInfo = document.createElement("div");
      divInfo.className = "lists__info";

      const divTitle = document.createElement("div");
      divTitle.className = "lists__info-title";
      divTitle.innerText = ele.title;

      const divLoca = document.createElement("div");
      divLoca.className = "lists__info-location";

      const span1 = document.createElement("span");
      span1.innerText = ele.place;

      const span2 = document.createElement("span");
      span2.innerText = calTime(ele.timestamp);

      divLoca.appendChild(span1);
      divLoca.appendChild(span2);

      const divPrice = document.createElement("div");
      divPrice.className = "lists__info-price";
      divPrice.innerText = ele.price;

      divInfo.appendChild(divTitle);
      divInfo.appendChild(divLoca);
      divInfo.appendChild(divPrice);

      li.appendChild(divImg);
      li.appendChild(divInfo);

      ul.appendChild(li);
    });
  }
  if (localStorage.getItem("accessToken") === null) {
    const inner = document.querySelector(".main__inner");
    inner.className += " noauth";

    const div = document.createElement("div");
    div.className = "nodata";

    const div1 = document.createElement("div");
    div1.innerText = "상품이 존재하지 않습니다.";

    div.appendChild(div1);

    inner.appendChild(div);
  }
};

const LoginDisplay = () => {
  if (localStorage.getItem("accessToken") !== null) {
    const login = document.querySelector("a.login");
    const signup = document.querySelector("a.signup");
    const write = document.querySelector("a.write");
    login.style.display = "none";
    signup.style.display = "none";
  } else {
    login.style.display = "flex";
    signup.style.display = "flex";
    write.style.display = "none";
  }
};

const fetchData = async () => {
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await res.json();
  dataRender(data);
  LoginDisplay();
};

fetchData();
