<script>
  let hour = new Date().getHours().toString().padStart(2, "0");
  let min = new Date().getMinutes().toString().padStart(2, "0");

  export let location;

  const goHome = () => {
    window.location.hash = "/";
  };
</script>

<header>
  <div id="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="./assets/chart.svg" alt="chart" />
      <img src="./assets/wifi.svg" alt="wifi" />
      <img src="./assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div id="menu-bar">
    <div class="menu-bar__location">
      <button>
        <span>역삼1동</span>
        <img src="./assets/chevDown.svg" alt="chevDown" />
      </button>
    </div>
    <div class="menu-bar__icons">
      <button><img src="./assets/search.svg" alt="search" /></button>
      <button><img src="./assets/menu.svg" alt="menu" /></button>
      <button><img src="./assets/alert.svg" alt="alert" /></button>
    </div>
  </div>
  <div id="icons">
    <div class="icons__list">
      <div on:click={goHome}>
        {#if location === "home"}
          <img src="./assets/homeActive.svg" alt="homeActive" />
        {:else}
          <img src="./assets/homeBasic.svg" alt="homeBasic" />
        {/if}
        <span>홈</span>
      </div>
      <div>
        <img src="./assets/document.svg" alt="document" />
        <span>동네생활</span>
      </div>
      <div>
        <img src="./assets/location.svg" alt="location" />
        <span>내근처</span>
      </div>
      <div>
        <img src="./assets/chat.svg" alt="chat" />
        <span>채팅</span>
      </div>
      <div>
        <img src="./assets/profile.svg" alt="profile" />
        <span>나의당근</span>
      </div>
    </div>
  </div>
</header>

<style scoped>
  header #info-bar {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header #info-bar .info-bar__icons {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  header #info-bar .info-bar__icons img {
    width: 20px;
  }

  header #menu-bar {
    padding: 0 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header #menu-bar .menu-bar__location {
    width: 90px;
  }

  header #menu-bar .menu-bar__location span {
    font-weight: 700;
    font-size: 20px;
  }

  header #menu-bar .menu-bar__location button {
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header #menu-bar .menu-bar__location button img {
    width: 20px;
  }

  header #menu-bar .menu-bar__icons {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  header #menu-bar .menu-bar__icons button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  header #menu-bar .menu-bar__icons button img {
    width: 20px;
  }

  header #icons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.25);
  }

  header #icons .icons__list {
    width: 100%;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header #icons .icons__list > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header #icons .icons__list > div img {
    width: 25px;
  }

  header #icons .icons__list > div span {
    margin-top: 10px;
    font-size: 12px;
  }

  header #icons .icons__list > div:first-child span {
    font-weight: 700;
    font-size: 14px;
  }
</style>
