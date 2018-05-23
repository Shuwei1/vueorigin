<template>
  <div class="kokoPlayerlist">
    <!-- 头部导航 -->
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        数据统计
        <span class="c-gray en">&gt;</span>
        玩家列表
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px;"></div>

    <!-- 中间 -->
    <div class="panel panel-default" style="border:none;">
      <!-- <div class="panel-heading">结算明细</div> -->
      <div class="panel-body">
        <form method="post" style="text-align:left" class="form-inline">
          <div class="mr">
            <label style="margin-left: 20px;">组长：</label>
            <select class="form-control sel">
              <option>全部</option>
              <option>sunshine</option>
              <option>koko</option>
              <option>ggg</option>
            </select>
            <label style="margin-left: 20px;">玩家账号:</label>
            <input type="text" placeholder="请输入玩家账号" class="form-control sel">
            <label style="margin-left: 20px;">游戏名称：</label>
            <select class="form-control sel">
              <option>--请选择--</option>
              <option>口袋妖怪联盟</option>
              <option>决战传奇-ios</option>
              <option>烈焰霸刀-ios</option>
            </select>
            <label style="margin-left: 20px;">时间：</label>
            <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"
              placeholder="开始时间"> -
            <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end"
              placeholder="结束时间">
            <button type="button" class="btn btn-success radius" id="" name="" style="font-size:13px;">查询
              <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
            </button>
            <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :agoDayHide='1514937600'
              class="cal"></Calendar>
            <Calendar v-on:choseDay="clickDay2" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :futureDayHide='15251040000'
              ref="Calendar" class="cal2"></Calendar>
          </div>
        </form>
      </div>
    </div>

    <!-- 表格 -->
    <div class="addbox">
      <table class="layui-table">
        <colgroup>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>玩家账号</th>
            <th>订单数量</th>
            <th>登陆次数</th>
            <th>游戏数量</th>
            <th>平台</th>
            <th>充值金额</th>
            <th>充值次数</th>
            <th>最近充值时间</th>
            <th>最后登录时间</th>
            <th>注册时间</th>
            <th>渠道账号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" :key="index">
            <td>{{item.playaccount}}</td>
            <td>{{item.ordernum}}</td>
            <td>{{item.loginnum}}</td>
            <td>{{item.gamenum}}</td>
            <td>{{item.platform}}</td>
            <td>{{item.rechargeamount}}</td>
            <td>{{item.rechargenum}}</td>
            <td>{{item.rechargetime}}</td>
            <td>{{item.logintime}}</td>
            <td>{{item.registratetime}}</td>
            <td>{{item.channelaccount}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pag">
      <v-pagination :total="arr.length" :page-size="pageSize"  @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import tabledemo from '../components/tabledemo.vue';
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'kokoPlayerlist',
    data() {
      return {
        msg: '',
        pageIndex: 2,
        pageSize: 10,
        start: '',
        end: '',
        arr: [{
            "playaccount": "1235605660",
            "ordernum": "100000",
            "loginnum": "0",
            "gamenum": "20",
            "platform": "安卓",
            "rechargeamount": "1000.00",
            "rechargenum": "0",
            "rechargetime": "2018-03-28 13:43:34",
            "logintime": "2018-03-25 13:43:34",
            "registratetime": "2018-03-22 13:43:34",
            "channelaccount": "1235605660"
          },
          {
            "playaccount": "1235605660",
            "ordernum": "100000",
            "loginnum": "0",
            "gamenum": "20",
            "platform": "安卓",
            "rechargeamount": "1000.00",
            "rechargenum": "0",
            "rechargetime": "2018-03-28 13:43:34",
            "logintime": "2018-03-25 13:43:34",
            "registratetime": "2018-03-22 13:43:34",
            "channelaccount": "1235605660"
          },
          {
            "playaccount": "1235605660",
            "ordernum": "100000",
            "loginnum": "0",
            "gamenum": "20",
            "platform": "安卓",
            "rechargeamount": "1000.00",
            "rechargenum": "0",
            "rechargetime": "2018-03-28 13:43:34",
            "logintime": "2018-03-25 13:43:34",
            "registratetime": "2018-03-22 13:43:34",
            "channelaccount": "1235605660"
          },
          {
            "playaccount": "1235605660",
            "ordernum": "100000",
            "loginnum": "0",
            "gamenum": "20",
            "platform": "安卓",
            "rechargeamount": "1000.00",
            "rechargenum": "0",
            "rechargetime": "2018-03-28 13:43:34",
            "logintime": "2018-03-25 13:43:34",
            "registratetime": "2018-03-22 13:43:34",
            "channelaccount": "1235605660"
          },
          {
            "playaccount": "1235605660",
            "ordernum": "100000",
            "loginnum": "0",
            "gamenum": "201",
            "platform": "安卓",
            "rechargeamount": "1000.00",
            "rechargenum": "0",
            "rechargetime": "2018-03-28 13:43:34",
            "logintime": "2018-03-25 13:43:34",
            "registratetime": "2018-03-22 13:43:34",
            "channelaccount": "1235605660"
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
  @import url('../scss/playlist.css');

</style>
