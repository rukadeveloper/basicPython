<script>
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import Write from "./pages/Write.svelte";
  import {
    GoogleAuthProvider,
    signInWithCredential,
    getAuth,
  } from "firebase/auth";
  import { user$ } from "./store";

  import Router from "svelte-spa-router";
  import { onMount } from "svelte";

  let isLoading = true;

  const provider = new GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const checkLogin = async () => {
    console.log("랜더링!!!!");

    const auth = getAuth();

    const token = localStorage.getItem("token");

    if (!token) return;

    const credential = GoogleAuthProvider.credential(null, token);

    const result = await signInWithCredential(auth, credential);

    const user = result.user;

    user$.set(user);
    isLoading = false;

    if (!isLoading) {
      document.body.classList.add("off");
    }
  };

  const router = {
    "/": Main,
    "/write": Write,
    "/login": Login,
  };

  onMount(() => {
    checkLogin();
  });
</script>

{#if isLoading}
  <div id="loading"></div>
{:else if !$user$ && !isLoading}
  <Login />
{:else}
  <Router routes={router} />
{/if}

<style>
  body {
    font-family: "Noto Sans KR";
  }

  div#loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border-top-color: #333;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
