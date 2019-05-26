const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function parseJson(jsonObj) {
  // 循环所有键
  for (var key in jsonObj) {
    var element = jsonObj[key];
    console.log("key:",key +"  value:",element);
    // if (element.length > 0 && typeof (element) == "object" || typeof (element) == "object") {
    //   parseJson(element);
    // } else { //不是对象或数组、直接输出
    //   console.log("----eles -->  " + key + ":" + element + " ");
    // }

  }
}


module.exports = {
  formatTime: formatTime,
  parseJson: parseJson
}
