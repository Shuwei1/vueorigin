<template>
  <div class="pageRolesearch">
    <!-- 头部导航 -->
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        数据统计
        <span class="c-gray en">&gt;</span>
        角色查询
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
          <label style="margin-left: 20px;">游戏名称:</label>
          <select class="form-control sel">
            <option>--请选择--</option>
            <option>青云决-飘渺之旅</option>
            <option>天影传说</option>
            <option>逆剑3D-and</option>
          </select>
          <label style="margin-left: 20px;">组长：</label>
          <select class="form-control sel">
            <option>全部</option>
            <option>sunshine</option>
            <option>koko</option>
            <option>ggg</option>
          </select>
          <label style="margin-left: 20px;">游戏区服:</label>
          <input type="text" placeholder="请输入游戏区服" class="form-control sel">
          <div class="mr">
            <label style="margin-left: 20px;">角色名称:</label>
            <input type="text" placeholder="请输入角色名称" class="form-control sel">
            <label style="margin-left: 20px;">玩家账号:</label>
            <input type="text" placeholder="请输入玩家账号" class="form-control sel">
            <label style="margin-left: 20px;">时间：</label>
            <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"
              placeholder="开始时间"> -
            <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end"
              placeholder="结束时间">
            <label style="margin-left: 20px;">玩家等级:</label>
            <input type="number" placeholder="请输入最低等级" class="form-control sel"> 至
            <input type="text" placeholder="请输入最高等级" class="form-control sel">
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
            <th>推广账号</th>
            <th>游戏名称</th>
            <th>平台</th>
            <th>游戏区服</th>
            <th>角色名</th>
            <th>等级</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" :key="index">
            <td>{{item.playaccount}}</td>
            <td>{{item.extendaccount}}</td>
            <td>{{item.gamename}}</td>
            <td>{{item.platform}}</td>
            <td>{{item.area}}</td>
            <td>{{item.rolename}}</td>
            <td>{{item.rank}}</td>
            <td>{{item.createtime}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pag">
        <v-pagination :total="arr.length" :page-size="pageSize" @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import tabledemo from '../components/tabledemo.vue';
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'kokoRolesearch',
    data() {
      return {
        msg: 'kokoAccountingdetail',
        pageIndex: 2,
        pageSize: 10,
        start: '',
        end: '',
        arr: [{
            "playaccount": "1235605660",
            "extendaccount": "1235605660",
            "gamename": "倚剑刀狂-IOS",
            "platform": "安卓",
            "area": "云中界139服",
            "rolename": "后正奇",
            "rank": "99",
            "createtime": "2018-03-28 13:43:34"
          },
          {
            "playaccount": "1235605660",
            "extendaccount": "1235605660",
            "gamename": "倚剑刀狂-IOS",
            "platform": "安卓",
            "area": "云中界139服",
            "rolename": "后正奇",
            "rank": "99",
            "createtime": "2018-03-28 13:43:34"
          },
          {
            "playaccount": "1235605660",
            "extendaccount": "1235605660",
            "gamename": "倚剑刀狂-IOS",
            "platform": "安卓",
            "area": "云中界139服",
            "rolename": "后正奇",
            "rank": "99",
            "createtime": "2018-03-28 13:43:34"
          },
          {
            "playaccount": "1235605660",
            "extendaccount": "1235605660",
            "gamename": "倚剑刀狂-IOS",
            "platform": "安卓",
            "area": "云中界139服",
            "rolename": "后正奇",
            "rank": "99",
            "createtime": "2018-03-28 13:43:34"
          },
          {
            "playaccount": "1235605660",
            "extendaccount": "1235605660",
            "gamename": "倚剑刀狂-IOS",
            "platform": "安卓",
            "area": "云中界139服",
            "rolename": "后正奇",
            "rank": "99",
            "createtime": "2018-03-28 13:43:34"
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
  @import url('../scss/rolesearch.css');

</style>
