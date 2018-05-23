<template>
  <div class="pageTransfer">
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        平台币管理
        <span class="c-gray en">&gt;</span>
        平台币转账
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div class="panel panel-default" style="border:none;">
      <!-- <div class="panel-heading">结算明细</div> -->
      <div class="panel-body">
        <form method="post" style="text-align:left" class="form-inline">
          <label style="margin-left: 20px;">账号类型：</label>
          <select class="form-control sel">
            <option>全部</option>
            <option>组长</option>
            <option>推广员</option>
            <option>玩家</option>
          </select>
          <label style="margin-left: 20px;">订单号：</label>
          <input type="text" class="form-control inline" placeholder="请输入提现订单号">
          <label style="margin-left: 20px;">收款方账号：</label>
          <input type="text" class="form-control inline" placeholder="请输入收款方账号">
          <label style="margin-left: 20px;">申请时间：</label>
          <input type="text" id="logmin" class="form-control inline" @click="starttime()" value="" style="width:120px;" v-model="start"> 至
          <input type="text" id="logmax" class="form-control inline" value="" @click="endtime()" style="width:120px;" v-model="end">
          <button type="button" class="btn btn-success radius" id="" name="">查询
            <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
          </button>
          <button type="button" class="btn btn-success radius" id="" name="">转账
            <i class="layui-icon" style="color:white;margin-left:5px;padding-top:3px;">&#xe615;</i>
          </button>
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
            <th>订单号</th>
            <th>收款方账号</th>
            <th>账号类型</th>
            <th>平台币数量</th>
            <th>交易说明</th>
            <th>交易状态</th>
            <th>交易时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" :key="index">
            <td>{{item.ordernum}}</td>
            <td>{{item.receivecount}}</td>
            <td>{{item.typecount}}</td>
            <td>{{item.num}}</td>
            <td>{{item.description}}</td>
            <td>{{item.status}}</td>
            <td>{{item.time}}</td>
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
  import Calendar from 'vue-calendar-component';
  export default {
    name: 'kokoTransfer',
    data() {
      return {
        msg: 'kokoWithdrawarecord',
        start: '',
        end: '',
        pageIndex:1,
        pageSize:10,
        arr: [{
            "ordernum": "00012121212",
            "receivecount": "1234512152",
            "typecount": "玩家",
            "num": "1",
            "description": '测试',
            "status": '支付完成',
            "time": "2018-2-1"

          },
          {
            "ordernum": "00012121212",
            "receivecount": "1234512152",
            "typecount": "玩家",
            "num": "1",
            "description": '测试',
            "status": '支付完成',
            "time": "2018-2-1"
          },
          {
            "ordernum": "00012121212",
            "receivecount": "1234512152",
            "typecount": "玩家",
            "num": "1",
            "description": '测试',
            "status": '支付完成',
            "time": "2018-2-1"
          },
          {
            "ordernum": "00012121212",
            "receivecount": "1234512152",
            "typecount": "玩家",
            "num": "1",
            "description": '测试',
            "status": '支付完成',
            "time": "2018-2-1"
          },
          {
            "ordernum": "00012121212",
            "receivecount": "1234512152",
            "typecount": "玩家",
            "num": "1",
            "description": '测试',
            "status": '支付完成',
            "time": "2018-2-1"
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
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      // 获取当前点击的页码
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        console.log(pageIndex)
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        console.log(pageSize);
      },
    },
    components: {
      Calendar
    }
  }

</script>
<style scoped>
  @import url('../scss/kokotranfer.css');

</style>
