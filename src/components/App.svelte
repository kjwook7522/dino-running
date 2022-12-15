<script lang="ts">
  import MyDinosaur from "@/components/Character/MyDinosaur.svelte";
  import FindspotBackground from "@/components/Background/FindspotBackground.svelte";
</script>

<FindspotBackground />
<div class="dinosaur-road">
  <MyDinosaur />
</div>

<style lang="scss">
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
  }

  :global(#app) {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dinosaur-road {
    position: relative;
    top: -4rem;
    width: 100%;
  }
</style>
