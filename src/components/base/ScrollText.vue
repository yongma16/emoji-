<template>
  <div class="scroll-container">
    <div class="scroll-container-header">
      {{ title }}
      <a-input v-model:value="contentText" :placeholder="placeholder"></a-input>
    </div>
    <div class="scroll-container-content" id="scroll-container-content-id">
      <div
        class="scroll-container-content-outside"
        id="scroll-container-content-outside-id"
      >
        <div
          class="scroll-container-content-text"
          id="scroll-container-content-text-id"
        >
          <p id="scroll-container-content-text-p-id">{{ contentText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted, watch } from "vue";
export default {
  setup() {
    const state = reactive({
      title: "文字横向溢出滚动测试",
      contentText: "",
      placeholder: "请输入文字测试（大于8个字符开始滚动）",
    });
    // 监听
    watch(
      () => state.contentText,
      () => {
        if (state.contentText) {
          getFontWidth();
        } else {
          clearInterval(timer);
        }
      }
    );
    // 周期
    onMounted(() => {
      getFontWidth();
    });
    function getFontWidth() {
      let parentDom = document.getElementById("scroll-container-content-id");
      let outsideDom = document.getElementById(
        "scroll-container-content-outside-id"
      );
      let containerDom = document.getElementById(
        "scroll-container-content-text-id"
      );
      let pDom = document.getElementById("scroll-container-content-text-p-id");
      let parentDomWidth = parentDom.getBoundingClientRect().width;
      let outsideDomWidth = outsideDom.getBoundingClientRect().width;
      let containerDomWidth = containerDom.getBoundingClientRect().width;
      let pDomWidth = pDom.getBoundingClientRect().width;
      console.log(
        "宽度 getBoundingClientRect this 元素自身的宽",
        parentDomWidth,
        outsideDomWidth,
        containerDomWidth,
        pDomWidth
      );
      let parentDomStyleWidth = parentDom.style.width;
      let outsideDomStyleWidth = outsideDom.style.width;
      let containerDomStyleWidth = containerDom.style.width;
      let pDomStyleWidth = pDom.style.width;
      console.log(
        "宽度 style this 元素自身的宽",
        parentDomStyleWidth,
        outsideDomStyleWidth,
        containerDomStyleWidth,
        pDomStyleWidth
      );
      let parentDomOffsetWidth = parentDom.offsetWidth;
      let outsideDomOffsetWidth = outsideDom.offsetWidth;
      let containerDomOffsetWidth = containerDom.offsetWidth;
      let pDomOffsetWidth = pDom.style.offsetWidth;
      console.log(
        "宽度 OffsetWidth this 元素自身的宽",
        parentDomOffsetWidth,
        outsideDomOffsetWidth,
        containerDomOffsetWidth,
        pDomOffsetWidth
      );
      let pDomScrollWidth = pDom.scrollWidth;
      console.log("文字ScrollWidth", pDomScrollWidth);
      console.log("pDom clientWidth", pDom.clientWidth);
      // let translate = 30;
      // pDom.style.transform = `translate3d(${-translate}px, 0, 0)`;
      if (state.contentText.length) {
        let fontSize = state.contentText.length * 16; //1em=16px，padding
        console.log("fontSize", fontSize);
        let length = fontSize - (containerDomOffsetWidth + 80); //文字多余长度
        console.log("长度", length);
        if (length > 0) {
          console.log("超出的长度", length);
          //屏蔽
          if (length < 0) {
            startMover(length, pDom);
          }
        } else {
          console.log("未超出的长度", length);
          pDom.style.transform = `none`;
        }
      }
    }

    let timer = null;

    function startMover(a, textDom) {
      //速度和目标值
      console.log("开始移动");
      clearInterval(timer); //执行当前动画同时清除之前的动画
      timer = setInterval(function () {
        console.log("textDom scrollWidth", textDom.scrollWidth);
        let speed = a / 10; //缓冲动画的速度参数变化值
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (a >= 0) {
          console.log("textDom scrollWidth", textDom.scrollWidth);
          textDom.style.transform = `translate3d(${
            textDom.offsetWidth + speed
          }px, 0, 0)`;
          console.log("循环体 +");
          textDom.style.transform = `translate3d(${-(
            textDom.offsetWidth + speed
          )}px, 0, 0)`;
        } else {
          textDom.style.transform = `translate3d(${-(
            textDom.offsetWidth + speed
          )}px, 0, 0)`;
          console.log("循环体 —");
          textDom.style.transform = `translate3d(${
            textDom.offsetWidth + speed
          }px, 0, 0)`;
        }
        //如果速度是大于0，说明是向右走，那么就向上取整
        console.log("循环体");
        console.log("textDom offsetWidth", textDom.style);
      }, 1000);
    }

    return { ...toRefs(state) };
  },
};
</script>
<style scoped lang="less">
// 居中
.content-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
// 背景色
.gradient-color {
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
// 字体颜色
.gradient-font-color {
  border: 1px solid #4e54c8;
}
.scroll-container {
  width: 800px;
  height: 600px;
  padding: 20px;
  .content-center();
  .gradient-color();
  .scroll-container-content {
    padding-top: 20px;
    width: 200px;
    text-align: left;
    .scroll-container-content-outside {
      position: relative;
      padding-top: 20px;
      width: 100%;
      text-align: center;
      .scroll-container-content-text {
        position: relative;
        width: 100px;
        height: 80px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        .gradient-font-color();
        p {
          position: relative;
          font-size: 1em;
          line-height: 80px;
          width: auto;
          word-break: keep-all;
          white-space: nowrap;
          transition: 2s;
          border: 0.5px solid #2980b9;
        }
      }
    }
  }
}
</style>
