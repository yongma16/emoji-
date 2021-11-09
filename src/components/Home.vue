<template>
<div class="home">
    <div class="home-search">
        <a-input-search class="home-search-input" v-model:value="emojiData.value" placeholder="搜索表情包" @search='searchEmoji(emojiData.value)' />
    </div>
    <div class='home-emoji'>
        <div class="home-emoji-component">
            <Emoji :emojiData="emojiData.imgData" :emojiTotal="emojiData.length" :searchWords="emojiData.value" :searchTitle="emojiData.value"></Emoji>
        </div>
    </div>
</div>
</template>

<script>
import {
    auotEmojiApi,
    getEmojiApi
} from '@/services/getEmojiApi'
import Emoji from '@/emoji/Emoji'
import {
    onMounted,
    ref,
    reactive
} from 'vue'
export default {
    name: 'Home',
    components: {
        Emoji
    },
    props: {
        msg: String
    },
    setup() {
        const value = ref('')
        const emojiData = reactive({
            imgData: [],
            value: '',
            msg: '',
            code: '',
            length: 8
        })
        onMounted(() => {
            auotEmojiApi().then((response) => {
                const res = response.data
                emojiData.imgData = res.data
                emojiData.msg = res.msg
                emojiData.code = res.code
                emojiData.length = res.data.length
            }).catch((r) => {
                emojiData.imgData = []
                emojiData.msg = r
                emojiData.code = 0
                emojiData.length = 0
            })
        })
        const searchEmoji = (word) => {
            console.log('search', word)
            getEmojiApi(word).then((response) => {
                const res = response.data
                emojiData.imgData = res.data
                emojiData.msg = res.msg
                emojiData.code = res.code
                emojiData.length = res.data.length
            }).catch((r) => {
                emojiData.imgData = []
                emojiData.msg = r
                emojiData.code = 0
                emojiData.length = 0
            })
        }
        return {
            value,
            emojiData,
            searchEmoji
        }
    }
}
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
    top: 60px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

.home-emoji-component {
    position: relative;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
}

.home-search {
    position: relative;
}

.home-search-input {
    position: fixed;
    margin-top: 0;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    overflow: hidden;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, .13);
    z-index: 1;
}

/* 手机宽度600px */
@media only screen and (max-width: 600px) {
    .home{
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
