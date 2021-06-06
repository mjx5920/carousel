
var sendText = document.getElementById('send-text');

sendText.onkeyup = function (e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13) {
        renderDom('mine', this.value);
        ajax({
            // url: 'https://developer.duyiedu.com/edu/turing/chat',
            url: 'http://localhost:3000/chat',
            method: 'get',
            data:{
                text: this.value
            },
            isAsync: true,
            success: function (res) {
                console.log(res)
                renderDom('robot', res.text)
            }
        });
        this.value = "";
    }
}

// 渲染对话内容
/**
 * 
 * @param {String} who   可选值： mine / robot
 * @param {String} text 
 */
function renderDom(who, text) {
    // 当前对话框的class类名
    var divClass = who;
    // 当前对话框的头像
    var avatorImg = ""
    if (who === 'mine') {
        divClass += ' clearfix';
        avatorImg = "./img/3.png";
    } else {
        avatorImg = "./img/dog1.jpg";
    }
    var oDiv = document.createElement('div');
    oDiv.className = divClass;
    oDiv.innerHTML = ` <img class="avator" src="${avatorImg}" alt="">
    <div class="text">${text}</div>`
    var content = document.querySelector('.content');
    content.appendChild(oDiv);
    content.scrollTop = content.scrollHeight;
}
