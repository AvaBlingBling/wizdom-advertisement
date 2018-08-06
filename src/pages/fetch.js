export function postService(path, body, callback, callback2) {
  fetch(path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'default',
    body: JSON.stringify(body),
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);
    });
  }).catch((error) => {
    callback2(error);
  });
}

export function putService(path, body, callback, callback2) {
  fetch(path, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'default',
    body: JSON.stringify(body),
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);
    });
  }).catch((error) => {
    callback2(error);
  });
}

export function getService(path, callback) {
  fetch(path, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    if (response.status === 200) {
      return response.json().then((json) => {
        callback && callback(json);
      });
    }
  }).catch((error) => {
  })
}

export function getServiceResponse(path, callback, callback2) {
  fetch(path, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);
    });
  }).catch((error) => {
    callback2(error);
  });
}
export function getServiceSync(path, callback) {
  fetch(path, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
    sync: true,//同步请求
  }).then(function (response) {
    return response.json().then((json) => {
      callback && callback(json);
    });
  }).catch((error) => {
    // console.log(error);
  });
}

//正则匹配地址携带的参数  接收url地址和要匹配的参数
export function GetQueryString(_URL, names) {
  let URL = _URL.split('?')[1];
  let queryResult = {};
  let reg = '';
  if (URL && names instanceof Array) {
    names.forEach(v => {
      reg = new RegExp('(^|&)' + v + '=([^&]*)(&|$)');
      let r = URL.match(reg);
      if (r != null) {
        queryResult[v] = r[2];
      }
    });
  } else {
    // console.log('I need URL(string with "?") and params that you want to match(array)');
  }
  return queryResult;
}


//过滤富文本
export function guolvfuwenben(content) {
  return content ? content.replace(/<\/?[^>]*>/gim, '').replace(/&nbsp;/, '').replace(/(^\s+)|(\s+$)/g, '').replace(/\s/g, '').replace(/[ ]|[&nbsp;]/g, '') : '';
}
//限定字符串长度
export function getchars(content, length) {
  return content.length > length ? content.slice(0, length) + '...' : content;
}
