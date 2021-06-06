
/**
 * ajax: async javascript and xml / json
 *         异步的JavaScript 和 xml / json {}
 *         用途： 进行数据交互 （网络请求）
 *   XMLHTTPRequest()
 *   
 * 
 * 简单请求的ajax：
 *      1. 请求方式： get / post / head
 *      2. 请求头信息： 只能含有：
 *          Accept: *
            Accept-Encoding: gzip, deflate, br
            Accept-Language: zh-CN,zh;q=0.9
            Connection: keep-alive
            Host: 127.0.0.1:5501
            If-Modified-Since: Tue, 27 Aug 2019 11:48:43 GMT
            If-None-Match: W/"6f2-16cd2e81e70"
            Referer: http://127.0.0.1:5501/view/index.html
            Sec-Fetch-Mode: cors
            Sec-Fetch-Site: same-origin
            User-Agent:
            Content-Type: application/x-www-form-urlencode ;  multipart/form-data;   text/plain;
 *    url: 请求的地址 
 *    method: 请求方式  get  
 *    data: 请求数据（请求参数）
 *    isAsync: 是否异步 true  
 *    success: 成功的回调函数
 *    headers : {}
 *  @param { Object } options
 * 
 */
function ajax (options) {
    // var xhr = new XMLHttpRequest();
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
        return alert('当前浏览器不支持XMLHTTPRequest');
    }
    var method = "";
    var data = "";
    var isAsync = typeof options.isAsync === 'undefined' ? true : options.isAsync;
    var url = options.url;
    var success = typeof options.success === 'function' ? options.success : function () {};
    if (options.method) {
        method = options.method.toUpperCase();
    } else {
        method = 'GET';
    }
    // 0 - 4
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
        }
    }
    if (typeof options.data === 'object') {
        for (var prop in options.data) {
            data += prop + '=' + options.data[prop] + '&';
        }
        // console.log(data)
        data = data.slice(0, data.length - 1);
    } else {
        data = options.data;
    }
    if (method === 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else {
        // 建立连接
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
        // key=value&key1=value
        // 发送数据的
        xhr.send(data);
    }
    
}