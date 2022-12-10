<script lang="ts">
  import KeyStore from "@/lib/KeyStore";

  import MyDinosaurImg1 from "@/assets/images/my-dinosaur1.png";
  import MyDinosaurImg2 from "@/assets/images/my-dinosaur2.png";
  import MyDinosaurImg3 from "@/assets/images/my-dinosaur3.png";

  const MOVE_SENSITIVITY = 3;
  const POSTRUE_SENSITIVITY = 2;

  let postureList = [MyDinosaurImg1, MyDinosaurImg2, MyDinosaurImg3];
  let currentDirection = 0;
  let currentPosition = 0;
  let postureDelta = 0;

  $: currentPosture = Math.trunc(postureDelta / 20);

  let keyStore = new KeyStore();
  let moveRequestId = 0;

  function move() {
    // Key Code
    // left   : ArrowLeft
    // right  : ArrowRight
    // up     : ArrowUp
    // down   : ArrowDown

    switch (keyStore.getWorkingKey()) {
      case "ArrowLeft": {
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirection = 1;
        currentPosition -= MOVE_SENSITIVITY;
        break;
      }
      case "ArrowRight": {
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirection = 0;
        currentPosition += MOVE_SENSITIVITY;
        break;
      }
      default: {
        break;
      }
    }

    moveRequestId = requestAnimationFrame(move);
  }

  function handleKeyDownEvent(event: KeyboardEvent) {
    if (keyStore.isEmpty()) {
      moveRequestId = requestAnimationFrame(move);
    }

    keyStore.press(event.key);
    keyStore = keyStore;
  }

  function handleKeyUpEvent(event: KeyboardEvent) {
    keyStore.unpress(event.key);
    keyStore = keyStore;

    if (keyStore.isEmpty()) {
      cancelAnimationFrame(moveRequestId);
    }
  }
</script>

<svelte:window on:keydown={handleKeyDownEvent} on:keyup={handleKeyUpEvent} />

<img
  src={postureList[currentPosture]}
  class="dinosaur"
  style="transform: translateX({currentPosition}px) rotateY({currentDirection ? '180deg' : '0'})"
  draggable="false"
  alt="my-dinosaur"
/>
<div />

<style lang="scss">
  .dinosaur {
    position: relative;
    width: 55px;
  }
</style>
