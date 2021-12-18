<template>
  <div>
    <DesignTree :treeConfig="treeConfig" />
  </div>
</template>
<script>
import DesignTree from "./DesignTree.vue";
import { ref } from "vue";
export default {
  components: {
    DesignTree,
  },
  setup() {
    const treeConfig = ref({
      isSearch: true,
      data: [
        {
          key: "0-0",
          title: "0-0",
          children: [
            {
              key: "0-0-0",
              title: "0-0-0",
              children: [],
            },
            {
              key: "0-0-0-0",
              title: "0-0-0-0",
              children: [],
            },
          ],
        },
        {
          key: "0-1",
          title: "0-1",
          children: [
            {
              key: "0-1-0",
              title: "0-1-0",
              children: [],
            },
            {
              key: "0-1-0-0",
              title: "0-1-0-0",
              children: [],
            },
          ],
        },
      ],
    });
    // const x = 3;
    // const y = 2;
    // const z = 1;
    // const genData = [];

    // const generateData = (_level, _preKey, _tns) => {
    //   const preKey = _preKey || "0";
    //   const tns = _tns || genData;
    //   const children = [];

    //   for (let i = 0; i < x; i++) {
    //     const key = `${preKey}-${i}`;
    //     tns.push({
    //       title: key,
    //       key,
    //     });

    //     if (i < y) {
    //       children.push(key);
    //     }
    //   }

    //   if (_level < 0) {
    //     return tns;
    //   }

    //   const level = _level - 1;
    //   children.forEach((key, index) => {
    //     tns[index].children = [];
    //     return generateData(level, key, tns[index].children);
    //   });
    // };

    // generateData(z);
    // const dataList = [];

    // const generateList = (data) => {
    //   for (let i = 0; i < data.length; i++) {
    //     const node = data[i];
    //     const key = node.key;
    //     dataList.push({
    //       key,
    //       title: key,
    //     });

    //     if (node.children) {
    //       generateList(node.children);
    //     }
    //   }
    // };

    // generateList(genData);

    // const getParentKey = (key, tree) => {
    //   let parentKey;

    //   for (let i = 0; i < tree.length; i++) {
    //     const node = tree[i];

    //     if (node.children) {
    //       if (node.children.some((item) => item.key === key)) {
    //         parentKey = node.key;
    //       } else if (getParentKey(key, node.children)) {
    //         parentKey = getParentKey(key, node.children);
    //       }
    //     }
    //   }

    //   return parentKey;
    // };
    // onMounted(() => {
    //   console.log("tree");
    // });
    // console.log(dataList);
    return { treeConfig };
  },
};
</script>
