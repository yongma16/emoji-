<template>
<div class="emoji">
    <div class="emoji-img">
        <a-card :title="searchTitle? '关键词：'+searchTitle:'欢迎搜索图片与表情包'">
        <template v-for="item,index in showEmoji.showImg" :key='index'>
            <!-- <a-card-grid class="grid-img-class"> -->
                <a-image :src="item" class="card-img-image" />
            <!-- </a-card-grid> -->
        </template>
    </a-card>
    </div>
    <!-- 分页 -->
    <div class="emoji-page">
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
    overflow: auto;
    box-sizing: border-box;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, .18);
}
.emoji-img{
    position: relative;
    width:100%;
}
.emoji-page {
    margin: 5px;
    text-align: right;
}
.grid-img-class {
    width: 20%;
    height: 200px;
    text-align: center;
    overflow: auto;
    align-content: center;
    justify-items: center;
}

.grid-img-class::-webkit-scrollbar-track {
    border-radius: 2px;
    background: #b46868;

}

/* 滚动条的滑轨背景颜色 */

.grid-img-class::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 2px;
    background: rgba(17, 227, 255, 0.2);

}

/* 滑块颜色 */

.grid-img-class::-webkit-scrollbar-button {
    border-radius: 2px;
    background: #ffa581;

}

/* 滑轨两头的监听按钮颜色 */

.grid-img-class::-webkit-scrollbar-corner {
    border-radius: 2px;
    background: rgb(81, 255, 226);

}

/* 横向滚动条和纵向滚动条相交处尖角的颜色 */
.card-img-image {
    position: relative;
    height: 110px;
}


@media only screen and (max-width: 600px) {
    .grid-img-class {
        width: 100%
    }

    .emoji {
        overflow: auto;
    }

    .card-img-image {
        height: auto;
    }
}
</style>
