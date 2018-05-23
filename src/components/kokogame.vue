<template>
  <div class="pagekokogame">
    <!-- 头部 -->
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 首页</span>
        <span class="c-gray en">&gt;</span>
        游戏管理
        <span class="c-gray en">&gt;</span>
        我的游戏
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()" title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px"></div>

    <div class="gamebtn">
      <ul class="tabs clearfix" style="margin:20px 0px;padding-left:10px">
        <li v-for="(tab,index) in tabsName" :key="index">
          <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>
        </li>
      </ul>
      <div>
        <form class="form-inline text">
          <button class="btn btn-default" style="margin-right:12px">本机号</button>
          <button class="btn btn-primary" style="margin-right:12px">组长</button>
          <button class="btn btn-primary" style="margin-right:12px">推广员</button>
          <select class="form-control sel" style="margin-right:12px">
            <option>全部</option>
            <option>{{admin}}</option>
          </select>
          <label class="" for="exampleInputPassword3">游戏名称：</label>
          <select class="form-control sel" v-model="gamename">
            <option v-for="(item,index) in arr" :key="index" :value="item.app_id">
              <span>{{item.gamename}}</span>
            </option>
            <!-- <option>战火纪元</option>
            <option>战火纪元</option>
            <option>战火纪元</option> -->
          </select>
          <button type="button" class="btn btn-success" style="margin-left:20px" @click="query()">
            <i class="layui-icon" style="color:white;margin-right: 10px;">&#xe615;</i>查询</button>
        </form>
      </div>
    </div>

    <div class="addbox">
      <div style="width:100%;" class="cards">

        <!-- 我的游戏 -->
        <table class="layui-table tab-card" style="display:inline-table;">
          <colgroup>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>图标</th>
              <th>游戏名字</th>
              <th>平台</th>
              <th>游戏类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in arr" :key="index">
              <td>
                <img :src="item.icon" alt="000" width="50" height="50">
              </td>
              <td>{{item.gamename}}</td>
              <td>
                <span v-show="item.classify==3">安卓</span>
                <span v-show="item.classify==4">苹果</span>
              </td>
              <td>{{item.type_name}}</td>
              <td>
                <span style="" class="tag-read2" :data-clipboard-text="item.app_fp" @click="copy2">复制推广链接</span>
                <span style="" class="tag-read1" :data-clipboard-text="item.reg_fp" @click="copy1">复制下载链接</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 安卓游戏 -->
        <table class="layui-table tab-card">
          <colgroup>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>图标</th>
              <th>游戏名字</th>
              <th>平台</th>
              <th>游戏类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in adrlist" :key="index">
              <td>
                <img :src="item.icon" alt="000" width="50" height="50">
              </td>
              <td>{{item.gamename}}</td>
              <td>安卓</td>
              <td>{{item.type_name}}</td>
              <td>
                <span>已添加</span>
                <!-- <span @click="add()">+</span> -->
              </td>
            </tr>
          </tbody>
        </table>


        <!-- iOS游戏 -->
        <table class="layui-table tab-card">
          <colgroup>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>图标</th>
              <th>游戏名字</th>
              <th>平台</th>
              <th>游戏类型</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in ioslist" :key="index">
              <td>
                <img :src="item.icon" alt="000" width="50" height="50">
              </td>
              <td>{{item.gamename}}</td>
              <td>苹果</td>
              <td>{{item.type_name}}</td>
              <td>
                <span>已添加</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pag">
        <v-pagination :total="len" :page-size="pageSize" @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next','sizer', 'jumper']"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';
  import tabledemo from '../components/tabledemo.vue';

  export default {
    name: 'kokogame',
    data() {
      return {
        msg: 'kokoAccountingdetail',
        // 安卓/IOS游戏列表接口
        gameurl: domain.testUrl + '/index.php/Index/Game/apply_game',
        // 游戏接口请求不了
        gamelisturl: domain.testUrl + '/index.php/Index/Game/game_list',
        //  添加游戏接口
        addurl: domain.testUrl + '/index.php/Index/Game/apply_game_post',
        gamename: '',
        start: '',
        end: '',
        // 当前页数
        pageIndex: 1,
        // 每页显示条数
        pageSize: 10,
        // 传递的参数
        user_id: {},
        user_id1: {},
        adrid:'',
        tab: '',
        active: false,
        len: '',
        tabsName: [{
            name: "我的游戏",
            isActive: true
          },
          {
            name: "安卓游戏",
            isActive: false,
            classify: 3
          },
          {
            name: "iOS游戏",
            isActive: false,
            classify: 4
          }

        ],
        //  我的游戏
        arr: [],
        // 安卓游戏
        adrlist: [],
        // iOS游戏
        ioslist: [],
        app_id: '',
        option: '',
        isShow: false,
        admin: localStorage.getItem('user_login')
      }
    },
    created() {
      let vm = this;
      let user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        app_id: '',
        userid: '',
        page: vm.pageIndex,
        per_page: vm.pageSize
      }
      vm.user_id = user_id;
      vm.$http.post(vm.gamelisturl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(
        res => {
          vm.len = res.data.data.count;
          vm.arr = res.data.data.list;
          vm.arr.forEach(element => {
            vm.app_id = element.app_id;
          });
          console.log(res.data);
        },
        res => {
          console.log('error')
        })
    },
    methods: {
      // add() {
      //   console.log(2323)
      //   let vm = this;
      //   var user_id = {
      //     user_id: localStorage.getItem('user_id'),
      //     api_token: localStorage.getItem('api_token'),
      //     app_id:vm.app_id,
      //   }
      //   vm.user_id = user_id;
      //   vm.$http.post(vm.addurl, user_id, {
      //     emulateJSON: true,
      //     withCredentials: true
      //   }).then(
      //     res => {
      //       console.log(res.data);
      //     },
      //     res => {
      //       console.log('error')
      //     })
      // },

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
      // 游戏选择
      tabsSwitch: function (tabIndex) {
        let vm = this;
        vm.tab = tabIndex;
        console.log(vm.tab);
        var tabCardCollection = document.querySelectorAll(".tab-card"),
          len = tabCardCollection.length;
        console.log(tabIndex);
        //  0 对应我的游戏  1对应安卓游戏 2 对应iOS游戏 获取对应的接口数据
        if (tabIndex == 0) {
          let vm = this;
          let user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            app_id: '',
            userid: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          vm.$http.post(vm.gamelisturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data);
              vm.len = res.data.data.count;
              vm.arr = res.data.data.list;
            },
            res => {
              console.log('error')
            })
        }
        if (tabIndex == 1) {
          let vm = this;
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify:vm.tabsName[tabIndex].classify,
            userType: '1',
            userid:'',
            app_id:'',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.arr=vm.adrlist;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log(error);
          })
        }

        if (tabIndex == 2) {
          let vm = this;
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[tabIndex].classify,
            userType: '1',
            userid: '',
            app_id: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.ioslist = res.data.data.games;
            vm.arr=vm.ioslist;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log(error);
          })
        }
        for (var i = 0; i < len; i++) {
          tabCardCollection[i].style.display = "none";
          this.tabsName[i].isActive = false;
        }
        this.tabsName[tabIndex].isActive = true;
        tabCardCollection[tabIndex].style.display = "inline-table";
      },

      // 获取当前点击的页码
      pageChange(pageIndex) {
        let vm = this;
        vm.pageIndex = pageIndex;
        console.log(pageIndex);
        // 判断
        if (vm.tab == 0) {
          let user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            app_id: '',
            userid: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          vm.$http.post(vm.gamelisturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data);
              vm.len = res.data.data.count;
              vm.arr = res.data.data.list;

            },
            res => {
              console.log('error')
            })
        }

        if (vm.tab == 1) {
          // 安卓
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[1].classify,
            userType: '1',
            userid: '',
            app_id: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }

          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log('error');
          });
        }

        // ios 
        if (vm.tab == 2) {
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[2].classify,
            userType: '1',
            userid: '',
            app_id: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log('error');
          });
        }
      },

      //  查询
      query() {
        let vm = this;
        console.log(vm.gamename);
        if (vm.tab == 0) {
          let user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            app_id: vm.gamename,
            userid: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          vm.$http.post(vm.gamelisturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data);
              vm.arr = res.data.data.list;
              vm.len = res.data.data.count;
            },
            res => {
              console.log('error')
            })
        }


        if (vm.tab == 1) {
          let vm = this;
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[vm.tab].classify,
            userType: '1',
            userid: '',
            app_id:vm.gamename,
            page:vm.pageIndex,
            per_page:vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.len = res.data.data.games.length;

          }, res => {
            console.log(error);
          })
        }


        if (vm.tab == 2) {
          let vm = this;
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[vm.tab].classify,
            userType: '1',
            userid: '',
            app_id:vm.gamename,
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.ioslist = res.data.data.games;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log(error);
          })
        }
      },
      //  点击复制链接
      copy2() {
        let vm = this;
        var clipboard = new this.Clipboard('.tag-read2');
        clipboard.on('success', e => {
          alert("复制成功");
          // 释放内存  
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制  
          alert('该浏览器不支持自动复制');
          clipboard.destroy();
        })
      },

      copy1() {
        let vm = this;
        var clipboard = new this.Clipboard('.tag-read1');
        clipboard.on('success', e => {
          alert("复制成功");
          // 释放内存  
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制  
          alert('该浏览器不支持自动复制');
          clipboard.destroy();
        })
      },


      // 每页显示的数据改变回调
      pageSizeChange(pageSize) {
        let vm = this;
        vm.pageIndex = 1;
        vm.pageSize = pageSize;
        console.log(vm.pageSize);
        if (vm.tab == 0) {
          let user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            app_id: '',
            userid: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          vm.$http.post(vm.gamelisturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data);
              vm.len = res.data.data.count;
              vm.arr = res.data.data.list;
            },
            res => {
              console.log('error')
            })
        }
        if (vm.tab == 1) {
          // 安卓
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[1].classify,
            userType: '1',
            userid: '',
            app_id: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log('error');
          });
        }
        // ios 
        if (vm.tab == 2) {
          var user_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            classify: vm.tabsName[2].classify,
            userType: '1',
            userid: '',
            app_id: '',
            page: vm.pageIndex,
            per_page: vm.pageSize
          }
          vm.user_id = user_id;
          this.$http.post(this.gameurl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(res => {
            console.log(res.data);
            vm.adrlist = res.data.data.games;
            vm.len = res.data.data.games.length;
          }, res => {
            console.log('error');
          });
        }
      },
    },
    components: {
      Calendar,
      tabledemo
    }
  }

</script>


<style scoped>
  @import url('../scss/kokogame.css');

</style>


<style scoped>
  .box {
    width: 800px;
    height: 200px;
    margin: 0 auto;
    border: 1px solid #000;
  }

  .tabs li {
    float: left;
    list-style: none;
  }

  .tabs .tab-link {
    display: block;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #e6e6e6;
    color: #000;
    text-decoration: none;
    font-size: 12px;
  }

  .tabs .tab-link.active {
    height: 30px;
    background: #000;
    color: #fff;
    transition: .3s;
  }

  .cards {
    /* float: left; */
  }

  .cards .tab-card {
    display: none;
  }

  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

</style>
