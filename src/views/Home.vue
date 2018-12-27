<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2" :offset="2">
          <div class="logo"></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- tabs -->
      <el-tabs
        v-model="activeName"
        tab-position="left"
        type="border-card"
        :before-leave="tabsBeforeLeave"
        @tab-click="clickTab"
      >
        <el-tab-pane
          v-for="(item) in allTabs"
          :key="item.name"
          :name="item.name"
        >
          <span slot="label" class="tabItemLabel">
            <el-badge :is-dot='item.new'>
              <i class="tabslogo"></i>
              {{ item.title }}
              <i :class="[item.flag===0 ? 'icon-play_fill' : 'icon-suspend', 'iconfont']"></i>
            </el-badge>
          </span>
          <div class="tabItemPane">
            <div class="tableActionBar">
              <el-row>
                <el-col :span="12">
                  <div class="actionLeft">
                    <div class="leftHeader">
                      <span>
                        <i class="el-icon-document"></i>爬虫日志
                      </span>
                    </div>
                    <div class="leftBtns">
                      <el-menu
                        mode="horizontal"
                        background-color="#f9f9f9"
                      >
                        <el-submenu index="1" :show-timeout="hoverTime" :hide-timeout="hoverTime">
                          <template slot="title"><i class="el-icon-date"></i>日期</template>
                          <el-menu-item index="1-1" @click="curMonth">本月</el-menu-item>
                          <el-menu-item index="1-2" @click="dialogDateScope = true">自定义区间</el-menu-item>
                          <el-menu-item index="1-3" @click="dialogYear = true">选择某年</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2" @click="sortRange" :name="item.name">
                          <i class="el-icon-sort"></i>等级排序
                        </el-menu-item>
                        <el-popover
                          placement="right"
                          width="auto"
                          trigger="hover"
                          title="日志等级共有5级，从低向高排列"
                          class="rangePopover"
                        >
                          <pre>
