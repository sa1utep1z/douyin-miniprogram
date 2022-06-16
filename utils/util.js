const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const  throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }
 
  let _lastTime = null
 
  // 返回新的函数
  return function (e) {
    console.log(this)
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // fn.apply(this, arguments)   //将this和参数传给原函数
      fn(this,e)    //上方法不可行的解决办法 改变this和e
      _lastTime = _nowTime
    }
  }
}

const idCardNoCheck = (idNo) => {
  if (!idNo) {
    return false
  }
  const pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return pattern.test(idNo)
}


module.exports = {
  formatTime,
  throttle,
  idCardNoCheck,
}
