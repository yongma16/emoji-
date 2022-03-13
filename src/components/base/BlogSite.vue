<template>
  <div class="preview-myblog">
    <iframe :src="baseUrl" class="myblog-site"> </iframe>
  </div>
</template>
<script>
import { onMounted, defineComponent, toRefs, reactive } from "vue";
export default defineComponent({
  props: {
    detailConfig: Object,
  },
  setup() {
    const state = reactive({
      baseUrl: "http://yongma16.xyz/",
      title: "vue2博客",
    });
    onMounted(() => {
      console.log("预览博客主页");
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="less">
.preview-myblog {
  position: relative;
  width: 100%;
  height: 100%;
  .myblog-site {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    display-outside: none;
  }
}
</style>
