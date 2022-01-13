<template>
  <div id="app">
    <a-layout style="width: 100%; height: 100%; padding: 0">
      <a-layout>
        <a-layout-header
          style="
            background: #076585;
            text-align: left;
            padding: 0;
            box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
          "
        >
          <a-menu
            v-model:selectedKeys="currentModel"
            mode="horizontal"
            @select="selectMenu"
          >
            <a-menu-item key="home">
              <template #icon>
                <HomeOutlined />
                <mail-outlined />
              </template>
              博客主页
            </a-menu-item>
            <a-menu-item key="imgSearch">
              <template #icon>
                <SearchOutlined />
              </template>
              图片搜索
            </a-menu-item>
            <a-menu-item key="designFlow">
              <template #icon>
                <FundOutlined />
              </template>
              关系图
            </a-menu-item>
            <a-menu-item key="editSvg">
              <template #icon>
                <FontColorsOutlined />
              </template>
              在线修改csv
            </a-menu-item>
            <a-menu-item key="github">
              <template #icon>
                <GithubOutlined />
              </template>
              github
            </a-menu-item>
            <a-menu-item key="codeChina">
              <template #icon>
                <mail-outlined />
              </template>
              yma16(codeChina)
            </a-menu-item>
            <!-- style="float:right;position: absolute;" -->
            <a-menu-item key="writer">
              <template #icon>
                <a-avatar src="http://yongma16.xyz/static/emoji/imgs/yma16.jpg" />
              </template>
              yma16
            </a-menu-item>
          </a-menu>
        </a-layout-header>
        <a-layout-content
          style="
            padding: 10px;
            background: url('http://yongma16.xyz/static/emoji/imgs/background.jpg');
            background-size: cover;
            background-repeat: no-repeat;
          "
        >
          <component :is="currentComponent" :msg="msg"></component>
        </a-layout-content>
        <a-layout-footer style="box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2)">
          <div class="footer_font">
            Copyright &copy;2021 yongma16.xyz &nbsp;&nbsp;&nbsp;浏览量:{{ readCount }}
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { MailOutlined } from "@ant-design/icons-vue";
import {
  GithubOutlined,
  HomeOutlined,
  SearchOutlined,
  FontColorsOutlined,
  FundOutlined,
} from "@ant-design/icons-vue";
import { toRefs, reactive, onMounted } from "vue";
import EmojiSearch from "./components/EmojiSearch";
import EditSvg from "./components/EditSvg";
import TreePath from "./treePath/TreePath";
import { getReadInfo } from "./services/getEmojiApi";
export default {
  name: "App",
  components: {
    EmojiSearch,
    MailOutlined,
    GithubOutlined,
    HomeOutlined,
    SearchOutlined,
    FontColorsOutlined,
    FundOutlined,
    EditSvg,
    TreePath,
  },
  setup() {
    const state = reactive({
      currentModel: ["imgSearch"],
      components: ["EmojiSearch", "TreePath", "EditSvg"],
      currentComponent: "EmojiSearch",
      msg: "表情包搜索",
      readCount: null,
    });
    const selectMenu = ({ item, key, selectedKeys }) => {
      console.log(item, key, selectedKeys);
      jumpPage(key);
    };
    const jumpPage = (value) => {
      switch (value) {
        case "home":
          window.open("http://yongma16.xyz/");
          break;
        case "github":
          window.open("https://github.com/yongma16/emoji-search");
          break;
        case "codeChina":
          window.open("https://codechina.csdn.net/qq_38870145/myblogvue");
          break;
        case "writer":
          window.open("https://blog.csdn.net/qq_38870145");
          break;
        case "editSvg":
          state.currentComponent = "EditSvg";
          break;
        case "imgSearch":
          state.currentComponent = "EmojiSearch";
          break;
        case "designFlow":
          state.currentComponent = "TreePath";
          break;
        default:
          break;
      }
    };
    onMounted(() => {
      try {
        getReadInfo().then((res) => {
          if (res) {
            state.readCount = res.data.num;
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
    return {
      ...toRefs(state),
      selectMenu,
    };
  },
};
</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  /* padding: 10px; */
  /* background: #076585; */
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #fff, #076585);
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to top, #fff, #076585); */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.footer_font {
  position: relative;
  top: 25%;
  /* height: 100%; */
  margin: 0;
  padding: 0;
  font-weight: 200;
}

@media only screen and (max-width: 600px) {
  #app {
    overflow: auto;
    /* overflow: hidden; */
    background: #fff;
    box-sizing: border-box;
  }
}
</style>
