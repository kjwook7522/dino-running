<script lang="ts">
  import BackgroundImg from "@/assets/images/findspot-background.jpg";
  import KeyStore, { WorkingDirectionKey } from "@/lib/KeyStore";

  let MOVE_SENSITIVITY = 2;

  let positionX = 0;

  let isMoving = false;

  let keyStore = new KeyStore();
  let moveRequestId = 0;

  function handleBackgroundPassing() {
    switch (keyStore.workingDirectionKey) {
      case WorkingDirectionKey.ArrowLeft: {
        positionX += MOVE_SENSITIVITY;
        break;
      }
      case WorkingDirectionKey.ArrowRight: {
        positionX -= MOVE_SENSITIVITY;
        break;
      }
      default: {
        break;
      }
    }

    moveRequestId = requestAnimationFrame(handleBackgroundPassing);
    if (!keyStore.store["ArrowLeft"] && !keyStore.store["ArrowRight"]) {
      cancelAnimationFrame(moveRequestId);
      isMoving = false;
    }
  }

  function handleKeyDownEvent(event: KeyboardEvent) {
    if ((event.code === "ArrowLeft" || event.code === "ArrowRight") && !isMoving) {
      moveRequestId = requestAnimationFrame(handleBackgroundPassing);
      isMoving = true;
    }

    keyStore.press(event.code);
    keyStore = keyStore;
  }

  function handleKeyUpEvent(event: KeyboardEvent) {
    keyStore.unpress(event.code);
    keyStore = keyStore;
  }
</script>

<svelte:window on:keydown={handleKeyDownEvent} on:keyup={handleKeyUpEvent} />

<div
  class="findspot-background"
  style="
  background-image: url({BackgroundImg});
  background-position: {positionX}px center;"
/>

<style lang="scss">
  .findspot-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--background-image);
    background-position: var(--background-position);
    background-size: cover;
    background-repeat: repeat-x;
  }
</style>
