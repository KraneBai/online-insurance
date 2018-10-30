const common = {
  // axios请求地址的参数
  checkArgs (obj) {
    let str = '/uid/' + localStorage.getItem('uid')
    let argusArr = Object.entries(obj)
    for (let item of argusArr) {
      if (item[1] !== '' || item[1] === 0) {
        str += '/' + item[0] + '/' + item[1]
      }
    }
    return str
  },
  // 人员概览首页中的开始/结束日期的初始化判断, 默认开始比结束日期早6个月
  initDate () {
    let endmonth = new Date().getMonth() + 1
    let endyear = new Date().getFullYear()
    let startmonth = ''
    let startyear = ''
    if (endmonth - 5 >= 1) {
      startmonth = endmonth - 5
      startyear = endyear
    } else {
      startmonth = 12 - Math.abs(endmonth - 5)
      startyear = endyear - 1
    }
    return {
      endmonth,
      endyear,
      startmonth,
      startyear
    }
  }
}
export default common