调试-调试信息，最普通的信息
信息-正常运行中产生的记录
警报-运行中产生的一些预料之中的错误
错误-运行过程中产生的预料之外的错误，程序仍能运行
危险-产生的紧急错误，程序无法运行
                          </pre>
                          <el-button slot="reference" circle size="mini">?</el-button>
                        </el-popover>
                      </el-menu>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="actionRight">
                    <ul class="actionGroup">
                      <li class="out_border">
                        <div class="button_wrapper">
                          <div class="in_border">
                            <el-popover
                              placement="top"
                              width="200"
                              trigger="hover"
                              title="初始化"
                              content="各平台爬虫一周只能初始化一次"
                            >
                              <el-button @click="spiderStart" slot="reference">初始化</el-button>
                            </el-popover>
                          </div>
                        </div>
                      </li>
                      <li class="out_border">
                        <div class="button_wrapper">
                          <div class="in_border">
                            <el-popover
                              placement="top"
                              width="200"
                              trigger="hover"
                              title="启动"
                              content="初始化后暂停或断网等意外情况，可以选择启动"
                            >
                              <el-button @click="spiderRestart" slot="reference">启动</el-button>
                            </el-popover>
                          </div>
                        </div>
                      </li>
                      <li class="out_border">
                        <div class="button_wrapper">
                          <div class="in_border">
                            <el-popover
                              placement="top"
                              width="200"
                              trigger="hover"
                              title="暂停"
                              content="暂停当前爬虫"
                            >
                              <el-button @click="spiderPause" slot="reference">暂停</el-button>
                            </el-popover>
                          </div>
                        </div>
                      </li>
                      <li class="out_border">
                        <div class="button_wrapper">
                          <div class="in_border">
                            <el-popover
                              placement="top"
                              width="200"
                              trigger="hover"
                              title="删除"
                              content="删除该平台的爬虫日志"
                            >
                              <el-button @click="deleteLogsDialog" slot="reference">删除</el-button>
                            </el-popover>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- table -->
            <div class="tableContent">
              <el-table
                ref="logTable"
                :name="item.name"
                :data="item.tableDate"
                tooltip-effect="dark"
                border
                height="540"
                :default-sort="defulatSort"
              >
                <TableColumn
                  prop="range"
                  label="等级"
                  width="100"
                  align="center"
                  :filters="rangeStatus"
                  :filter-method="filterRange"
                >
                  <template slot-scope="scope">
                    <div class="rangeTag">
                      <el-tag size="medium" disable-transitions :type="
                         scope.row.range==='DEBUG'
                         ? 'info' : scope.row.range==='INFO'
                         ? 'success' : scope.row.range==='ERROR'
                         ? 'primary' : scope.row.range==='WARNING'
                         ? 'warning' : scope.row.range==='CRITICAL'
                         ? 'danger' : ''
                        ">
                        {{
                          scope.row.range==='DEBUG'
                         ? '调试' : scope.row.range==='INFO'
                         ? '信息' : scope.row.range==='ERROR'
                         ? '错误' : scope.row.range==='WARNING'
                         ? '警告' : scope.row.range==='CRITICAL'
                         ? '危险' : ''
                        }}
                      </el-tag>
                    </div>
                  </template>
                </TableColumn>
                <TableColumn
                  label="内容"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="tdContent">
                      {{ scope.row.content }}
                    </div>
                  </template>
                </TableColumn>
                <TableColumn
                  prop="date"
                  label="时间"
                  width="200"
                  sortable
                >
                </TableColumn>
                <TableColumn
                  prop="hid"
                  label="隐藏id"
                  v-if="hidOpen"
                >
                </TableColumn>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <!-- dialog -->
    <el-dialog
      title="自定义日期范围"
      :visible.sync="dialogDateScope"
      width="500px"
      :before-close="closeDateScopeDialog"
    >
      <el-form :model="dateScopeForm">
        <el-form-item label="日期区间">
          <el-date-picker
            v-model="dateScopeForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDateScopeDialog">取消</el-button>
        <el-button type="primary" @click="submitDateScope">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择年份"
      :visible.sync="dialogYear"
      width="500px"
      :before-close="closeYearDialog"
    >
      <el-form :model="yearForm">
        <el-form-item label="年份选择">
          <el-date-picker
            v-model="yearForm.year"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeYearDialog">取消</el-button>
        <el-button type="primary" @click="submitYear">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除日志"
      :visible.sync="dialogDelete"
      width="500px"
      :before-close="closeDeleteDialog"
    >
      <el-form>
        <el-form-item label="可选年份">
          <el-checkbox-group v-model="yearCheck" size="mini">
            <el-checkbox v-for="(item, index) in yearGroup" :key="index" :label="item.label" border></el-checkbox>
          </el-checkbox-group>
          <span v-if="logsNone">当前暂无日志可选</span>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeDeleteDialog">取消</el-button>
        <el-button type="primary" @click="deleteLogs">确定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { TableColumn } from 'element-ui'
import API from '@/api.js'

