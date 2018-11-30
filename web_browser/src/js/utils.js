export const browser = {
  versions: (function () {
    let u = navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === " qq" // 是否QQ
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

export const getClientHeight = () => {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

export const getClientWidth = () => {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export const isNumber = (num) => {
  return !Number.isNaN(parseFloat(num)) && Number.isFinite(parseFloat(num));
}

export const isEmptyObject = (obj) => {
  for (let name in obj) {
    return false;
  }
  return true;
}

export const scientificToDecimal = (num) => {
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    var zero = '0';
    var parts = String(num).toLowerCase().split('e'); // split into coeff and exponent
    var e = parts.pop(); // store the exponential part
    var l = Math.abs(e); // get the number of zeros
    var sign = e / l;
    var coeffArray = parts[0].split('.');
    if (sign === -1) {
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('');
    } else {
      var dec = coeffArray[1];
      if (dec) l = l - dec.length;
      num = coeffArray.join('') + new Array(l + 1).join(zero);
    }
  }

  return num;
};

export const formatNumber = (num, decimal, thousands = false) => {
  if (!isNumber(num)) {
    return '--';
  }
  num = parseFloat(num);
  if (isNumber(decimal)) {
    num = num.toFixed(decimal);
    if (decimal > 2) {
      num = parseFloat(num);
    }
  }
  num = scientificToDecimal(num);
  if (thousands) {
    num = toThousands(num.toString());
  }
  return num;
}

export const toThousands = (n) => {
  let num = n;
  if (!isNumber(num)) {
    return n;
  }
  let result = '';
  let split = num.split('.')
  let fraction = split.length > 1 ? split[1] : ''
  num = split[0]
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  if (fraction.length > 0) {
    result = result + '.' + fraction
  }
  return result
}
