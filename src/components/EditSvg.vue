<template>
  <div class="container">
    <DesignSvg class="container-design"></DesignSvg>
  </div>
</template>

<script>
import DesignSvg from "./base/DesignSvg.vue";
export default {
  name: "EditSvg",
  components: {
    DesignSvg,
  },
  props: {
    msg: String,
  },
  setup() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
  background: url("../assets/editBackground.png"); -->

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.container-design {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
}
</style>
