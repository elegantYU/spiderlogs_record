const SERVER_HTTP = 'http://192.168.2.197:8100/'
const API = {
  // 爬虫进度
  progress: `${SERVER_HTTP}schedule?platform=`,
  // 启动
  start: `${SERVER_HTTP}start?platform=`,
  // 暂停
  stop: `${SERVER_HTTP}stop?platform=`,
  // 重启
  restart: `${SERVER_HTTP}restart?platform=`,
  // 表格初始化 查询当月
  init: `${SERVER_HTTP}result?platform=`,
  // 日期范围查询 platform:string & start_time:yyyy-MM-dd & end_time:yyyy-MM-dd
  scope: `${SERVER_HTTP}scope`,
  // 按年份查询 platform: string & year: string
  year: `${SERVER_HTTP}result/year`,
  // 所有api调用日志
  logs: `${SERVER_HTTP}seeLog`,
  // 爬虫状态
  status: `${SERVER_HTTP}spider/status?platform=`,
  // 查询删除年份
  canDelete: `${SERVER_HTTP}all_year?platform=`,
  // 删除所选年份 platform: string & the_year : array
  deleteLogs: `${SERVER_HTTP}clear`
}

export default API
