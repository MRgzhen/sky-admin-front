import CryptoJS from 'crypto-js'
/**
 * 文件下载
 * @param data
 * @param fileName
 */
export const downLoadBlobFile = (data = Blob, fileName) => { // type为Mime类型
    const name = fileName || new Date().toLocaleDateString()
    const type = null
    const typeStr = type || 'application/octet-stream'

    if (window.navigator.msSaveOrOpenBlob) { // 兼容性处理
        const blob = new Blob([data], { type: typeStr })
        navigator.msSaveBlob(blob, name)
    } else {
        const excelBlob = new Blob([data], { type: typeStr })
        const oa = document.createElement('a')

        oa.href = URL.createObjectURL(excelBlob)
        oa.download = name
        document.body.appendChild(oa)
        oa.click()
    }
}

/**
* 加密方法
* @param data 待加密数据
* @returns {string|*}
*/
export const encrypt = (data) => {
    const key = CryptoJS.enc.Utf8.parse()
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    const plainText = CryptoJS.enc.Utf8.parse(data)
    const secretText = CryptoJS.AES.encrypt(plainText, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).ciphertext.toString()
    return secretText
}

/**
* 解密数据
* @param data 待解密数据
*/
export const decrypt = (data) => {
    const key = CryptoJS.enc.Utf8.parse()
    const secretText = CryptoJS.enc.Hex.parse(data)
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(secretText)
    const result = CryptoJS.AES.decrypt(encryptedBase64Str, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
    return JSON.parse(result)
}

/**
* 获取uuid
*/
export const uuid = () => {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23]
    var uuid = s.join('')
    return uuid
}

/**
* 获取uuid
* @param url 新打开窗口地址
* @param title 窗口标题
* @param w 宽度
* @param h 长度
*/
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
    return newWindow
}

export const socials = () => {
    return [
        { 'title': '微信登录', 'type': 'weixin', 'state': '0' },
        { 'title': 'QQ登录', 'type': 'qq', 'state': '0' },
        { 'title': '码云登录', 'type': 'gitee', 'state': '0' },
        { 'title': 'github登录', 'type': 'github', 'state': '0' },
        { 'title': '微博登录', 'type': 'weibo', 'state': '0' }
    ]
}

export default {
    uuid,
    downLoadBlobFile,
    encrypt,
    decrypt,
    openWindow,
    socials
}
