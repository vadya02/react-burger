// Установка куки
export function setCookie(name, value, props = {}) {
  props = {
    path: '/',
    ...props
  };
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    props.expires = d.toUTCString();
  }
  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (let propName in props) {
    updatedCookie += '; ' + propName;
    let propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Получение куки
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Удаление куки
export function deleteCookie(name) {
  setCookie(name, '', { 'max-age': -1 });
} 