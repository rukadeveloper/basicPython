<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("token", token);
      const user = result.user;
      user$.set(user);
    } catch (r) {
      console.error(r);
    }
  };

  let idval = "";
  let pwval = "";
</script>

<main>
  <div id="media">크기를 줄여주세요.</div>
  <form action="/root/login" method="post" id="login-form">
    <img src="./assets/logo.png" alt="logo" />
    <div id="idval">
      <label for="idval">아이디 입력</label>
      <input
        type="text"
        id="idval"
        name="idval"
        placeholder="아이디 혹은 이메일 입력하기."
      />
    </div>

    <div id="pwval">
      <label for="pwval">패스워드 입력</label>
      <input
        type="password"
        id="pwval"
        name="pwval"
        placeholder="비밀번호 입력하기."
      />
    </div>

    <div class="buttonval">
      <button type="submit" disabled>로그인</button>
      <button on:click|preventDefault={loginGoogle}>Google로 로그인하기</button>
    </div>
  </form>
</main>

<style scoped>
  main #media {
    display: none;
  }

  form#login-form {
    width: 100%;
  }

  form#login-form img {
    display: block;
    width: 90px;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  form#login-form > div {
    padding: 0 30px;
    margin-bottom: 15px;
  }

  form#login-form > div > label {
    display: none;
  }

  form#login-form > div > input {
    background-color: rgb(239, 239, 238);
    outline: none;
    width: 100%;
    padding: 15px 10px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  form#login-form > div.buttonval > button {
    width: 100%;
    padding: 20px 0;
    border: none;
    background-color: rgba(77, 145, 255);
    color: #fff;
    font-size: 16px;
    opacity: 0.15;
    cursor: pointer;
  }

  form#login-form > div.buttonval > button:last-child {
    margin-top: 15px;
    background-color: rgb(3, 3, 3);
    opacity: 1;
  }

  form#login-form > div.buttonval > button.active {
    opacity: 1;
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
