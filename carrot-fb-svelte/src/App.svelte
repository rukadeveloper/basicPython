<script>
  import Main from "./pages/Main.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";

  const router = {
    "/": Main,
    "/write": Write,
  };
</script>

<Router routes={router} />

<style>
  body {
    font-family: "Noto Sans KR";
  }
</style>