export default {
  name: 'home',
  components: {
    TableColumn
  },
  data () {
    return {
      activeName: 'jd',
      defulatSort: {
        prop: 'date',
        order: 'descending'
      },
      allTabs: [
        {
          title: '京东',
          name: 'jd',
          flag: 0,
          clickCount: 0,
          tableDate: []
        },
        {
          title: '网易',
          name: 'wangyi',
          flag: 0,
          clickCount: 0,
          tableDate: []
        },
        {
          title: '苏宁',
          name: 'suning',
          flag: 0,
          clickCount: 0,
          tableDate: []
        },
        {
          title: '亚马逊',
          name: 'amazon',
          flag: 0,
          clickCount: 0,
          tableDate: []
        },
        {
          title: '速卖通',
          name: 'aliExpress',
          flag: 0,
          clickCount: 0,
          tableDate: []
        },
        {
          title: 'iherb',
          name: 'iherb',
          flag: 0,
          clickCount: 0,
          tableDate: []
        }
      ],
      rangeStatus: [
        { text: '调试', value: 'DEBUG' },
        { text: '信息', value: 'INFO' },
        { text: '错误', value: 'ERROR' },
        { text: '警告', value: 'WARNING' },
        { text: '危险', value: 'CRITICAL' }
      ],
      hoverTime: 0,
      dialogDateScope: false,
      dateScopeForm: {
        date: ''
      },
      dialogYear: false,
      yearForm: {
        year: ''
      },
      dialogDelete: false,
      yearGroup: [],
      yearCheck: [],
      logsNone: false,
      rangeSortFlag: false,
      hidOpen: false
    }
  },
  methods: {
    clickTab (tab, event) {
      // console.log(tab, event)
    },
    // 切换平台
    tabsBeforeLeave (curName, oldName) {
      // 当前平台的初始化
      this.rangeSortFlag = false
      this.$refs.logTable.map(v => {
        if (v.$attrs.name === curName) {
          v.sort(this.defulatSort.prop, this.defulatSort.order)
        }
      })
      this.clearTableFilter()
      // 相应api
      this.spiderStatus(curName)
      this.initTable(curName)
      this.apiLogs()
    },
    // table等级筛选
    filterRange (value, row) {
      return row.range === value
    },
    clearDefaultSort (n) {
      this.$refs.logTable.map(v => v.clearSort())
    },
    clearTableFilter () {
      this.$refs.logTable.map(v => v.clearFilter())
    },
    // menu options
    curMonth () {
      this.initTable(this.activeName)
    },
    // 日期范围 dialog
    closeDateScopeDialog () {
      this.dateScopeForm.date = ''
      this.dialogDateScope = false
    },
    submitDateScope () {
      this.searchDateScope(this.dateScopeForm.date)
      this.closeDateScopeDialog()
    },
    // 某年数据 dialog
    closeYearDialog () {
      this.yearForm.year = ''
      this.dialogYear = false
    },
    submitYear () {
      this.searchYearLog(this.yearForm.year)
      this.closeYearDialog()
    },
    // 等级排序
    sortRange (e) {
      this.clearDefaultSort()
      const name = e.$attrs.name
      this.rangeSortFlag = !this.rangeSortFlag
      if (this.rangeSortFlag) {
        this.allTabs.map(v => {
          if (v.name === name) {
            v.tableDate.sort((a, b) => {
              return b.hid - a.hid
            })
          }
        })
      } else {
        this.allTabs.map(v => {
          if (v.name === name) {
            v.tableDate.sort((a, b) => {
              return a.hid - b.hid
            })
          }
        })
      }
    },
    // 删除日志
    deleteLogsDialog () {
      this.dialogDelete = true
      this.searchLogsYear()
    },
    closeDeleteDialog () {
      this.dialogDelete = false
      this.yearGroup = []
      this.yearCheck = []
    },
    deleteLogs () {
      this.submitDelete()
      this.closeDeleteDialog()
      this.initTable(this.activeName)
    },
    // api请求
    // 各平台爬虫进度
    spiderProgress (p) {
      this.$http.get(`${API.progress}${p}`)
        .then(res => {
          switch (res.data.data) {
            case '1.00':
              this.allTabs.forEach(v => {
                if (v.name === this.activeName) {
                  v.flag = 0
                }
              })
              this.$message.success({
                message: `当前平台已爬取完毕`,
                center: true
              })
              break
            default:
              this.$message.success({
                message: `当前平台已爬取${res.data.data * 100}%`,
                center: true
              })
              this.allTabs.forEach(v => {
                if (v.name === this.activeName) {
                  v.flag = 1
                }
              })
              break
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 爬虫当前状态
    spiderStatus (p) {
      const platform = p || 'jd'
      this.$http.get(`${API.status}${platform}`)
        .then(res => {
          switch (res.data.code) {
            case '202':
              this.spiderProgress(platform)
              break
            case '204':
              this.$message.info({
                message: '当前爬虫未运行',
                center: true
              })
              break
            case '205':
              this.$message.success({
                message: '爬虫爬取完毕',
                center: true
              })
              break
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // log上报
    apiLogs () {
      this.$http.get(API.logs)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(`apilogs Error:${err}`)
        })
    },
    // 平台数据
    initTable (platform) {
      let p = platform || 'jd'
      this.$http.get(`${API.init}${p}`)
        .then(res => {
          this.allTabs.forEach(v => {
            if (v.name === p) {
              v.tableDate = res.data.data
            }
          })
        })
        .catch(() => {
          this.$message.warning({
            message: '当前平台暂无日志文件',
            center: true
          })
        })
    },
    // 初始化平台爬虫
    spiderStart (p) {
      let platform = p.constructor === String ? p : this.activeName
      let count = 0
      this.allTabs.forEach(v => {
        if (v.name === platform) {
          count = v.clickCount
        }
      })
      if (!count) {
        this.allTabs.forEach(v => {
          if (v.name === platform) {
            v.clickCount = 1
          }
        })
        this.$http.get(`${API.start}${platform}`)
          .then(res => {
            switch (res.data.code) {
              case '200':
                this.$message.success({
                  message: '爬虫启动成功!',
                  center: true
                })
                this.allTabs.forEach(v => {
                  if (v.name === platform) {
                    v.flag = 1
                  }
                })
                this.clearCount(platform)
                break
              case '201':
                this.$message.warning({
                  message: '本周已初始化,请点击启动',
                  center: true
                })
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.clearCount(platform)
      }
    },
    // 暂停平台爬虫
    spiderPause (p) {
      let platform = p.constructor === String ? p : this.activeName
      this.$http.get(`${API.stop}${platform}`)
        .then(res => {
          switch (res.data.code) {
            case '200':
              this.$message.success({
                message: '爬虫已暂停',
                center: true
              })
              this.allTabs.forEach(v => {
                if (v.name === platform) {
                  v.flag = 0
                }
              })
              break
            case '201':
              this.$message.info({
                message: '爬虫尚未运行',
                center: true
              })
              break
            case '203':
              this.$message.info({
                message: '爬虫尚未初始化',
                center: true
              })
              break
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 启动爬虫
    spiderRestart (p) {
      let platform = p.constructor === String ? p : this.activeName
      let count = 0
      this.allTabs.forEach(v => {
        if (v.name === platform) {
          count = v.clickCount
        }
      })
      if (!count) {
        this.allTabs.forEach(v => {
          if (v.name === platform) {
            v.clickCount = 1
          }
        })
        this.$http.get(`${API.restart}${platform}`)
          .then(res => {
            switch (res.data.code) {
              case '200':
                this.$message.success({
                  message: '爬虫重启成功',
                  center: true
                })
                this.allTabs.forEach(v => {
                  if (v.name === platform) {
                    v.flag = 1
                  }
                })
                setTimeout(() => {
                  this.spiderProgress(platform)
                }, 500)
                this.clearCount(platform)
                break
              case '201':
                this.$message.info({
                  message: '爬虫尚未运行',
                  center: true
                })
                break
              case '202':
                this.$message.warning({
                  message: '爬虫正在运行',
                  center: true
                })
                break
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.clearCount(platform)
      }
    },
    // 日期筛选
    searchDateScope (d) {
      this.$http.get(API.scope, {
        params: {
          platform: this.activeName,
          start_time: d[0],
          end_time: d[1]
        }
      })
        .then(res => {
          this.allTabs.forEach(v => {
            if (v.name === this.activeName) {
              v.tableDate = res.data.data
            }
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.warning({
            message: '请检查当前网络环境',
            center: true
          })
        })
    },
    // 年份查询
    searchYearLog (d) {
      this.$http.get(API.year, {
        params: {
          platform: this.activeName,
          year: d
        }
      })
        .then(res => {
          this.allTabs.forEach(v => {
            if (v.name === this.activeName) {
              v.tableDate = res.data.data
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    //  可删除年份
    searchLogsYear () {
      this.$http.get(`${API.canDelete}${this.activeName}`)
        .then(res => {
          res.data.data.map(v => {
            return this.yearGroup.push({ label: v })
          })
          res.data.data.length === 0 ? this.logsNone = true : this.logsNone = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交删除
    submitDelete () {
      this.$http.get(API.deleteLogs, {
        params: {
          platform: this.activeName,
          the_year: JSON.stringify(this.yearCheck)
        }
      })
        .then(res => {
          if (res.data.code === '200') {
            this.$message.success({
              message: '删除成功！',
              center: true
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearCount (p) {
      setTimeout(() => {
        this.allTabs.forEach(v => {
          if (v.name === p) {
            v.clickCount = 0
          }
        })
      }, 3000)
    }
  },
  mounted () {
    this.initTable()
    this.spiderStatus()
  }
}
</script>

<style lang="scss" scoped>
.el-container{
  .el-header{
    height: 120px !important;
    .el-row{
      height: 120px;
      .el-col-2{
        height: 100%;
        line-height: 120px;
        .logo{
          width: 100%;
          height: 100%;
          background: url('../assets/ecmohologo.png') no-repeat center center;
        }
      }
    }
  }
  .el-main{
    padding: 10px 150px;
    .el-tabs{
      height: 750px;
      background: #f9f9f9;
      .el-tabs__header{
        .el-tabs__nav{
          .el-tabs__item{
            .tabItemLabel{
              display: inline-block;
              width: 100%;
              height: 80px;
              line-height: 80px;
              font-size: 20px;
              .el-badge{
                display: block;
                text-align: left;
                .tabslogo{
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  vertical-align: -4px;
                }
              }
            }
          }
          #tab-jd{
            .tabslogo{
              background: url('../assets/jd.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
          #tab-wangyi{
            .tabslogo{
              background: url('../assets/wy.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
          #tab-suning{
            .tabslogo{
              background: url('../assets/sn.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
          #tab-amazon{
            .tabslogo{
              background: url('../assets/amaz.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
          #tab-aliExpress{
            .tabslogo{
              background: url('../assets/ali.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
          #tab-iherb{
            .tabslogo{
              background: url('../assets/iherb.jpg') no-repeat center center;
              background-size: 100% 100%;
            }
          }
        }
      }
      .el-tabs__content{
        padding: 0;
        .tabItemPane{
          width: 100%;
          height: 700px;
          .tableActionBar{
            height: 100px;
            margin-bottom: 20px;
            .el-row{
              height: 100%;
              .el-col-12{
                height: 100%;
                .actionLeft{
                  .leftHeader{
                    text-align: left;
                    font-size: 20px;
                    line-height: 60px;
                    color: #aaa;
                  }
                  .leftBtns{
                    .el-menu{
                      width: 300px;
                      float: left;
                    }
                    .rangePopover{
                      float: left;
                      margin-top: 22px;
                      .el-button{
                        width: 16px;
                        height: 16px;
                        padding: 0;
                        border-color: #409eff;
                        color: #409eff;
                      }
                    }
                  }
                }
                .actionRight{
                  height: 100%;
                  .actionGroup{
                    width: 405px;
                    height: 86px;
                    float: right;
                    .out_border{
                      float: left;
                      width: 86px;
                      height: 86px;
                      position: relative;
                      border-radius: 50%;
                      background: linear-gradient(to bottom, #e8e8e8 0%, #f2f2f2 100%);
                      margin-right: 15px;
                      .button_wrapper{
                        position: absolute;
                        width: 84px;
                        height: 84px;
                        top: 1px;
                        left: 1px;
                        border-radius: 50%;
                        background: linear-gradient(to bottom, #f2f2f2 0%, #fcfcfc 100%);
                        .in_border{
                          position: absolute;
                          width: 68px;
                          height: 68px;
                          cursor: pointer;
                          top: 8px;
                          left: 8px;
                          background: #e7e7e7;
                          border-radius: 50%;
                          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
                          &:active{
                            box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
                          }
                          .el-button{
                            position: absolute;
                            display: block;
                            width: 66px;
                            height: 66px;
                            top: 1px;
                            left: 1px;
                            background: linear-gradient(to bottom, #fafafa 0%, #eaeaea 100%);
                            box-shadow: inset 0 1px 0 #fff;
                            border-radius: 50%;
                            padding-left: 0;
                            padding-right: 0;
                            text-align: center;
                            font-weight: bold;
                            color: #444;
                            border: none;
                            &:hover{
                              color: #409eff;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .tableContent{
            .el-table{
              .tdContent{
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
}
</style>
