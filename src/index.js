
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
customEveltListener(function (type) {
    if (type === 'show') showContainer()
    if (type === 'hide') showContainer(false)
})

function getElement(ele, params = {}) {
    const div = document.createElement(ele)
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const value = params[key];
            div[key] = value
        }
    }
    return div
}

/**生成容器 */
function genContainer() {

    const containerDiv = getElement('div', { id: 'monky_ui_container' })
    const titleContainer = getElement('div', { className: 'title-container' })
    const icon = getElement('i', { className: 'layui-icon layui-icon-close-fill' })
    titleContainer.appendChild(icon)
    containerDiv.appendChild(titleContainer)
    document.body.appendChild(containerDiv)
    /**主容器关闭 */
    icon.onclick = () => showContainer(false)
}

genContainer()