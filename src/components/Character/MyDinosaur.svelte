<script lang="ts">
  import KeyStore, { WorkingDirectionKey } from "@/lib/KeyStore";

  import MyDinosaurImg1 from "@/assets/images/my-dinosaur1.png";
  import MyDinosaurImg2 from "@/assets/images/my-dinosaur2.png";
  import MyDinosaurImg3 from "@/assets/images/my-dinosaur3.png";

  const MOVE_SENSITIVITY = 3;
  const POSTRUE_SENSITIVITY = 2;
  const IDLE_POSTURE = 0;
  const JUMP_POSTURE = 1;

  let postureList = [MyDinosaurImg1, MyDinosaurImg2, MyDinosaurImg3];
  let currentDirectionX = 0;
  let currentDirectionY = 0;
  let currentPositionX = 0;
  let currentPositionY = 0;
  let currentPosture = 0;
  let postureDelta = 0;

  let isMoving = false;
  let isJumping = false;

  $: {
    currentPosture = Math.trunc(postureDelta / 20);

    if (!isMoving) {
      currentPosture = IDLE_POSTURE;
    }

    if (isJumping) {
      currentPosture = JUMP_POSTURE;
    }
  }

  let keyStore = new KeyStore();
  let moveRequestId = 0;
  let jumpRequestId = 0;

  function handleMove() {
    switch (keyStore.workingDirectionKey) {
      case WorkingDirectionKey.ArrowLeft: {
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirectionX = 1;
        currentPositionX -= MOVE_SENSITIVITY;
        break;
      }
      case WorkingDirectionKey.ArrowRight: {
        postureDelta = (postureDelta + POSTRUE_SENSITIVITY) % 60;
        currentDirectionX = 0;
        currentPositionX += MOVE_SENSITIVITY;
        break;
      }
      default: {
        break;
      }
    }

    moveRequestId = requestAnimationFrame(handleMove);
    if (!keyStore.store["ArrowLeft"] && !keyStore.store["ArrowRight"]) {
      cancelAnimationFrame(moveRequestId);
      isMoving = false;
    }
  }

  function handleJump() {
    if (currentDirectionY) {
      currentPositionY -= MOVE_SENSITIVITY;
    } else {
      currentPositionY += MOVE_SENSITIVITY;
    }

    if (currentPositionY > 100) {
      currentDirectionY = 1;
    }

    jumpRequestId = requestAnimationFrame(handleJump);
    if (currentPositionY < 0) {
      cancelAnimationFrame(jumpRequestId);
      currentDirectionY = 0;
      isJumping = false;
    }
  }

  function handleKeyDownEvent(event: KeyboardEvent) {
    if ((event.code === "ArrowLeft" || event.code === "ArrowRight") && !isMoving) {
      moveRequestId = requestAnimationFrame(handleMove);
      isMoving = true;
    }

    if (event.code === "Space" && !isJumping) {
      jumpRequestId = requestAnimationFrame(handleJump);
      isJumping = true;
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

<img
  src={postureList[currentPosture]}
  class="dinosaur"
  style="
    --positionX:{`${currentPositionX}px`};
    --positionY:{`${-currentPositionY}px`};
    --direction:{currentDirectionX ? '180deg' : '0'}"
  draggable="false"
  alt="my-dinosaur"
/>

<style lang="scss">
  .dinosaur {
    position: relative;
    width: 55px;
    transform: translateX(var(--positionX)) translateY(var(--positionY)) rotateY(var(--direction));
  }
</style>
