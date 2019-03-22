import pathToRegexp from "path-to-regexp";


export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}
export const getLocalKey = (key, defaultValue) => {
  const item = window.localStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}
export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[key] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({...item}))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu(location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[i];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({...e, children: null});
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({...e, children: null});
        return current;
      }
    }
    return current;
  }
  return null;
}

// 换肤加class函数
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  element.className = className;
}

// export function removeTheme() {
//   let theme = document.getElementsByClassName('theme-style');
// }

export function addTheme(color) {
  let head = document.getElementsByTagName('HEAD').item(0);
  let style = document.createElement('style');
  let link = document.createElement('link');
  let theme = head.getElementsByClassName('theme-style') ? head.getElementsByClassName('theme-style') : '';

  for (let item of theme) head.removeChild(item);
  link.href = `/static/theme/${color}/index.css`;
  style.className = 'theme-style';
  link.rel = 'stylesheet';
  style.type = 'text/css';
  style.append(link);
  head.appendChild(style);

}

//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (unescape(arr[2]));
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//用户权限
export function permission(access) {
  return access.includes(getCookie('permission'));
}

