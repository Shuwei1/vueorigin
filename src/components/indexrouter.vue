<template>
  <div class="pageindex">
    <div class="container">
      <div class="platform">
        <div class="panel panel-danger">
          <div class="panel-heading">
            <span class="panel-title">玩家总数</span>
            <span class="panel-title">22</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-6 col-xs-6 col-sm-6 col-lg-6 clearfix">
                <small>今日新增</small>
                <h4>{{this.arrlist.todayreg}}</h4>
              </div>
              <div class="col-md-6 col-xs-6 col-sm-6 col-lg-6 clearfix">
                <small>今日活跃</small>
                <h4>{{this.arrlist.todayactive}}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">
            <span class="panel-title">流水汇总</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-6 col-xs-6 col-sm-6 col-lg-6 clearfix">
                <small>今日流水</small>
                <h4>{{this.arrlist.todaypay}}</h4>
              </div>
              <div class="col-md-6 col-xs-6 col-sm-6 col-lg-6 clearfix">
                <small>昨日流水</small>
                <h4>{{this.arrlist.yesterdaypay}}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-warning">
          <div class="panel-heading">
            <span class="panel-title">平台币概况</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 col-xs-4 col-sm-46 col-lg-4 clearfix">
                <small>平台币总额</small>
                <h4>{{this.arrlist.ptbsum}}</h4>
              </div>
              <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 clearfix">
                <small>玩家平台币余额</small>
                <h4>{{this.arrlist.ptbmem}}</h4>
              </div>
              <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 clearfix">
                <small>推广平台币余额</small>
                <h4>{{this.arrlist.ptbagent}}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-success">
          <div class="panel-heading">
            <span class="panel-title">渠道概况</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 col-xs-4 col-sm-46 col-lg-4 clearfix">
                <small>渠道总数</small>
                <h4>{{this.arrlist.usersum}}</h4>
              </div>
              <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 clearfix">
                <small>今日扶持金额</small>
                <h4>{{this.arrlist.todaysupport}}</h4>
              </div>
              <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 clearfix">
                <small>昨日扶持金额</small>
                <h4>{{this.arrlist.yesterdaysupport}}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="linechart">
        <div class="row">
          <div id="myChart" :style="{height: '300px'}" class="col-md-6 col-lg-6"></div>
          <div id="myChart1" :style="{height: '300px'}" class="col-md-6 col-lg-6"></div>
        </div>
        <div class="row">
          <div id="myChart2" :style="{ height: '300px'}" class="col-md-6"></div>
          <div id="myChart3" :style="{ height: '300px'}" class="col-md-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // 引入基本模板
  import Vue from 'vue';
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'indexrouter',
    data() {
      return {
        msg: 'indexrouter',
        indexurl: domain.testUrl + '/index.php/Index/index/index',
        num: '',
        arrlist: [],
        paylist: [],
        userreglist: [],
        userpaylist: [],
        userloginlist: [],
        dateList: [],
        valueList: [],
        dateList1: [],
        valueList1: [],
        dateList2: [],
        valueList2: [],
        dateList3: [],
        valueList3: [],
      }
    },
    created() {
      let vm = this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token')
      }
      this.$http.post(this.indexurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(res => {
        var data = res.data.data;
        vm.arrlist = data;
        console.log(vm.arrlist);
        // 流水曲线图数据表
        vm.paylist = res.data.data.paylist;
        //用户新增折线图数据
        vm.userreglist = vm.arrlist.userreglist;
        //付费玩家折线图数据
        vm.userpaylist = vm.arrlist.userpaylist;
        //活跃玩家折线图数据
        vm.userloginlist = vm.arrlist.userloginlist;
        // console.log(vm.paylist)
        //流水曲线图数据表
        var dateList = JSON.parse(vm.paylist).map(function (item) {
          return item[0];
        });
        var valueList = JSON.parse(vm.paylist).map(function (item) {
          return item[1];
        });
        vm.dateList = dateList;
        vm.valueList = valueList;
        console.log(vm.userreglist);
    
      }, res => {
        console.log('error');
      })
    },


    methods: {
      drawLine() {
        let vm = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'), 'light');
        let myChart1 = echarts.init(document.getElementById('myChart1'), 'light');
        let myChart2 = echarts.init(document.getElementById('myChart2'), 'light');
        let myChart3 = echarts.init(document.getElementById('myChart3'), 'light');
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#6F6F6F', //背景色
          title: {
            text: '流水折线图',
            textStyle: { //设置主标题风格
              color: 'white', //设置主标题字体颜色
              fontStyle: '', //主标题文字风格
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {

              restore: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList,
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元',
              textStyle: {
                color: 'white'
              }
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              lte: 6,
              color: 'green'
            }, {
              gt: 6,
              lte: 8,
              color: 'red'
            }, {
              gt: 8,
              lte: 14,
              color: 'green'
            }, {
              gt: 14,
              lte: 17,
              color: 'red'
            }, {
              gt: 17,
              color: 'green'
            }]
          },
          series: [{
            name: '用电量',
            type: 'line',
            smooth: true,
            data: vm.valueList,
            markArea: {
              data: [
                [{
                  name: '早高峰',
                  xAxis: '07:30'
                }, {
                  xAxis: '10:00'
                }],
                [{
                  name: '晚高峰',
                  xAxis: '17:30'
                }, {
                  xAxis: '21:15'
                }]
              ]
            }
          }]
        });

        myChart1.setOption({
          backgroundColor: '#6F6F6F',
          title: {
            text: '用户新增折线图',
            textStyle: {
              color: 'white',
              fontStyle: '',
            },

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {

              restore: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList1,
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W',
              textStyle: {
                color: 'white'
              }
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              lte: 6,
              color: 'green'
            }, {
              gt: 6,
              lte: 8,
              color: 'red'
            }, {
              gt: 8,
              lte: 14,
              color: 'green'
            }, {
              gt: 14,
              lte: 17,
              color: 'red'
            }, {
              gt: 17,
              color: 'green'
            }]
          },
          series: [{
            name: '用电量',
            type: 'line',
            smooth: true,
            data: vm.valueList1,
            markArea: {
              data: [
                [{
                  name: '早高峰',
                  xAxis: '07:30'
                }, {
                  xAxis: '10:00'
                }],
                [{
                  name: '晚高峰',
                  xAxis: '17:30'
                }, {
                  xAxis: '21:15'
                }]
              ]
            }
          }]
        });

        myChart2.setOption({
          backgroundColor: '#6F6F6F',

          title: {
            text: '付费玩家折线图',
            textStyle: {
              color: 'white',
              fontStyle: '',
            },

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {

              restore: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList2,
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W',
              textStyle: {
                color: 'white'
              }
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              lte: 6,
              color: 'green'
            }, {
              gt: 6,
              lte: 8,
              color: 'red'
            }, {
              gt: 8,
              lte: 14,
              color: 'green'
            }, {
              gt: 14,
              lte: 17,
              color: 'red'
            }, {
              gt: 17,
              color: 'green'
            }]
          },
          series: [{
            name: '用电量',
            type: 'line',
            smooth: true,
            data: vm.valueList2,
            markArea: {
              data: [
                [{
                  name: '早高峰',
                  xAxis: '07:30'
                }, {
                  xAxis: '10:00'
                }],
                [{
                  name: '晚高峰',
                  xAxis: '17:30'
                }, {
                  xAxis: '21:15'
                }]
              ]
            }
          }]
        });
        myChart3.setOption({
          backgroundColor: '#6F6F6F',
          title: {
            text: '玩家活跃折线图',
            textStyle: {
              color: 'white',
              fontStyle: '',
            },

          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {

              restore: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dateList3,
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W',
              textStyle: {
                color: 'white'
              }
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              lte: 6,
              color: 'green'
            }, {
              gt: 6,
              lte: 8,
              color: 'red'
            }, {
              gt: 8,
              lte: 14,
              color: 'green'
            }, {
              gt: 14,
              lte: 17,
              color: 'red'
            }, {
              gt: 17,
              color: 'green'
            }]
          },
          series: [{
            name: '用电量',
            type: 'line',
            smooth: true,
            data: vm.valueList3,
            markArea: {
              data: [
                [{
                  name: '早高峰',
                  xAxis: '07:30'
                }, {
                  xAxis: '10:00'
                }],
                [{
                  name: '晚高峰',
                  xAxis: '17:30'
                }, {
                  xAxis: '21:15'
                }]
              ]
            }
          }]
        });
      }
    },
    mounted() {
      let vm = this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token')
      }
      this.$http.post(this.indexurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(res => {
        // console.log(res.data.data.paylist);
        var data = res.data.data;
        vm.arrlist = data;
        // 流水曲线图数据表
        vm.paylist = res.data.data.paylist;
        //用户新增折线图数据
        vm.userreglist = vm.arrlist.userreglist;
        //付费玩家折线图数据
        vm.userpaylist = vm.arrlist.userpaylist;
        //活跃玩家折线图数据
        vm.userloginlist = vm.arrlist.userloginlist;

        var dateList = JSON.parse(vm.paylist).map(function (item) {
          return item[0].slice(6, 10);
          // console.log(JSON.stringify(item[0]));
          //  return a.replace(new RegExp(b,'gm'),'');
        });
        var valueList = JSON.parse(vm.paylist).map(function (item) {
          return item[1];
        });
        var dateList1 = JSON.parse(vm.paylist).map(function (item) {
          return item[0].slice(6, 10);

        });
        var valueList1 = JSON.parse(vm.paylist).map(function (item) {
          // console.log(item[1]);
          return item[1];
        });
        var dateList2 = JSON.parse(vm.paylist).map(function (item) {
          // console.log(item[0]);
          return item[0].slice(6, 10);

        });
        var valueList2 = JSON.parse(vm.paylist).map(function (item) {
          // console.log(item[1]);
          return item[1];
        });
        var dateList3 = JSON.parse(vm.paylist).map(function (item) {
          return item[0].slice(6, 10);

        });
        var valueList3 = JSON.parse(vm.paylist).map(function (item) {
          // console.log(item[1]);
          return item[1];
        });
        vm.dateList = dateList;
        vm.valueList = valueList;
        vm.dateList1 = dateList1;
        vm.valueList1 = valueList1;
        vm.dateList2 = dateList2;
        vm.valueList2 = valueList2;
        vm.dateList3 = dateList3;
        vm.valueList3 = valueList3;
        this.drawLine();
      }, res => {
        console.log('error');
      })
    }
  }

</script>
<style scoped>
  @import url('../iconfont/iconfont.css');
  @import url('../scss/index.css');
  @import url('../scss/common.css');

</style>
