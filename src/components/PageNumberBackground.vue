<template>
  <div class="page-number">
    <p class="text-background text-floor">Level</p>
    <p class="text-background text-number mt-3">{{this.$store.getters.current}}</p>
  </div>
</template>
<script>
export default {
  name: "pageNumber",
  data() {
    return {
      //floor: this.$store.getters.current,
      //testState: this.$store.state.test
    };
  }
};
</script>
<style lang="scss">
.text-background {
  color: #bad1d0;
  position: fixed;
  font-weight: 400;
  opacity: 50%;
  z-index: 0;
}
.text-floor {
  font-size: 8rem;
  top: 6vh;
  right: 4vw;
}
.text-number {
  font-size: 20rem;
  top: 6vh;
  right: 4vw;
}
.text-background:hover {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
}
</style>