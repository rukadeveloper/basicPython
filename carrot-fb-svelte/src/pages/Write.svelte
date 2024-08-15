<script>
  import Header from "./Header.svelte";
</script>

<Header />
<main>
  <h2>내 물건 팔기</h2>
  <form action="" id="write-form">
    <div id="title">
      <label for="title">글 제목</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해주세요."
      />
    </div>

    <div id="description">
      <label for="desc">상세 설명</label>
      <input type="textarea" id="desc" name="description" />
    </div>

    <div id="price">
      <label for="price">가격</label>
      <input type="number" id="price" name="price" />
    </div>

    <div id="place">
      <label for="place">장소</label>
      <input type="text" id="place" name="place" />
    </div>

    <div id="image">
      <h2>첨부파일</h2>
      <div class="images">
        <div>
          <input type="file" name="image" />
          <button><img src="./assets/photo.svg" alt="fileInput" /></button>
        </div>
      </div>
    </div>

    <div id="submit">
      <button type="submit">제출하기</button>
    </div>
  </form>
</main>
 
<style scoped>
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
  }

  main > form#write-form > div > .images > div > button img {
    width: 20px;
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
</style>
