<template>
<div class="emoji">
    <a-card :title="searchTitle? searchTitle:'欢迎搜索'">
        <template v-for="item,index in showEmoji.showImg" :key='index'>
            <a-card-grid style="width: 20%;text-align: center;overflow:auto;">
                <a-image :src="item" style="height:110px" />
            </a-card-grid>
        </template>
    </a-card>
    <!-- 分页 -->
    <div style="margin:5px;text-align:right">
        <a-pagination v-model:current="pageData.crurentPage" :page-size="pageData.splitNum" @change="gotoCurrentPage(pageData.crurentPage, pageData.total)" :total="pageData.total" :show-total="total => `总共 ${total} 记录`" />
    </div>
</div>
</template>

<script>
import {
    reactive,
    onMounted,
    toRefs,
    watch
} from 'vue'
export default {
    name: 'Emoji',
    props: {
        emojiData: Array,
        emojiTotal: Number,
        searchWords: String,
        searchTitle: String
    },
    setup(props) {
        const {
            emojiData
        } = toRefs(props)
        const cardTitle = reactive({
            title: '搜索结果'
        })
        const pageData = reactive({
            crurentPage: 1,
            total: emojiData.value.length,
            splitNum: 15
        })
        // 展示数据
        const showEmoji = reactive({
            showImg: []
        })
        // 制作一个分页，一页有十张图片
        function pageSplit() {
            if (emojiData && emojiData !== []) {
                // 存在
                pageData.crurentPage = 1
                showEmoji.showImg = []
                pageData.total = props.emojiTotal
                if (props.pageTotal <= pageData.splitNum) {
                    // 开始分页
                    showEmoji.showImg = emojiData
                } else {
                    for (let imgLoc = 0; imgLoc < pageData.splitNum; ++imgLoc) {
                        showEmoji.showImg.push(props.emojiData[imgLoc])
                    }
                }
            }
        }

        onMounted(() => {
            // 分页
            pageSplit()
        })
        watch(() => {
            props.emojiData
        }, () => {
            console.log(props.searchTitle, 'emoji组件渲染图片')
            pageSplit()
        }, {
            immediate: false,
            deep: true
        })
        //点击分页跳转

        watch(() => {
            pageData
        }, () => {
            pageSplit()
            const page = pageData.crurentPage = 1
            const pageSize = pageData.total = props.emojiTotal
            gotoCurrentPage(page, pageSize)

        }, {
            immediate: true,
            deep: true
        })

        function gotoCurrentPage(page, pageSize) {
            console.log('翻页', page)
            let length = pageSize
            showEmoji.showImg = []
            for (let imgLoc = pageData.splitNum * (page - 1); imgLoc < (pageData.splitNum * page) && imgLoc < length; ++imgLoc) {
                //
                showEmoji.showImg.push(props.emojiData[imgLoc])
            }
        }
        return {
            ...props,
            cardTitle,
            showEmoji,
            pageData,
            gotoCurrentPage
        }
    }
}
</script>

<style scoped>
.emoji {
    position: relative;
    display: block;
    /* padding:80px; */
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    overflow: hidden;
}
</style>
