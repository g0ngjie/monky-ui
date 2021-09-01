(function () {
    console.clear();
    /*******************************************************************/
    /*******************************************************************/

    /* *******************************常量/变量******************************** */
    const ignoreNickName = "OB无情小强"
    let fireMsg = "火力全开",
        observer, //监听服务
        firePowerId,// 火力全开Id
        timeId, //监听弹幕Id
        queue //队列
    let config = {
        max: 0,
        second: 0
    }

    /* ********************************常量/变量******************************* */

    /* *******************************队列******************************** */
    class ArrQueue {
        constructor() {
            this.arr = [];
            this.maxDataNum = 10; //最大数据存储量
        }
        push(item) {//入队
            const { nickName } = item;
            if (nickName == ignoreNickName) return false;
            if (this.arr.length >= this.maxDataNum) return false;
            this.arr.push(item);
            return true;
        }
        pop() {//出队
            return this.arr.shift();
        }
        getFront() {//队首
            return this.arr[0];
        }
        getRear() {//队尾 
            return this.arr[this.arr.length - 1]
        }
        clear() {
            this.arr = [];
        }
        size() {
            return this.arr.length;
        }
        _getAll() {
            return this.arr;
        }
    }
    /* *******************************队列******************************** */

    /* *******************************common******************************** */
    //获取最新一条弹幕
    function getChatContent() {
        const chatList = document.getElementsByClassName("Barrage-listItem");
        const newChat = chatList[chatList.length - 1];
        const contentNode = newChat.getElementsByClassName("Barrage-content")[0];
        const nameNode = newChat.getElementsByClassName("Barrage-nickName")[0];
        if (contentNode && nameNode) {
            const content = contentNode.innerText;
            const nickName = nameNode.getAttribute("title");
            return { content, nickName }
        }
        return null;
    }
    //发送消息
    function sendMsg(index, content) {
        console.info(`==> 弹幕${index}：`, content);
        const btnDom = document.getElementsByClassName("ChatSend-button");
        if (btnDom && btnDom.length == 1) {
            let inp = document.getElementsByClassName("ChatSend-txt")[0];
            inp.value = content;
            let btnNode = btnDom[0];
            //取消 tips 您的发言速度过快
            let tips = document.getElementsByClassName("BarrageTips")[0];
            if (tips) tips.style.display = "none";
            //收藏弹幕
            const tipDom = document.getElementsByClassName("ChatBarrageCollect-tip")[0];
            tipDom.style.right = "90px";
            //取消 发送间隔限制
            btnNode.classList.remove("is-gray")
            btnNode.innerText = "超级轮询"
            btnNode.style.width = "80px"//
            btnNode.style["margin-left"] = "-40px"
            btnNode.style.background = "#F56C6C";
            btnNode.click();
        }
    }
    //编辑火力全开字幕
    function createFireMsgEvent() {
        function insertAfter(newNode, curNode) {
            curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
        }
        const div = document.createElement("div");
        div.innerHTML = "🚀";
        div.style.display = "inline-block";
        div.style.cursor = "pointer";
        div.style["margin-right"] = "8px";
        div.onclick = () => {
            const result = prompt("火力全开字幕", fireMsg);
            fireMsg = result;
            console.log(`====> 火力弹幕以添加: ${fireMsg}`)
        }
        const ChatEmotion = document.getElementsByClassName("ChatEmotion")[0];
        insertAfter(div, ChatEmotion);
    }
    /* *******************************common******************************** */

    /**
     * 火力全开
     */
    function firePowerTimer() {
        firePowerId = setInterval(function () {
            const FirePower = document.getElementsByClassName("FirePower")[0];
            if (FirePower && FirePower.children.length == 0) {
                console.info("<<<<<< 火力关闭 >>>>>>");
                bulletChatListener();
                const { max, second } = config;
                startMsgTimer(max, second);
                clearInterval(firePowerId);
            }
            sendMsg("火力：", fireMsg);
        }, 1000);
    }

    /**
     * 开启定时器
     * time 默认5s
     * @param {*} max 
     * @param {*} second 
     */
    async function startMsgTimer(max, second = 5) {
        let count = 1;
        const Millisecond = second * 1000;
        timeId = setInterval(function () {
            if (timeId && count > max) {
                console.info("<== 弹幕轰炸结束");
                clearInterval(timeId);
            } else {
                if (queue.size() > 0) {
                    const { content } = queue.pop();
                    sendMsg(count, content);
                }
                count++
            }
        }, Millisecond);
    }

    /**
     * 监听服务，添加队列数据
     */
    function bulletChatListener() {
        console.log(">>>>>> 弹幕爬取 <<<<<<")
        // 选择一个需要观察的节点
        const targetNode = document.getElementById('js-barrage-list');
        // 设置observer的配置选项
        const config = { childList: true };
        //队列
        queue = new ArrQueue();
        // 当节点发生变化时的需要执行的函数
        const callback = function (mutationsList) {
            const FirePower = document.getElementsByClassName("FirePower")[0];
            if (FirePower && FirePower.children.length > 0) {
                console.info(">>>>>> 火力全开!!! <<<<<<");
                //开启火力弹幕
                firePowerTimer();
                clearInterval(timeId);
                // 停止观测
                observer.disconnect();
            }
            for (const mutation of mutationsList) {
                if (mutation.addedNodes.length > 0) {
                    const _data = getChatContent();
                    if (_data) queue.push(_data);
                }
            }
        };
        // 创建一个observer示例与回调函数相关联
        observer = new MutationObserver(callback);
        //使用配置文件对目标节点进行观测
        observer.observe(targetNode, config);
    }

    function dispatch(max, second) {
        createFireMsgEvent();
        bulletChatListener();
        startMsgTimer(max, second);
        config = { max, second };
    }

    dispatch(1000000, 2)

    /*******************************************************************/
    /*******************************************************************/
})()