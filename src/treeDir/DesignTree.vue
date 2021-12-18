/* eslint-disable vue/valid-v-slot */ /* eslint-disable vue/require-v-for-key */
<template>
  <div style="text-align: left">
    <a-input-search
      v-if="treeConfig.isSearch"
      v-model:value="searchValue"
      style="margin-bottom: 8px"
      placeholder="Search"
      @search="onSearch"
    />
    <a-tree
      :expandedKeys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeConfig.data"
      draggable
      @expand="onExpand"
      @dragenter="onDragEnter"
      @drop="onDrop"
      @select="select"
    >
      <!-- 自定义图标 -->
    </a-tree>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
// import { CarryOutOutlined } from "@ant-design/icons-vue";
export default {
  components: {},
  props: {
    treeConfig: Object,
  },
  setup(props) {
    //   变量
    const expandedKeys = ref([]);
    const autoExpandParent = ref(true);
    const searchValue = ref("");
    const state = reactive({
      treeConfig: {},
    });
    onMounted(() => {
      console.log("design", props.treeConfig);
    });
    // 删除
    const deleteBtn = (key, value) => {
      console.log(key, value);
    };
    // 新增
    const addBtn = (key, value) => {
      console.log(key, value);
    };
    // 重命名
    const editBtn = (key, value) => {
      console.log(key, value);
    };
    // 拖拽
    const dragBtn = (startKey, startValue, startLoc, endLoc, endKey, endValue) => {
      console.log(startKey, startValue, startLoc, endLoc, endKey, endValue);
    };
    // 查询
    const onSearch = (value) => {
      console.log(value);
    };
    // 展开
    const onExpand = (keys) => {
      expandedKeys.value = keys; //展开的key
      autoExpandParent.value = false; //关闭展开
    };
    // 拖拽结束
    const onDrop = (info) => {
      console.log("onDrop", info);
    };
    // 拖拽
    const onDragEnter = (info) => {
      console.log("onDragEnter", info); // expandedKeys 需要展开时
      // expandedKeys.value = info.expandedKeys
    };
    // 选择
    const select = (info, e) => {
      console.log(info, e);
    };
    return {
      ...state,
      deleteBtn,
      addBtn,
      editBtn,
      dragBtn,
      onSearch,
      searchValue,
      expandedKeys,
      autoExpandParent,
      onExpand,
      onDrop,
      onDragEnter,
      select,
    };
  },
};
</script>
<style></style>
