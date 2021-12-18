<template>
  <div class="home">
    <div class="home-search">
      <a-input-search
        class="home-search-input"
        v-model:value="emojiData.value"
        placeholder="搜索表情包"
        @change="searchBtn"
      />
    </div>
    <div class="home-emoji">
      <div class="home-emoji-component">
        <Emoji
          v-model:spinning="spinning"
          v-model:delay="delayTime"
          v-model:emojiData="emojiData.imgData"
          v-model:emojiTotal="emojiData.length"
          v-model:searchWords="emojiData.value"
          v-model:searchTitle="emojiData.value"
        ></Emoji>
      </div>
    </div>
  </div>
</template>

<script>
import { auotEmojiApi, getEmojiApi } from "@/services/getEmojiApi";
import Emoji from "@/emoji/Emoji";
import { onMounted, ref, reactive, toRefs } from "vue";
export default {
  name: "Home",
  components: {
    Emoji,
  },
  props: {
    msg: String,
  },
  setup() {
    const state = reactive({
      spinning: false,
      delayTime: 500,
    });
    const value = ref("");
    const emojiData = reactive({
      imgData: [],
      value: "",
      msg: "",
      code: "",
      length: 8,
    });
    onMounted(() => {
      auotEmojiApi()
        .then((response) => {
          const res = response.data;
          emojiData.imgData = res.data;
          emojiData.msg = res.msg;
          emojiData.code = res.code;
          emojiData.length = res.data.length;
        })
        .catch((r) => {
          emojiData.imgData = [];
          emojiData.msg = r;
          emojiData.code = 0;
          emojiData.length = 0;
        });
    });
    // 防抖
    function debounce(delay, callback) {
      let timer;
      return function (value) {
        //闭包
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback(value);
        }, delay);
      };
    }

    // 查询
    const searchEmoji = () => {
      let word = emojiData.value;
      if (word && word !== "") {
        state.spinning = !state.spinning;
        getEmojiApi(word)
          .then((response) => {
            const res = response.data;
            emojiData.imgData = res.data;
            emojiData.msg = res.msg;
            emojiData.code = res.code;
            emojiData.length = res.data.length;
            state.spinning = !state.spinning;
          })
          .catch((r) => {
            emojiData.imgData = [];
            emojiData.msg = r;
            emojiData.code = 0;
            emojiData.length = 0;
            state.spinning = !state.spinning;
          });
      }
      word = null;
    };

    const searchEmojiDelay = debounce(1000, searchEmoji);
    const searchBtn = () => {
      searchEmojiDelay();
    };
    return {
      value,
      emojiData,
      ...toRefs(state),
      searchBtn,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.home-emoji {
  position: relative;
  top: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.home-emoji-component {
  position: relative;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.home-search {
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  box-sizing: border-box;
}

.home-search-input {
  position: relative;
  margin-top: 0;
  width: 85%;
  height: 50px;
  overflow: hidden;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.13);
  z-index: 1;
}

.home-emoji-loading {
  position: relative;
}

/* 手机宽度600px */
@media only screen and (max-width: 600px) {
  .home {
    overflow: auto;
  }
  .home-emoji {
    overflow: auto;
  }

  .home-emoji-component {
    overflow: auto;
  }
}
</style>
