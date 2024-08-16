<script>
  import Header from "./Header.svelte";

  let title;
  let price;
  let description;
  let place;
  let image;
  let fileInput;
  let realLink = "";
  let objectUrl;
  let imger;

  import { getDatabase, ref, set, push } from "firebase/database";
  import {
    getStorage,
    ref as imgRef,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import { onMount } from "svelte";

  const storage = getStorage();

  const fileChange = (e) => {
    const names = e.target.files[0];
    objectUrl = URL.createObjectURL(names);
    realLink = objectUrl;
  };

  const btnClick = () => {
    if (fileInput instanceof HTMLInputElement) {
      fileInput.click();
    }
  };

  const uploadFiles = async () => {
    const imageFile = image[0];
    const name = imageFile.name;
    const storageRef = imgRef(storage, name);
    const res = await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  async function writeUserData(url) {
    const db = getDatabase();
    push(ref(db, "items/"), {
      title,
      description,
      price,
      place,
      timestamp: new Date().getTime(),
      imageUrl: url,
    });
    window.location.hash = "/";
  }

  const handleSubmit = async () => {
    const url = await uploadFiles();
    writeUserData(url);
  };
</script>

<Header location="write" />
<main>
  <div id="media">크기를 줄여주세요.</div>
  <h2>내 물건 팔기</h2>
  <form action="" id="write-form" on:submit|preventDefault={handleSubmit}>
    <div id="title">
      <label for="title">글 제목</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해주세요."
        bind:value={title}
      />
    </div>

    <div id="description">
      <label for="desc">상세 설명</label>
      <input
        type="textarea"
        id="desc"
        name="description"
        bind:value={description}
      />
    </div>

    <div id="price">
      <label for="price">가격</label>
      <input type="number" id="price" name="price" bind:value={price} />
    </div>

    <div id="place">
      <label for="place">장소</label>
      <input type="text" id="place" name="place" bind:value={place} />
    </div>

    <div id="image">
      <h2>첨부파일</h2>
      <div class="images">
        <div>
          <input
            type="file"
            name="image"
            bind:files={image}
            on:change={fileChange}
            bind:this={fileInput}
          />
          <button on:click|preventDefault={btnClick}>
            {#if realLink === ""}
              <img src="./assets/photo.svg" alt="default" bind:this={imger} />
            {:else}
              <img src={realLink} alt="real" bind:this={imger} />
            {/if}
          </button>
        </div>
      </div>
    </div>

    <div id="submit">
      <button type="submit">제출하기</button>
    </div>
  </form>
</main>

<style scoped>
  main #media {
    display: none;
  }

  main > h2 {
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  main > form#write-form {
    width: 100%;
    padding-top: 40px;
  }

  main > form#write-form > div {
    padding: 0 15px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  main > form#write-form > div > label,
  main > form#write-form > div > h2 {
    font-size: 18px;
    font-weight: 700;
    width: 25%;
  }

  main > form#write-form > div > input {
    width: 75%;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 10px;
    outline: none;
  }

  main > form#write-form > div > .images {
    width: 75%;
    display: flex;
  }

  main > form#write-form > div > input::placeholder {
    color: #ccc;
  }

  main > form#write-form > div > input[type="textarea"] {
    height: 90px;
  }

  main > form#write-form > div > .images > div > input {
    display: none;
  }

  main > form#write-form > div > .images > div > button {
    width: 80px;
    height: 80px;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  main > form#write-form > div > .images > div > button img {
    width: 20px;
  }

  main > form#write-form > div > .images > div > button img.imgbig {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  main > form#write-form > div#submit {
    justify-content: center;
  }

  main > form#write-form > div#submit button {
    width: 250px;
    padding: 15px 0;
    border: none;
    background-color: rgb(251, 180, 93);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  @media (min-width: 570px) {
    main #media {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: red;
      z-index: 10;
      font-size: 30px;
      color: #fff;
    }
  }
</style>
