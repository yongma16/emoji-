<template>
  <div class="tree-path-node">
    <div class="tree-path-node-render" id="treepathId"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  porps: {},
  setup() {
    const state = reactive({
      pathData: {},
    });
    onMounted(() => {
      console.log("路径图");
      // 树状图渲染
      renderTreePath();
    });
    const renderTreePath = () => {
      let treeDom = document.getElementById("treepathId");
      let renderDom = echarts.init(treeDom);
      let options = {
        title: {
          text: "2021->2022 我的职业",
          color: "#fff",
          x: "left",
          width: 120,
          height: 80,
          backgroundColor: "#6dd5ed",
          borderColor: "#fff",
          borderWidth: 1,
          padding: 5,
          textStyle: {
            fontFamily: "Arial",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "bold",
            color: "#fff",
          },
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 0,
            roam: true,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 15,
            },
            label: {
              //
              show: true,
              formatter: function (params) {
                console.log(params, params);
                return params.name;
              },
              width: 80,
              fontSize: 16,
              height: 40,
              color: "#fff",
              backgroundColor: "#6dd5ed",
              borderColor: "#fff",
              borderWidth: 1,
            },
            data: [
              {
                name: "2021",
                x: 100,
                y: 50,
              },
              {
                name: "2022",
                x: 800,
                y: 50,
              },
              {
                name: "数据分析",
                x: 100,
                y: 275,
              },
              {
                name: "sql语言",
                x: 450,
                y: 450,
              },
              {
                name: "javascript",
                x: 450,
                y: 100,
              },
              {
                name: "前端vue",
                x: 800,
                y: 275,
              },
            ],
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [10, 20],
                label: {
                  show: true,
                  fontWeight: "bold",
                  color: "#fff",
                  formatter: function () {
                    // console.log(params, params);
                    return "数据分析->前端";
                  },
                },
                lineStyle: {
                  width: 1,
                  color: "#6dd5ed",
                  curveness: 0,
                },
              },
              {
                source: 2,
                target: 3,
                label: {
                  show: true,
                  color: "#fff",
                  formatter: function () {
                    return "mysql pgsql greemplum";
                  },
                },
                lineStyle: {
                  color: "#6dd5ed",
                  curveness: 0,
                },
              },
              {
                source: 2,
                target: 4,
                label: {
                  show: true,
                  color: "#fff",
                  formatter: function () {
                    return "es6";
                  },
                },
                lineStyle: {
                  color: "#6dd5ed",
                  curveness: 0,
                },
              },
              {
                source: 3,
                target: 5,
                label: {
                  show: true,
                  formatter: function () {
                    return "";
                  },
                },
                lineStyle: {
                  color: " #6dd5ed",
                },
              },
              {
                source: 4,
                target: 5,
                label: {
                  show: true,
                  color: "#fff",
                  formatter: function () {
                    return "es6->es12";
                  },
                },
                lineStyle: {
                  color: " #6dd5ed",
                },
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      treeDom && options && renderDom.setOption(options, true); //渲染
      try {
        window.onresize(() => {
          renderDom.resize(); //窗口改变重绘
        });
      } catch (error) {
        throw Error(error);
      }
    };
    return { ...toRefs(state) };
  },
});
</script>
<style>
.tree-path-node {
  position: relative;
  height: 100%;
  width: 100%;
  /* background: linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px);
  background-repeat: repeat;
  background-size: 10px 10px; */
  border: 1px solid #00cec9;
}
.tree-path-node-render {
  width: 100%;
  height: 800px;
  border: 1px solid #00cec9;
}
</style>
