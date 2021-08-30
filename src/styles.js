
export const monky_ui_container = `
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 8848;
    width: 800px;
    height: 500px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    -webkit-box-shadow: #aeaeae 0px 0px 10px;
            box-shadow: #aeaeae 0px 0px 10px;
    background-color: #fff;
    padding: 10px;
    color: #545454;
    font-size: 12px;
    display: none;`

export const titleContainer = `
    width: 100%;
    height: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;`

export const layuiIconCloseFill = `
    color: #ff5722;
    font-size: 25px;
    cursor: pointer;`

export function addStyle(target, styles) {
    target.style.styleSheet.cssText = styles
}