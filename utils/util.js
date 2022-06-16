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


module.exports = {
  formatTime,
  throttle
}
