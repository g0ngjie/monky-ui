// ==UserScript==
// @name         油猴UI
// @namespace    https://github.com/g0ngjie
// @version      0.1
// @description  油猴UI工具
// @author       Gj <gongjie0422@163.com>
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?domain=cnblogs.com
// @grant        none
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
    script.onload = cb
    document.head.appendChild(script)
}

(function () {
    'use strict';
    appendLink('//unpkg.com/layui@2.6.8/dist/css/layui.css')
    appendJs('//unpkg.com/layui@2.6.8/dist/layui.js')

    appendLink('//cdn.alrale.cn/index.css')
    appendJs('//cdn.alrale.cn/index.js?ts=' + Date.now(), function () {
        // genContainer()
    })

    /**生成容器 */
    function genContainer() {

        const containerDiv = getElement('div', { id: 'monky_ui_container' })
        containerDiv.id = 'monky_ui_container'
        const titleContainer = getElement('div', { className: 'title-container' })

        const icon = getElement('i', { className: 'layui-icon layui-icon-close-fill' })
        titleContainer.appendChild(icon)
        containerDiv.appendChild(titleContainer)
        document.body.appendChild(containerDiv)
        /**主容器关闭 */
        icon.onclick = () => showContainer(false)
    }


    // Your code here...
})();