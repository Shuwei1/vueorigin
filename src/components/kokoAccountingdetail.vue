<template>
  <div class="pageAccountingdetail">
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        财务管理
        <span class="c-gray en">&gt;</span>
        结算明细
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px"></div>
    <div class="panel panel-default" style="border:none;">
      <!-- <div class="panel-heading">结算明细</div> -->
      <div class="panel-body">
        <form method="post" style="text-align:left" class="form-inline">
          <label style="margin-left: 20px;">交易时间：</label>
          <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"> 至
          <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end">
          <label style="margin-left: 20px;">提现订单：</label>
          <input type="text" class="form-control inline" v-model='ordertext' placeholder="请输入提现订单号">
          <button type="button"  @click="query()"   class="btn btn-success radius" id="" name="">查询
            <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
          </button>
          <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :agoDayHide='1514937600'
            class="cal"></Calendar>
          <Calendar v-on:choseDay="clickDay2" v-on:changeMonth="changeDate" v-on:isToday="clickToday" isHideOtherday=false :futureDayHide='15251040000'
            ref="Calendar" class="cal2"></Calendar>
        </form>
      </div>
    </div>

    <div class="addbox">
      <table class="layui-table">
        <colgroup>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>游戏订单号</th>
            <th>游戏</th>
            <th>玩家账号</th>
            <th>推广ID</th>
            <th>订单总额</th>
            <th>实际支付金额</th>
            <th>收益</th>
            <th>充值时间</th>
            <th>订单状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in lists" :key="index">
            <td>{{item.order_id}}</td>
            <td>{{item.game_name}}</td>
            <td>{{item.mem_name}}</td>
            <td>{{item.order_id}}</td>
            <td>{{item.coin_cnt}}</td>
            <td>{{item.real_pay}}</td>
            <td>{{item.agent_profit}}</td>
            <td>{{item.create_time}}</td>
            <td>{{item.status}}</td>
          </tr>
        </tbody>
      </table>
      <div class="pag">
        <v-pagination :total="len" :page-size="pageSize" @page-change="pageChange"   :layout="['total', 'prev', 'pager', 'next','sizer','jumper']"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'kokoAccountingdetail',
    data() {
      return {
        msg: 'kokoAccountingdetail',
        baseurl: domain.testUrl+'/index.php/Index/Settle/settleList',
        start: '',
        end: '',
        pageIndex: 1,
        pageSize:10,
        // 订单检索
        ordertext: '',
        //  传递的参数
        user_id: {},
        //  列表总数据
        lists: [],
        // 总条数
        len: '',

      }
    },
    created() {
      let vm = this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        begin_time:'',
        end_time:'',
        order_id: vm.ordertext,
        page:1,
        per_page:10
      }
      vm.user_id = user_id;
      this.$http.post(this.baseurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(res => {
        console.log(res.data);
        var data = res.data.data;
        vm.lists = data.list;
        console.log(vm.lists);
        vm.len = data.count;  
        vm.lists.forEach(item => {
         console.log(this.timestampToTime(item.create_time));
         let create_time=this.timestampToTime(item.create_time);
         item.create_time=create_time;
        });
       
      }, res => {
        console.log(error);
      })
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
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      //  时间转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        return Y + M + D;
      },


 //  查询按钮
      query() {
      let vm=this;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        begin_time:vm.start,
        end_time:vm.end,
        order_id:vm.ordertext,
        page:vm.pageIndex,
        per_page:vm.pageSize
      }
      vm.user_id = user_id;
      this.$http.post(this.baseurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(res => {
        console.log(res.data);
         vm.lists.forEach(item => {
         let create_time=this.timestampToTime(item.create_time);
         item.create_time=create_time;
        });
        vm.lists=res.data.data.list;
      
      }, res => {
        console.log(error);
      })
      },

      // 获取当前页数
      pageChange(pageIndex) {
        let vm = this;
        vm.pageIndex = pageIndex;
        console.log(pageIndex);
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          begin_time: this.start,
          end_time: this.end,
          order_id: this.ordertext
        }
        this.$http.post(this.baseurl, user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          console.log(res.data);
          vm.lists = res.data.data.list;
          vm.lists.create_time = this.timestampToTime(vm.lists.create_time);
        }, res => {
          console.log('error');
        });
      },
    },
    // pageSizeChange(pageSize) {
    //   // 每页显示的数目
    //   this.pageIndex = 1;
    //   this.pageSize = pageSize;
    //   console.log(pageSize);
    // },
    components: {
      Calendar
    }
  }

</script>
<style scoped>
  @import url('../scss/paydetail.css');

</style>
