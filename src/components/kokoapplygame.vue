<template>
  <div class="pageapplygame">
    <!-- 头部 -->
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        游戏管理
        <span class="c-gray en">&gt;</span>
        申请游戏
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px"></div>


    <!-- 中间 -->
    <div class="panel panel-default" style="border:none;">
      <!-- <div class="panel-heading">结算明细</div> -->
      <div class="panel-body">
        <form method="post" style="text-align:left" class="form-inline">
          <label style="margin-left: 20px;">游戏名称：</label>
          <select class="form-control sel" v-model="gamename">

            <option v-for="(item,index) in lists" :key='index' :value="item.app_id">{{item.name}}</option>
          </select>
          <label style="margin-left: 20px;">优惠类型:</label>
          <select class="form-control sel" v-model="benefit_type">

            <!-- <option v-for="(item,index) in lists" :key='index'><span v-show='item.benefit_type==0'>无优惠</span><span v-show='item.benefit_type==1'>折扣</span> </option> -->
            <option value="0">无优惠</option>
            <option value="1">折扣</option>
            <option value="2">返利</option>
          </select>
          <label style="margin-left: 20px;">平台:</label>
          <select class="form-control sel" v-model='classify'>

            <option value='3'>ANDROID</option>
            <option value='4'>IOS</option>
          </select>
          <label style="margin-left: 20px;">分成比例:</label>
          <input type="text" class="form-control inline" v-model="min_rate"> -
          <input type="text" class="form-control inline" v-model="max_rate">%
          <button type="button" class="btn btn-success radius" id="" name="" @click="query()" style="font-size:13px;margin-left:20px;">查询
            <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
          </button>
          <!-- <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :agoDayHide='1514937600'
            class="cal"></Calendar>
          <Calendar v-on:choseDay="clickDay2" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :futureDayHide='15251040000'
            ref="Calendar" class="cal2"></Calendar> -->
        </form>
      </div>
    </div>

    <div class="addbox">
      <div style="width:100%;" class="cards">
        <table class="layui-table tab-card">
          <colgroup>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>图标</th>
              <th>游戏名称</th>
              <th>游戏类型</th>
              <th>平台</th>
              <th>优惠类型</th>
              <th>折扣/返利</th>
              <th>分成比例</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in lists" :key="index">
              <td>
                <img :src="item.icon" alt="000" width="50" height="50">
              </td>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>{{item.classify}}</td>
              <td>
                <span v-show='item.benefit_type==0'>无优惠</span>
                <span v-show='item.benefit_type==1'>折扣</span>
                <span v-show='item.benefit_type==2'>返利</span>
              </td>
              <td>--</td>
              <td>{{item.agent_rate}}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pag">
        <v-pagination :total="len" :page-size="pageSize" @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from "vue-calendar-component";
  import tabledemo from "../components/tabledemo.vue";
  export default {
    name: "kokoapplygame",
    data() {
      return {
        msg: "kokoAccountingdetail",
        baseurl: domain.testUrl + '/index.php/Index/Game/gameratelist',
        start: "",
        end: "",
        active: false,
        // 当前页数
        pageIndex: 1,
        // 每页显示条数
        pageSize: 10,
        user_id: {},
        len: '',
        lists: [],
        gamename: '',
        classify: '',
        min_rate: '',
        max_rate: '',
        benefit_type: ''
      };
    },

    created() {
      let vm = this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        classify: '',
        app_id: '',
        benefit_type: '',
        min_rate: '',
        max_rate: '',
        page: vm.pageIndex,
        per_page: vm.pageSize
      }
      vm.user_id = user_id;
      this.$http.post(this.baseurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(res => {
        console.log(res.data.data);
        vm.len = res.data.data.count;
        vm.lists = res.data.data.list;
        console.log(vm.lists);
      }, res => {
        console.log(error);
      })
    },

    methods: {
      starttime() {
        $(".cal").fadeIn(200);
        $(".cal2").fadeOut(200);
      },
      endtime() {
        $(".cal2").fadeIn(200);
        $(".cal").fadeOut(200);
      },
      clickDay(data) {
        console.log(data);
        this.start = data;
        $(".cal").fadeOut(200);
      },
      clickDay2(res) {
        console.log(res);
        this.end = res;
        $(".cal2").fadeOut(200);
      },
      changeDate(data) {
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      // 点击查询 
      query() {
        let vm = this;
        console.log(vm.classify);
        console.log(vm.benefit_type);
        console.log(vm.min_rate);
        if (vm.pageIndex = 1) {
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.classify,
            app_id: vm.gamename,
            benefit_type: vm.benefit_type,
            min_rate: vm.min_rate,
            max_rate: vm.max_rate,
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.baseurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data.data);
            vm.len = res.data.data.count;
            vm.lists = res.data.data.list;
            console.log(vm.lists);
          }, res => {
            console.log(error);
          })
        }
        if (vm.pageIndex = 2) {
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.classify,
            app_id: vm.gamename,
            benefit_type: vm.benefit_type,
            min_rate: vm.min_rate,
            max_rate: vm.max_rate,
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.baseurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data.data);
            vm.len = res.data.data.count;
            vm.lists = res.data.data.list;
            console.log(vm.lists);
          }, res => {
            console.log(error);
          })
        }
      },



      // 获取当前点击的页码
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        console.log(pageIndex);
        let vm = this;
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          // 平台检索
          classify: '',
          // 游戏检索
          app_id: '',
          page: vm.pageIndex,
          per_page: vm.pageSize
        }
        vm.user_id = user_id;
        this.$http.post(this.baseurl, user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          console.log(res.data.data);
          vm.len = res.data.data.count;
          vm.lists = res.data.data.list;
        }, res => {
          console.log(error);
        })
      },

      pageSizeChange(pageSize) {
        let vm = this;
        vm.pageIndex = 1;
        vm.pageSize = pageSize;
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          // 平台检索
          classify: '',
          // 游戏检索
          app_id: '',
          page: vm.pageIndex,
          per_page: vm.pageSize
        }
        vm.user_id = user_id;
        this.$http.post(this.baseurl, user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          console.log(res.data.data);
          vm.len = res.data.data.count;
          vm.lists = res.data.data.list;
        }, res => {
          console.log(error);
        })


      },
    },
    components: {
      Calendar,
      tabledemo
    }
  };

</script>
<style scoped>
  @import url("../scss/applygame.css");

</style>
