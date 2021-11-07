import axios from "axios"

// get获取表情包
async function getEmojiApi(word) {
    const baseurl = `http://yongma16.xyz/emoji/get/${word}`
        // const baseurl = `http://localhost:8006/emoji/get/${word}`
    return axios.get(baseurl)
}

// 随机二次元表情包
async function auotEmojiApi(params) {
    const baseurl = `http://yongma16.xyz/emoji/get/auto/`
        // const baseurl = 'http://localhost:8006/emoji/get/auto/'
    return axios.post(baseurl, params)
}

// post获取表情包
async function postEmojiApi(params) {
    const baseurl = ''
    return axios.post(baseurl, params)
}

export { getEmojiApi, postEmojiApi, auotEmojiApi }