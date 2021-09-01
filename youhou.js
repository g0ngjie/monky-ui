// ==UserScript==
// @name         油猴UI
// @namespace    https://github.com/g0ngjie
// @version      0.1
// @description  油猴UI工具
// @author       Gj <gongjie0422@163.com>
// @match        *://*/*
// @icon         https://cdn.alrale.cn/monky-ui.png

// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==

function appendLink(src, cb) {
    const link = document.createElement('link')
    link.href = src
    link.rel = 'stylesheet'
    link.onload = cb
    document.head.appendChild(link)
}

function appendJs(src, cb) {
    const script = document.createElement('script')
    script.src = src
    document.head.appendChild(script)
    script.onload = cb
}

(function () {
    'use strict';

    const env = 'dev'
    const jsConf = {
        dev: 'http://localhost:8849/monky.umd.js?ts=',
        pro: 'http://cdn.alrale.cn/monky.umd.min.js?ts='
    }

    const cssConf = {
        dev: 'http://localhost:8849/monky.css',
        pro: 'http://cdn.alrale.cn/monky.css'
    }
    appendLink(cssConf[env])
    appendJs(jsConf[env] + Date.now(), () => {
        monky.setKeyEvent()
            .setContainer()
            .setFixedButton()
    })


})();