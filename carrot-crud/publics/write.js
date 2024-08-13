const fileInput = document.querySelector(".images > div > input");
const fileButton = document.querySelector(".images > div > button");
const writeForm = document.getElementById("write-form");

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = new FormData(writeForm);
  body.append("timestamp", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "post",
      body,
    });
    const data = await res.json();
    if (data === "OK") {
      window.location.href = "/root";
    }
  } catch (error) {
    console.error(error);
  }
};

fileButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

writeForm.addEventListener("submit", handleSubmit);
