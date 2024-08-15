<main>
  <div id="media">크기를 줄여주세요.</div>
  <div class="main__inner">
    <ul></ul>
    <div class="button_part">
      <a href="write.html" class="write">
        <span>글쓰기</span>
        <img src="./assets/plus.svg" alt="plus" />
      </a>
      <a href="signup.html" class="signup">
        <span>회원가입</span>
      </a>
      <a href="login.html" class="login">
        <span>로그인</span>
      </a>
    </div>
  </div>
</main>

<style>
  main #media {
    display: none;
  }

  main .main__inner {
    max-width: 90%;
    margin: 0 auto;
  }

  main .main__inner ul li {
    display: flex;
    margin-bottom: 35px;
  }

  main .main__inner ul li .lists__img {
    width: 120px;
    height: 120px;
    border: 1px solid #333;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
  }

  main .main__inner ul li .lists__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  main .main__inner ul li .lists__info .lists__info-location {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  main .main__inner ul li .lists__info .lists__info-location {
    display: flex;
    gap: 10px;
  }

  main .main__inner ul li .lists__info .lists__info-location span {
    color: #ccc;
    font-size: 14px;
  }

  main .main__inner ul li .lists__info .lists__info-price {
    font-size: 18px;
    font-weight: 700;
  }

  main .main__inner .button_part {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 95px;
  }

  main .main__inner .button_part a {
    width: 100%;
    text-decoration: none;
    background-color: rgb(250, 179, 48);
    border: none;
    border-radius: 30px;
    margin-bottom: 20px;
    display: flex;
    gap: 5px;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    color: #fff;
  }

  main .main__inner .button_part a span {
    line-height: 1;
  }

  main .main__inner .button_part a img {
    width: 15px;
  }

  main .main__inner .nodata div {
    text-align: center;
  }

  main .main__inner.noauth {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 95px);
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
