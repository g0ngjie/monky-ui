
class UIStore {
    /**
     * 获取存储空间
     * 油猴 | 浏览器
     */
    static getStore(key) {
        // 优先判断油猴
        if (window.GM_getValue) return window.GM_getValue(key)
        else return window.localStorage.getItem(key)
    }

    static setStore(key, value) {
        if (window.GM_getValue) return window.GM_setValue(key, value)
        else return window.localStorage.setItem(key, value)
    }
}

function customEveltListener(callback) {
    document.onkeydown = function (e) {
        e.preventDefault()
        const keyCode = e.keyCode || e.which || e.charCode;
        const altKey = e.altKey
        const ctrlKey = e.ctrlKey
        const shiftKey = e.shiftKey
        if (altKey && keyCode == 81) { // q
            callback('show')
        }
        if (keyCode == 27) { // esc
            callback('hide')
        }
    }
}

function showContainer(bool = true) {
    const container = document.getElementById('monky_ui_container')
    if (bool) {
        container.style.display = 'block'
        container.className = 'layui-anim layui-anim-downbit'
    } else {
        container.style.display = 'none'
    }
}

function getElement(ele, params = {}) {
    const dom = document.createElement(ele)
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const value = params[key];
            dom[key] = value
        }
    }
    return dom
}

/***************************************** API ******************************************** */

export default class Container {

    static setKeyEvent() {
        customEveltListener(function (type) {
            if (type === 'show') showContainer()
            if (type === 'hide') showContainer(false)
        })
        return this
    }

    /**生成容器 */
    static setContainer() {
        const containerDiv = getElement('div', { id: 'monky_ui_container' })
        const titleContainer = getElement('div', { className: 'title-container' })
        const icon = getElement('div', { className: 'icon-close' })
        titleContainer.appendChild(icon)
        containerDiv.appendChild(titleContainer)
        document.body.appendChild(containerDiv)
        /**主容器关闭 */
        icon.onclick = () => showContainer(false)
        return this
    }

    /**生成浮块 */
    static setFixedBlock() {
        let show = false
        const fixedBlock = getElement('div', { id: 'monky_ui_fixed_block' })
        fixedBlock.onclick = function () {
            show = !show
            showContainer(show)
        }
        document.body.appendChild(fixedBlock)
        return this
    }

    /**生成按钮 */
    static setFixedButton() {
        const fixedButton = getElement('div', { id: 'monky_ui_fixed_button' })
        document.body.appendChild(fixedButton)
        /**主容器打开 */
        fixedButton.onclick = () => showContainer()
        return this
    }
}
