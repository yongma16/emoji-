<template>
  <div>
    flow
    <!-- 动态添加流程图 左侧30% 组件选择的区域 右侧60%为组件连接的区域-->
  </div>
</template>
<script>
import jsPlumb from "jsplumb";
export default {
  setup() {
    jsPlumb.ready(function () {
      jsPlumb.connect({
        source: "item_left",
        target: "item_right",
        endpoint: "Dot",
      });
    });
    // const
    return {};
  },
};
</script>
