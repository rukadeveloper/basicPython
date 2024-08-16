<script>
  import { getDatabase, ref, onValue } from "firebase/database";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { user$ } from "../store";

  let inner;

  const db = getDatabase();
  const itemsRef = ref(db, "items/");
  const timestamp = (ts) => {
    const ctime = new Date().getDate();
    const dtime = new Date(ctime - ts);
    const h = dtime.getHours();
    const m = dtime.getMinutes();
    const s = dtime.getSeconds();

    if (h > 0) return `${h}시간 전`;
    else if (m > 0) return `${m}분 전`;
    else if (s > 0) return `${s}초 전`;
    else return "방금 전";
  };

  const logout = () => {
    localStorage.removeItem("token");
    $user$ = null;
  };

  $: items = [];

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object")
        items = Object.values(data).reverse();
    });
    if (items.length == 0) {
      inner.classList.add("nodata");
    }
  });
</script>

<main>
  <div id="media">크기를 줄여주세요.</div>
  <div class="main__inner" bind:this={inner}>
    <ul>
      {#if items.length !== 0}
        {#each items as item}
          <li>
            <div class="lists__img">
              <img src={item.imageUrl} alt="i" />
            </div>
            <div class="lists__info">
              <div class="lists__info-title">{item.title}</div>
              <div class="lists__info-location">
                <span>{item.place}</span>
                <span>{timestamp(item.timestamp)}</span>
              </div>
              <div class="lists__info-price">{item.price}</div>
            </div>
          </li>
        {/each}
      {:else}
        <div class="nodata">No Product Founded</div>
      {/if}
    </ul>
    <div class="button_part">
      {#if $user$}
        <a href="/write" class="write" use:link>
          <span>글쓰기</span>
          <img src="./assets/plus.svg" alt="plus" />
        </a>
        <button on:click={logout}>
          <span>로그아웃</span>
        </button>
      {:else}
        <a href="signup.html" class="signup" use:link>
          <span>회원가입</span>
        </a>
        <a href="/login" class="login" use:link>
          <span>로그인</span>
        </a>
      {/if}
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

  main .main__inner .button_part a,
  main .main__inner .button_part button {
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
    font-size: 16px;
    cursor: pointer;
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

  main .main__inner {
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
