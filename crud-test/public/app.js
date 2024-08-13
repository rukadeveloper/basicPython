// 입력창 열림 변수
let isInsert = false;

// EditMode 변수
let isEditMode = false;

const plusBtn = document.querySelector("button.plus");
const insertInput = document.querySelector(".insert");
const insertInputReal = document.querySelector(".insert .insert_input input");
const insertCancel = document.querySelector(
  ".insert .buttons button:last-child"
);
const insertSubmit = document.querySelector(
  ".insert .buttons button:first-child"
);

const deleteMemo = async (editBtn, deleteBtn, editInput) => {
  const id = editInput.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "appliaction/json",
    },
  });
  const resJson = await res.json();
  console.log(resJson);
  deleteBtn.classList.remove("active");
  editBtn.classList.remove("active");
  readMemo();
};

const editMemo = async (editBtn, editInput) => {
  const id = editInput.dataset.id;
  const editValue = editInput.value;
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editValue,
    }),
  });
  editBtn.classList.remove("active");
  readMemo();
};

function checkDist(editInput, li, checkbox, span, editBtn, delBtn, memo) {
  if (checkbox.checked) {
    span.classList.add("delete_select");
    editBtn.removeAttribute("disabled");
    delBtn.removeAttribute("disabled");
    span.addEventListener("click", () => {
      isEditMode = true;

      if (isEditMode) {
        li.replaceChild(editInput, span);
      }

      editInput.value = memo.content;
    });

    editBtn.addEventListener("click", () => {
      editMemo(editBtn, editInput);
    });

    delBtn.addEventListener("click", () =>
      deleteMemo(editBtn, delBtn, editInput)
    );
  } else {
    span.classList.remove("delete_select");
    editBtn.setAttribute("disabled", true);
  }
  if (!editBtn.getAttribute("disabled")) {
    editBtn.classList.add("active");
    delBtn.classList.add("active");
  } else {
    editBtn.classList.remove("active");
    delBtn.classList.remove("active");
  }
}

const displayMemos = (memo) => {
  const ul = document.querySelector(".todos > ul");
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const span = document.createElement("span");
  span.innerText = memo.content;
  const editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.dataset.id = memo.id;
  li.appendChild(checkbox);
  li.appendChild(span);
  ul.appendChild(li);

  const editBtn = document.querySelector(".todos .abs-button .edit");
  editBtn.setAttribute("disabled", true);

  const delBtn = document.querySelector(".todos .abs-button .del");
  delBtn.setAttribute("disabled", true);
  checkbox.addEventListener("change", () =>
    checkDist(editInput, li, checkbox, span, editBtn, delBtn, memo)
  );
};

const readMemo = async () => {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector(".todos > ul");
  ul.innerHTML = "";
  jsonRes.forEach((el) => {
    displayMemos(el);
  });
};

const createMemo = async (val) => {
  const res = await fetch("/memos", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: val,
    }),
  });
  readMemo();
};

const submitClick = () => {
  console.log("메모~~~~");
  createMemo(insertInputReal.value);
  insertInputReal.value = "";
  isInsert = false;
  document.body.classList.remove("dimmed");
  insertInput.classList.remove("on");
};

readMemo();

plusBtn.addEventListener("click", () => {
  isInsert = true;
  document.body.classList.add("dimmed");
  insertInput.classList.add("on");
});

insertCancel.addEventListener("click", () => {
  isInsert = false;
  document.body.classList.remove("dimmed");
  insertInput.classList.remove("on");
});

insertSubmit.addEventListener("click", submitClick);
