<template>
<div class="home">
    <div class='home-emoji'>
        <a-input-search v-model:value="emojiData.value" placeholder="搜索表情包" style="margin:20px;width: 80%;height:50px;box-shadow:5px 5px 20px rgba(0,0,0,.13);" @search='searchEmoji(emojiData.value)' />
        <div style="position:relative;">
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
    overflow: auto;
}

.home-emoji {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
