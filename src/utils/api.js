import fetch from 'dva/fetch'

/* eslint-disable */
const baseUrl = APPURL
/* eslint-enable */

function parseJson(response) {
    return response.json();
}

function checkStatus(response) {
    const { status } = response
    if (status >= 200 && status < 300) {
        return response;
    }
    const err = new Error(response.statusText);
    err.response = response;
    throw err;
}


function requestTool(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJson)
        .then(data => ({ data }))
        .catch(err => ({ err }))
}

const baseHeader = {
    'versionName': 'ios',
    'versionCode': 'ios',
    'equipmentKey': 'ios',
    'Accept': 'application/json'
}

function transFormObjectToFormData(object) {
    // 必须对body进行序列化，否则body会存在webkitformboundary，服务器不能读取
    const formBody = Object.keys(object).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(object[key])).join('&');
    return formBody;
}

// prams是一个object
//接受四个属性url, method, header, body
// header可以传入token等信息
function request(params) {
    const { url } = params;
    const { method } = params;
    const { header } = params;
    const { body } = params;
    // 将自定义header和base合并
    const initHeader = { ...baseHeader, ...header };
    let finalHeader;
    if (method === 'POST') {// post请求需要设置contentType
        // fromData存在，contentType 为application/x-www-form-urlencoded
        if (body) {
            const contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            finalHeader = { ...initHeader, 'Content-Type': contentType };
        } else { // formDate不存在, contentType为applicaiont/json
            const contentType = 'application/json';
            finalHeader = { ...initHeader, 'Content-Type': contentType }
        }
    } else { // get请求不需要设置contentType
        finalHeader = initHeader
    }
    const finalUrl = baseUrl + url;
    return requestTool(finalUrl, {
        method,
        headers: finalHeader,
        // 将body转换为formData的形式
        body: body ? transFormObjectToFormData(body) : {}
    })
}

const api = {
    banner: {
        indexBanner(type, position) {
            const url = `/banner/list/${type}/${position}`
            const method = 'GET';
            const header = {
            };
            return request({
                url,
                method,
                header,
            });
        }
    },
    my: {
        sign(token) {
            const url = '/my/sign';
            const method = 'POST'
            const header = {
                'authorizationCode': token,
            };
            return request({
                url,
                method,
                header,
            });
        },
        info(token) {
            const url = '/my/info';
            const method = 'GET';
            const header = {
                'authorizationCode': token,
            };
            return request({
                url,
                method,
                header,
            });
        },
        getReadHistory(token, page, size) {
            const url = `/my/book/read-record/${page}/${size}`
            const method = 'GET';
            const header = {
                'authorizationCode': token, 
            };
            return request({
                url,
                method,
                header,
            });
        }
    },
    index: {
        indexDetail(type, page, size) {
            const url = `/read/home/${type}/${page}/${size}`;
            const method = 'GET';
            const header = {};
            return request({
                url,
                method,
                header,
            });
        }
    },
    detail: {
        allChapter(id) {
            const url = `/read/chapter/${id}`;
            const method = 'GET';
            const header = {};
            return request({
                url,
                method,
                header,
            });
        },
        chapterContent(bookId, type, chapterId) {
            const url = `/read/book/${bookId}/${type}/${chapterId}`
            const method = 'GET';
            const header = {};
            return request({
                url,
                method,
                header,
            })
        },
        bookDetail(bookId, token) {
            const url = `/get/book-detail/${bookId}`;
            const method = 'GET';
            const header = token ? { 'authorizationCode': token } : {};
            return request({
                url,
                method,
                header,
            })
        }
    },
    login: {
        telLogin(phoneNumber, code) {
            const url = '/login/tel';
            const method = 'POST';
            const header = {};
            const body = {
                tel: phoneNumber,
                tel_code: code,
            };
            return request({
                url,
                method,
                header,
                body,
            });
        },
        getCode(phone) {
            const url = `/login/get-code/${phone}`;
            const method = 'GET';
            const header = {};
            return request({
                url,
                method,
                header,
            });
        }
    },
    report: {
        readrecord(token, time, book_id, chapter_id, content_id) {
            const url = '/reported/content/read-record';
            const method = 'POST';
            const header = {
                'authorizationCode': token,
            };
            const body = {
                time,
                book_id,
                chapter_id,
                content_id,
            };
            return request({
                url,
                method,
                header,
                body,
            });
        }
    }
}

export default api