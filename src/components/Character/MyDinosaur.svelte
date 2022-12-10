<script lang="ts">
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

  let isKeyPressing = false;
  let moveRequestId = 0;

  function move(keyCode: number) {
    // KeyCode
    // Arrow right  : 39
    // Arrow left   : 37
    // Arrow Up     : 38
    // Arrow Down   : 38

    switch (keyCode) {
      case 37:
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirection = 1;
        currentPosition -= MOVE_SENSITIVITY;
        break;
      case 39:
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirection = 0;
        currentPosition += MOVE_SENSITIVITY;
        break;
      default:
        break;
    }
    moveRequestId = requestAnimationFrame(move.bind(null, keyCode));
  }

  function handleKeyDownEvent(event: KeyboardEvent) {
    if (isKeyPressing) return;
    isKeyPressing = true;

    moveRequestId = requestAnimationFrame(move.bind(null, event.keyCode));
  }

  function handleKeyUpEvent() {
    if (!isKeyPressing) return;
    isKeyPressing = false;

    cancelAnimationFrame(moveRequestId);
  }
</script>

<svelte:window on:keydown={handleKeyDownEvent} on:keyup={handleKeyUpEvent} />

<img
  src={postureList[currentPosture]}
  class="dinosaur {currentDirection ? 'backward' : 'forward'}"
  style="left: {currentPosition}px;"
  draggable="false"
  alt="my-dinosaur"
/>

<style lang="scss">
  .dinosaur {
    position: relative;
    top: 0;
    left: 0;
  }

  .forward {
    transform: rotateY(0);
  }

  .backward {
    transform: rotateY(180deg);
  }
</style>
