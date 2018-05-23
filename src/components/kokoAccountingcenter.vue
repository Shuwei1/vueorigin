<template>
  <div class="pageAccountingcenter">
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        财务管理
        <span class="c-gray en">&gt;</span>
        结算中心
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div class="pagemain">
      <div class="text-l">
        <div class="panel panel-default" id="summarize">
          <div class="panel-heading">结算概况</div>
          <div class="panel-body">
            <ul>
              <li class="money">
                <label class="balance">账户余额（元）
                  <a href="/agent_new.php/Agent/Settle/withdrawalsList" target="app-iframe" class="detail">提现明细</a>
                </label>
                <label class="balance-num">
                  {{balance}}
                  <a href="javascript:void(0);" id="btnWithdrawal" class="blue" @click="getmoney()">提现</a>
                </label>
              </li>
              <li class="bg">
                <span class="settlement">历史收益(元)
                  <br>
                  <b>{{allIncomeStatistics}}元</b>
                </span>
              </li>
              <li class="bg2">
                <span class="settlement">本月收益(元)
                  <br>
                  <b>{{thisMonthIncomeStatistics}}元</b>
                </span>
              </li>
              <li class="bg3">
                <span class="settlement">昨日收益(元)
                  <br>
                  <b>{{yesterdayIncomeStatistics}}元</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">结算明细</div>
          <div class="panel-body">
            <form method="post" style="text-align:left" class="form-inline">
              <label style="margin-left: 20px;">交易时间：</label>
              <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"> 至
              <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end">
              <button type="button" @click="query()" class="btn btn-success radius" id="" name="">查询
                <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
              </button>
              <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :agoDayHide='1514937600'
                class="cal"></Calendar>
              <Calendar v-on:choseDay="clickDay2" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :futureDayHide='15251040000'
                ref="Calendar" class="cal2"></Calendar>
            </form>
          </div>
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
            <th>收益</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in lists" :key="index">
            <td>{{item.create_time}}</td>
            <td>{{item.sum_agent_gain}}</td>
            <td>
              <a href="javascript:void(0)">明细</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pag">
        <v-pagination :total="totallen" :page-size="pageSize" @page-change="pageChange"  @page-size-change="pageSizeChange"  :layout="['total', 'prev', 'pager', 'next','sizer','jumper']"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import Calendar from 'vue-calendar-component';
  // import tabledemo from "../components/tabledemo.vue";
  export default {
    name: 'kokoAccountingcenter', 
    data() {
      return {
          // 页码
        pageIndex:1,
        // 每页数量
        pageSize:10,
        msg: 'kokoAccountingcenter',
        centerurl:domain.testUrl+'/index.php/Index/Settle/indexNew',
        // 返回数组
        arrlist: {},
        balance: {},
        allIncomeStatistics:{},
        yesterdayIncomeStatistics: {},
        thisMonthIncomeStatistics: {},
        user_id: {},
        start: '',
        end: '',
        search: '',
        lists: [],
        totallen:'',
        arr: []
      }
    },
    created() {
      let vm = this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        begin_time:vm.start,
        end_time:vm.end,
        page:2,
        per_page:vm.pageSize
      }
      vm.user_id = user_id;
      this.$http.post(this.centerurl, user_id, { emulateJSON: true, withCredentials: true}).then(res => {
        console.log(res.data.data);
        let listdata=res.data.data.list;
        vm.lists =listdata;
        vm.balance=res.data.data.balance;
        vm.allIncomeStatistics=res.data.data.allIncomeStatistics;
        vm.yesterdayIncomeStatistics=res.data.data.yesterdayIncomeStatistics;
        vm.thisMonthIncomeStatistics=res.data.data.thisMonthIncomeStatistics; 
        vm.totallen = res.data.data.list.length;
      }, res => {
        console.log('error');
      })
    },
    methods: {
      starttime(data) {
        $('.cal').fadeIn(200);
        $('.cal2').fadeOut(200);
      },
      endtime() {
        $('.cal2').fadeIn(200);
        $('.cal').fadeOut(200);
      },
      // 选中的起始时间
      clickDay(data) {
        let vm = this;
        // console.log(data); 
        vm.start = data;
        // alert(vm.start);
        $('.cal').fadeOut(200);
      },
      // 选中的结束时间
      clickDay2(res) {
        let vm = this;
        vm.end = res;
        $('.cal2').fadeOut(200);
        // alert(vm.end);
      },
      // 提现功能
      getmoney() {
        this.$router.push({
          path: '/withdraw'
        });　
      },

      //  查询按钮
      query() {
        let vm = this;
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          begin_time:vm.start,
          end_time:vm.end,
          page:vm.pageSize,
          per_page:vm.pageSize
        }
        vm.user_id = user_id;
        this.$http.post(this.centerurl, vm.user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          // vm.user_id.begin_time = vm.start;
          // vm.user_id.end_time = vm.end;
          // console.log(vm.user_id);
             vm.lists=res.data.data.list;
        }, res => {
          console.log('error');
        })
      },

      changeDate(data) {
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },

      // 获取当前页数
      pageChange(pageIndex) {
        let vm=this;
        vm.pageIndex = pageIndex;
        console.log(pageIndex);
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          begin_time:vm.start,
          end_time:vm.end,
          page:vm.pageSize,
          per_page:vm.pageSize
        }
       vm.user_id = user_id;
        this.$http.post(this.centerurl, user_id, { emulateJSON: true, withCredentials: true}).then(res => {
           console.log(res.data.data.list);
           vm.lists=res.data.data.list;
        }, res => {
          console.log('error');
        });
      },
      pageSizeChange(pageSize) {
        let vm=this;
        // 每页显示的数目
        vm.pageIndex = 1;
        this.pageSize = pageSize;
        // console.log(pageSize);
      },
    },
    components: {
      Calendar
     
    }

  }

</script>
<style scoped>
  @import url('../scss/reset.css');
  @import url('../scss/acocenter.css');

</style>
