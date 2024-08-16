<script>
export default {
  data() {
    return {
      isMoving: false,
      canvas: null,
      area: null,
      imageX: 0,
      imageY: 0,
      backgroundSrc: "sprite.png",
    };
  },
  mounted() {
    this.canvas = this.$refs.backCanvas;
    this.area = this.$refs.area;
    this.keyboard();
    this.areas();
  },
  methods: {
    areas() {
      this.canvas.style.width = "1280px";
      this.canvas.style.height = "720px";
      this.canvas.style.position = "relative";
      this.area.style.width = "121px";
      this.area.style.height = "131px";
      this.area.style.position = "absolute";
      this.area.style.top = `${this.imageY}px`;
      this.area.style.left = `${this.imageX}px`;
      this.area.style.background = `url('${this.backgroundSrc}') no-repeat`;
      this.area.style.transform = `scale(0.7)`;
    },
    keyboard() {
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 40) {
          this.isMoving = true;
          this.imageY += 5;
          this.area.classList.add("down");
          this.areas();
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.keyCode === 40) {
          this.isMoving = false;
          this.area.classList.remove("down");
        }
      });
    },
  },
};
</script>

<template>
  <div id="backCanvas" ref="backCanvas">
    <div id="area" ref="area"></div>
  </div>
</template>

<style style="scss" scoped>
#backCanvas {
  background: url("../public/gathertown.png") no-repeat center/cover;
  overflow: hidden;
}

#backCanvas #area {
  animation: none;
}

#backCanvas #area.down {
  animation: steper 1s steps(1) infinite;
}

@keyframes steper {
  0% {
    background-position: calc(-121px * 0) -528px;
  }
  10% {
    background-position: calc(-121px * 1) -528px;
  }
  20% {
    background-position: calc(-121px * 2) -528px;
  }
  30% {
    background-position: calc(-121px * 3) -528px;
  }
  40% {
    background-position: calc(-121px * 4) -528px;
  }
  50% {
    background-position: calc(-121px * 5) -528px;
  }
  60% {
    background-position: calc(-121px * 6) -528px;
  }
  70% {
    background-position: calc(-121px * 7) -528px;
  }
  80% {
    background-position: calc(-121px * 8) -528px;
  }
  90% {
    background-position: calc(-121px * 9) -528px;
  }
  100% {
    background-position: calc(-121px * 10) -528px;
  }
}
</style>
