
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

/**主容器关闭 */
function handleContainerClose() {
    showContainer(false)
}
