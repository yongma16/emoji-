<template>
  <div class="preview-prop-card">
    <component
      :is="previewDetailConfig.componentName"
      :msg="previewDetailConfig.title"
      class="preview-component-style"
    ></component>
  </div>
</template>

<script>
// 区分ifream和componnet
import EmojiSearch from "@/components/EmojiSearch";
import EditSvg from "@/components/EditSvg";
import TreePath from "@/treePath/TreePath";
import ScrollText from "@/components/base/ScrollText";
import BlogSite from "@/components/base/BlogSite";
import { onMounted, defineComponent, toRefs, reactive } from "vue";
export default defineComponent({
  props: {
    previewDetailConfig: Object,
  },
  components: {
    EmojiSearch,
    EditSvg,
    TreePath,
    ScrollText,
    BlogSite,
  },
  setup() {
    const state = reactive({
      title: "",
      content: "",
      componentName: "TreePath",
    });
    onMounted(() => {
      console.log("悬浮小卡片");
    });
    return { ...toRefs(state) };
  },
});
</script>

<style scoped lang="less">
.box-center {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.preview-prop-card {
  position: relative;
  width: 800px;
  height: 800px;
  margin: 0;
  padding: 0;
}
.preview-component-style {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
