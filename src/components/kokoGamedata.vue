<template>
  <div class="pagGamedata">
    <!-- 头部导航 -->
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        数据统计
        <span class="c-gray en">&gt;</span>
        每日数据
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px;margin-bottom:20px;"></div>

    <!-- 中间 -->
    <div class="panel panel-default" style="border:none;">
      <!-- <div class="panel-heading">结算明细</div> -->
      <div class="panel-body">
        <form method="post" style="text-align:left" class="form-inline">
          <label style="margin-left: 20px;">组长：</label>
          <select class="form-control sel">
            <option>全部</option>
            <option>sunshine</option>
            <option>koko</option>
            <option>ggg</option>
          </select>

          <label style="margin-left: 20px;">游戏名称:</label>
          <select class="form-control sel">
            <option>全部</option>
            <option>战火纪元</option>
            <option>英雄</option>
            <option>风之剑舞</option>
          </select>


          <label style="margin-left: 20px;">时间：</label>
          <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"> -
          <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end">

          <div class="export">
            <input type="checkbox" name="">
            <label for="">本账号推广</label>
          </div>

          <button type="submit" class="btn btn-success radius" id="" name="" style="font-size:13px;">查询
            <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
          </button>

          <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :agoDayHide='1514937600'
            class="cal"></Calendar>
          <Calendar v-on:choseDay="clickDay2" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :futureDayHide='15251040000'
            ref="Calendar" class="cal2"></Calendar>

        </form>
      </div>
    </div>

    <!-- 表格 -->
    <div class="addbox">
      <div class="add">
        <span class="l" style="color: red;">注意！！！这是隔天数据 ，查询当天数据 请到订单数据 中查询！</span>
        <span class="r">共有数据：
          <strong>21</strong> 条</span>
      </div>
      <div class="tablehead">
        <div>
          <label>显示
            <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="select">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> 条</label>
        </div>
        <div>
          <label style="display:flex;">从当前数据中检索:
            <input type="search" class="form-control inline" style="width:200px;">
          </label>
        </div>
      </div>
      <table class="layui-table">
        <colgroup>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>时间</th>
            <th>平台</th>
            <th>交易金额</th>
            <th>交易用户数</th>
            <th>交易笔数</th>
            <th>登录用户数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" :key="index">
            <td>{{item.time}}</td>
            <td>{{item.platform}}</td>
            <td>{{item.paycount}}</td>
            <td>{{item.usernum}}</td>
            <td>{{item.tradenum}}</td>
            <td>{{item.loginnum}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pag">
        <v-pagination :total="500" :page-size="30" @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
  import tabledemo from '../components/tabledemo.vue';
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'kokoGamedata',
    data() {
      return {
        msg: 'kokoAccountingdetail',
        pageIndex: 1,
        pageSize: 20,
        start: '',
        end: '',
        arr: [{
            "time": "2018-2-1",
            "platform": "ios",
            "paycount": "10000000",
            "usernum": "21652152",
            "tradenum": "2",
            "loginnum": "2"
          },
          {
            "time": "2018-2-2",
            "platform": "ios",
            "paycount": "10000000",
            "usernum": "21652152",
            "tradenum": "2",
            "loginnum": "2"
          },
          {
            "time": "2018-2-3",
            "platform": "ios",
            "paycount": "10000000",
            "usernum": "21652152",
            "tradenum": "2",
            "loginnum": "2"
          },
          {
            "time": "2018-2-4",
            "platform": "ios",
            "paycount": "10000000",
            "usernum": "21652152",
            "tradenum": "2",
            "loginnum": "2"
          },
          {
            "time": "2018-2-5",
            "platform": "ios",
            "paycount": "10000000",
            "usernum": "21652152",
            "tradenum": "2",
            "loginnum": "2"
          }
        ]

      }
    },
    methods: {
      starttime() {
        $('.cal').fadeIn(200);
        $('.cal2').fadeOut(200);
      },
      endtime() {
        $('.cal2').fadeIn(200);
        $('.cal').fadeOut(200);
      },
      clickDay(data) {
        console.log(data);
        this.start = data;
        $('.cal').fadeOut(200);
      },
      clickDay2(res) {
        console.log(res);
        this.end = res;
        $('.cal2').fadeOut(200);
      },
      changeDate(data) {
        console.log(data);
        //左右点击切换月份
      },
      clickToday(data) {
        console.log(data);
        //跳到了本月
      },
      // 获取当前页数
     pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        console.log(pageIndex)
      },
      pageSizeChange(pageSize) {
        // 每页显示的数目
        this.pageIndex = 1;
        this.pageSize = pageSize;
        console.log(pageSize);
      },
    },
    components: {
      Calendar,
      tabledemo
    }
  }

</script>
<style scoped>
  @import url('../scss/data.css');

</style>
