<template>
  <div class="login">
    <!-- 头部 -->
    <div class="head">
      <header>
        <div>
          {{msg}}
        </div>
        <div class="loginname" @mouseenter="show()" @mouseleave="hide()">
          <span>欢迎：</span>
          <span style="display: flex;">
            <span style="margin-right:10px;">{{name}}</span>
            <span @click="goback" v-show='isback' style="margin:0 10px">退出</span>
            <span  @click="adv()" v-show='isback'>公告</span>
            <span  @click="personal()" v-show='isback' style="margin:0 10px">私信</span>
          </span>
        </div>

      </header>
    </div>
    <div class="cfix"></div>
    <!-- 侧边导航菜单 -->
    <div class="container cf">
      <!-- 左边导航 -->
      <aside class="koko-l leftmenu">
        <el-collapse v-model="activeName" accordion>
          <!-- <el-collapse-item title="首页" name="1" class="index" aria-expanded="false"></el-collapse-item> -->
          <div class="koko-index" @click='add()'>
            <router-link to='/index/indexrouter'> 首页</router-link>
          </div>
          <el-collapse-item title="平台币管理" name="1" style="border:none;">
            <div>
              <router-link to='/index/kokoPay'>平台币充值 </router-link>
            </div>
            <div>
              <router-link to='/index/kokoTransfer'>平台币转账 </router-link>
            </div>
          </el-collapse-item>
          <el-collapse-item title="游戏管理" name="2">
            <div>
              <router-link to='/index/kokogame'>我的游戏 </router-link>
            </div>
            <div>
              <router-link to='/index/kokoapplygame'>申请游戏</router-link>
            </div>
          </el-collapse-item>
          <el-collapse-item title="数据统计" name="3">
            <div>
              <router-link to='/index/kokoOrdersearch'>订单查询</router-link>
            </div>
            <div>
              <router-link to='/index/kokoGamedata'>每日数据</router-link>
            </div>
            <div>
              <router-link to='/index/kokoExtendrformance'>推广员数据</router-link>
            </div>
            <div>
              <router-link to='/index/kokoRolesearch'>角色查询</router-link>
            </div>
            <div>
              <router-link to='/index/kokoRegistrationsearch'>注册查询</router-link>
            </div>
            <div>
              <router-link to='/index/kokoEquipmentsearch'>设备查询</router-link>
            </div>
            <div>
              <router-link to='/index/kokoPlayerlist'>玩家列表</router-link>
            </div>
          </el-collapse-item>
          <el-collapse-item title="人员管理" name="4">
            <div>
              <router-link to='/index/kokoGamemanage'>组长管理</router-link>
            </div>
            <div>
              <router-link to='/index/kokoProportionsearch'>推广员管理</router-link>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务管理" name="5">
            <div>
              <router-link to='/index/kokoAccountingcenter'>结算中心</router-link>
            </div>
            <div>
              <router-link to='/index/kokoAccountingdetail'>结算明细</router-link>
            </div>
            <div>
              <router-link to='/index/kokoWithdrawarecord'>提现记录</router-link>
            </div>
          </el-collapse-item>
          <el-collapse-item title="安全管理" name="67">
            <div>
              <router-link to='/index/kokoPwdchange'>修改密码</router-link>
            </div>
            <div>
              <router-link to='/index/kokoPwdpaychange'>修改支付密码</router-link>
            </div>
            <div>
              <router-link to='/index/kokoUserbaseinformation'>用户基础信息</router-link>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div>
        </div>
      </aside>
      <!-- 中间部分 -->
      <main class="koko-l main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store';
  export default {
    name: 'index',
    data() {
      return {
        msg: '可游平台管理中心',
        name: localStorage.getItem('user_login'),
        activeName: '',
        isback: false,
        baseurl: domain.testUrl + '/index.php/Index/login/logout',
        advurl:domain.testUrl+'/index.php/Index/News/news_list',
        isshow:false
      }
    },
    computed: {

    },
    store,
    methods: {
      add: function () {
        console.log(666);
        this.activeName = '';
      },
      show() {
        let vm = this;
        vm.isback = true;
        vm.isshow=true;
      },
      hide() {
        let vm = this;
        vm.isback = false;
        vm.isshow=true;
      },
     

      // 退出
      goback() {
        this.$http.post(this.baseurl).then(res => {
          var code = res.data.code;
          // console.log(res.data);
          if (code == 0) {
            //  退出成功
            this.$router.push({
              path: '/'
            });　
            this.$store.state.count = '';
          } else {
            // 失败 刷新当前页面
            window.location.reload();
          }
          res => {
            console.log('error')
          }
        })
      },

      adv(){
       let vm=this;
       let user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        posttype:1,
        page:'',
        per_page:10
      }
       vm.user_id = user_id;
       vm.$http.post(vm.advurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(
        res => {
          console.log(res.data);
          localStorage.setItem('Private_list', JSON.stringify(res.data.data.Private_list));

          this.$router.push({path:'/index/adv'})
        },
        res => {
          console.log('error')
        })
      },

      personal(){
       let vm=this;
       let user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        posttype:2,
        page:'',
        per_page:10
      }
       vm.user_id = user_id;
       vm.$http.post(vm.advurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(
        res => {
          console.log(res.data);
        
         localStorage.setItem('Private_list1', JSON.stringify(res.data.data.Private_list));
           this.$router.push({path:'/index/personal'})
        },
        res => {
          console.log('error')
        })
      }






    },
    mounted() {
      $('.leftmenu div').each(function () {
        $(this).hover(function () {
          $(this).css('color', 'red');
        }, function () {
          $(this).css('color', '#fff');
        });
      })
      $('.leftmenu div a').each(function () {
        $(this).hover(function () {
          $(this).css('color', 'red');
        }, function () {
          $(this).css('color', '#fff');
        });
        $(this).click(function () {
          $(this).css('color', 'red');
        })
      })
    }


  }

</script>
<style lang="scss">
  // 引入页面样式
  @import url('../scss/reset.css');
  @import url('../scss/index.css');
  @import url('../scss/common.css');

</style>
<style scoped>
  .el-collapse-item__header {
    border: none !important;
  }

</style>
