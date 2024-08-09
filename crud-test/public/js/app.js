window.addEventListener("DOMContentLoaded", async () => {
  const input = document.querySelector(".todo .inputs input");
  const button = document.querySelectorAll(".todo .inputs > button")[0];
  const reset = document.querySelectorAll(".todo .inputs > button")[1];

  let id = 0;
  if (input) {
    input.addEventListener("input", function () {
      if (this.value !== "") {
        button.classList.add("opa");
        button.removeAttribute("disabled");
      } else {
        button.classList.remove("opa");
        button.setAttribute("disabled", true);
      }
    });
  } else {
    console.log("No");
  }

  const displayDiv = (memoJson) => {
    const ul = document.querySelector(".todo > ul");
    let addTag = "";

    for (let i = 0; i < memoJson.length; i++) {
      addTag += "<li>";
      addTag += "<input type='checkbox'>";
      addTag += `<div>${memoJson[i].content}</div>`;
      addTag += "<ul class='buttons'>";
      addTag +=
        "<li><button><img src='./assets/update.svg' alt='update' /></button></li><li><button><img src='./assets/close.svg' alt='close' /></button></li>";
      addTag += "</ul>";
      addTag += "</li>";
    }

    ul.innerHTML = addTag;
  };

  const readMemo = async () => {
    const memoRes = await fetch("/memos");
    const memoJson = await memoRes.json();
    displayDiv(memoJson);
  };

  const submitClick = async () => {
    // create
    const res = await fetch("/memos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id++,
        content: input.value,
      }),
    });

    await readMemo();

    await res.json();
    input.value = "";
    input.focus();
    button.classList.remove("opa");
    button.setAttribute("disabled", true);
  };

  button.addEventListener("click", submitClick);

  reset.addEventListener("click", async () => {
    await fetch("/reset", {
      method: "post",
    });
    await readMemo();
  });
});
