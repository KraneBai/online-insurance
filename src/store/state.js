import common from '../util/common.js'

let wxnickname = '' // 微信昵称
let wximage = '' // 微信头像
let area = '' // 用来给筛选filter赋值地区的id
let areaname = '' // 存放人员分析首页地区的名字, 对应地区id
let companytype = 0 // 行业0 寿险类型1 财险类型2 中介类型3

// 存放人员分析的开始结束年月
let {startyear, startmonth, endyear, endmonth} = common.initDate()

export default {
  area,
  areaname,
  companytype,
  startmonth,
  startyear,
  endmonth,
  endyear,
  wxnickname,
  wximage
}
