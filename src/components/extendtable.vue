<template>
  <div style="padding:20px;" class="table">
    <div class="add">
      <span class="l">
        <a href="javascript:;" @click="insert" class="btn btn-primary radius" style="color:white;margin:10px 0;">
          <i class="layui-icon" style="color:white">&#xe654;</i> 添加推广员</a>
      </span>
    </div>
    <div class="panel panel-primary">
      <!-- <div class="panel-heading">用户管理</div> -->
      <table class="table table-bordered table-striped text-center" style="position:relative">
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model='allchecked' @click="changeState(allchecked)">
            </th>
            <th>ID</th>
            <th>账号</th>
            <th>昵称</th>
            <th>手机号码</th>
            <th>邮箱</th>
            <th>注册时间</th>
            <th>最近登录时间</th>
            <th>账号状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in datalist" :key='index' @click="add(user,index,$event)">
            <td>
              <input type="checkbox" v-model="user.check">
            </td>
            <td>{{user.id}}</td>
            <td>{{user.user_name}}</td>
            <td>{{user.user_login}}</td>
            <td>{{user.phone}}</td>
            <td>{{user.user_email}}</td>
            <td>{{user.create_time}}</td>
            <td>{{user.last_login_time}}</td>
            <td>
              <span v-text='normal' v-show="user.user_status==1"></span>
              <span v-text="unnormal" v-show='user.user_status==2'></span>
            </td>
            <td>
              <button class="layui-btn sty2">
                <span v-show="user.user_status==1" class="normal" @click="alert(user,index,$event)">冻结</span>
                <span v-show="user.user_status==2" class="unnormal" @click="use(user,index,$event)">启用</span>
              </button>
              <button class="layui-btn layui-btn-warm" @click="showOverlay(user,index,$event)">编辑</button>
              <button class="layui-btn layui-btn-danger" @click="reset(user,index,$event)">重置密码</button>
            </td>
          </tr>

        </tbody>
      </table>
      <div class="pag">
        <v-pagination :total="count" :page-size="pageSize" @page-change="pageChange" @page-size-change="pageSizeChange" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
      </div>
    </div>

    <!-- 添加组长 -->
    <div class="addformbox" style="display:none;">
      <form class="layui-form" action="" style="">
        <div class="layui-form-item">
          <div class="layui-layer-title" style="cursor: move;" move="ok">添加组长</div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">组长</label>
          <div class="layui-input-block">
            <select name="city" v-model="ownerid">
              <option value="">请选择组长</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">
            <span class="c-red">*</span>账号:</label>
          <div class="layui-input-block">
            <input type="text" name='count' v-model="addarr.user_login" placeholder="" class="layui-input addcount">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">
            <span class="c-red">*</span>昵称:</label>
          <div class="layui-input-block">
            <input type="text" name="name" placeholder="" v-model="addarr.name" class="layui-input addname">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码:</label>
          <div class="layui-input-block">
            <input type="password" name="pwd" v-model="addarr.password" class="layui-input resettext">
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button class="layui-btn" type="button" @click="submit()">提交</button>
          </div>
        </div>
        <span class="layui-layer-setwin">
          <a class="layui-layer-min" href="javascript:;">
            <cite></cite>
          </a>
          <a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" @click="close2"></a>
        </span>
      </form>
    </div>

    <!-- 编辑 -->
    <div class="formbox" v-show="isActive">
      <form class="layui-form" action="" style="">
        <div class="layui-form-item">
          <div class="layui-layer-title" style="cursor: move;" move="ok">编辑</div>
        </div>
        <div class="layui-form-item" style="display:flex;align-item:center;">
          <label class="layui-form-label">是否冻结</label>
          <div class="layui-input-inline">
            <input type="checkbox" style="width:15px;color:red;height:15px;margin-left:30px;margin-top:12px;">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">组长</label>
          <div class="layui-input-block">
            <select name="city">
              <option value="">请选择组长</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-form-item">
            <label class="layui-form-label">账号:</label>
            <div class="layui-input-block">
              <input type="text" name="this.selectedlist.name" v-model="selectedlist.user_login" placeholder="请输入标题" class="layui-input resettext">
              <!-- <input type="text" name="sa" placeholder="长度不少于3位" v-validate="{required: true, regex: /^.{3,10}$/}" v-model="selectedlist.user_login"
                class="layui-input resettext">
              <span class="errortip" v-show="errors.has('sa')">{{ errors.first('sa') }}</span> -->
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">昵称:</label>
            <div class="layui-input-block">
              <input type="text" name="selectedlist.user_name" v-model="selectedlist.user_name" placeholder="请输入标题" class="layui-input resettext">
              <!-- <input type="text" name="saa" placeholder="长度不少于3位" v-validate="{required: true, regex: /^.{3,10}$/}" v-model="selectedlist.user_name"
                class="layui-input resettext"> -->
              <!-- <span class="errortip" v-show="errors.has('saa')">{{ errors.first('saa') }}</span> -->
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">手机:</label>
            <div class="layui-input-block">
              <input type="text" name="selectedlist.phone" v-model="selectedlist.phone" placeholder="请输入标题" class="layui-input resetphone">
              <!-- <input type="text" name="tell" placeholder="请输入合法手机号码" v-validate="{required: true, regex: /^(((13[0-9]{1})|(15[0-35-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/}"
                v-model="selectedlist.phone" class="layui-input resetphone"> -->
              <!-- <span class="errortip" v-show="errors.has('tell')">{{ errors.first('tell') }}</span> -->
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱:</label>
            <div class="layui-input-block">
              <input type="text" name="selectedlist.user_email" v-model="selectedlist.user_email" placeholder="请输入标题" class="layui-input resetemail">
              <!-- <input type="text" name="email1" placeholder="请输入邮箱" v-validate="'required|email'" class="layui-input resetemail" v-model="selectedlist.user_email"> -->
              <!-- <span class="errortip" v-show="errors.has('email1')">{{ errors.first('email1') }}</span> -->
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button class="layui-btn" type="button" @click="modify()">提交</button>
          </div>
        </div>
        <span class="layui-layer-setwin">
          <a class="layui-layer-min" href="javascript:;">
            <cite></cite>
          </a>
          <a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" @click="close()"></a>
        </span>
      </form>
    </div>

    <!-- 重置密码 -->
    <div class="resetpass" style="">
      <form class="layui-form" action="" style="">
        <div class="layui-form-item" style="width: 100%;margin-bottom:37px;">
          <div class="layui-layer-title" style="cursor: move;" move="ok">重置密码</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">旧密码</label>
          <div class="layui-input-inline">
            <input type="password" name="" class="form-control" style="width:150px;height:35px;margin-left:30px;">
          </div>
        </div>
        <div class="layui-form-item" style="display:flex;align-item:center;">
          <label class="layui-form-label">新密码</label>
          <div class="layui-input-inline">
            <input type="password" name="" class="form-control" style="width:150px;height:35px;margin-left:30px;;">
          </div>
        </div>
        <div class="layui-form-item" style="display:flex;align-item:center;">
          <div class="layui-input-block" style="margin-left:0">
            <button class="layui-btn" lay-submit lay-filter="*" type="button" @click="resetclose">提交</button>
          </div>
        </div>
        <span class="layui-layer-setwin">
          <a class="layui-layer-min" href="javascript:;">
            <cite></cite>
          </a>
          <a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" @click="resetclose1()"></a>
        </span>
      </form>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import domain from '../domain';
  export default {
    name: 'extendtable',
    data() {
      return {
        // 当前页数
        pageIndex: 1,
        // 每页显示条数
        pageSize: 5,
        // 渠道列表接口
        dataurl: domain.testUrl + '/index.php/Index/Ucenter/subAgent',
        // 渠道冻结/解冻接口
        reseturl: domain.testUrl + '/index.php/Index/Ucenter/changeUserStatus',
        // 编辑推广员用户信息接口 
        editurl: domain.testUrl + '/index.php/Index/Ucenter/editsubAgent',
        //  获取推广员信息接口  
        editpageurl: domain.testUrl + '/index.php/Index/Ucenter/editsubAgentdata',
        // 新增渠道接口
        addurl: domain.testUrl + '/index.php/Index/Ucenter/addsubAgent',
        // 全选
        allchecked: false,
        a: '',
        count: '',
        normal: '正常',
        unnormal: '冻结',
        status: 2,
        status1: 1,
        changetext: '',
        // 每一行的下标
        index: '',
        disabled: false,
        // 每一行的状态
        changestatus: '',
        // isShow: false,
        isActive: false,
        selectedlist: [],
        selected: -1,
        // 渲染数据表
        'btn2Text': '启用',
        'btn3Text': '编辑',
        'btn4Text': '重置密码',
        user_login: '',
        user_name: '',
        phone: '',
        slist: [],
        datalist: [],
        // 添加的数组数据绑定
        add_id: '',
        ownerid: '',
        addarr: {
          'check': 'true',
          'id': '',
          'user_login': '',
          'password': '',
          'name': '',
          'phone': '',
          'email': '',
          'logintime': '',
          'recent': '',
          'status': '',
          'color': false,
          "check": false,
          'issty1': false,
          'issty2': true,
          'disabled': false,
          'btnText': '冻结',
          'btn2Text': '启用',
          'btn3Text': '编辑',
          'btn4Text': '重置密码'
        },
        data: [],
        //  元数据
        users: [],
        id: '',
        user_status: '',
        user_id: {},
        edit_id: {},
        changeid: {},
        user_freeze: {},
        // 判断用户名是否存在  存在添加不了
        oldValue: '',
        newValue: ''
      }
    },

    computed: {　　
      pokerHistory() {　　　　
        return this.addarr.count;　　
      }
    },

    created() {
      let vm = this;
      let data = localStorage.getItem('data');
      let datalist = JSON.parse(data);
      vm.datalist = datalist;
      var user_id = {
        user_id: localStorage.getItem('user_id'),
        api_token: localStorage.getItem('api_token'),
        user_type: '2',
        user_login:'',
        user_name:'',
        phone:'',
        user_status: '',
        page: vm.pageIndex,
        per_page: vm.pageSize
      }
      vm.user_id = user_id;
      this.$http.post(this.dataurl, user_id, {
        emulateJSON: true,
        withCredentials: true
      }).then(
        res => {
           console.log(res.data);
          let listdata = res.data;
          let count = listdata.data.count;
          vm.count = count;
        }, res => {
          console.log(error)
        }
      )
    },

    methods: {
      //  点击全选
      changeState(allchecked) {
        let vm = this;
        vm.datalist.forEach(user => {
          if (allchecked === false) {
            user.check = true;
          } else {
            user.check = false;
          }
        })
      },

      // 点击编辑
      showOverlay(user, index, event) {

        let vm = this;
        if (index == 0) {
          console.log(3333);
          vm.selected = index;
          vm.selectedlist = JSON.parse(JSON.stringify(vm.datalist[index]));
          let arr = JSON.stringify(vm.selectedlist);
          let newarr = JSON.parse(arr);
          vm.user_login = JSON.stringify(newarr.user_login);
          vm.phone = JSON.stringify(newarr.phone);
          vm.user_email = JSON.stringify(newarr.user_email);
          vm.changeid = JSON.stringify(newarr.id);
          vm.isActive = true;
          var edit_id = {
            user_id: localStorage.getItem('user_id'),
            api_token: localStorage.getItem('api_token'),
            id: vm.changeid,
            user_login: vm.user_login,
            phone: vm.phone,
            user_email: vm.user_email,
            password: 123456
          }
          vm.edit_id = edit_id;
          vm.$http.post(vm.editpageurl, edit_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data)
            },
            res => {
              console.log('error')
            })
        } else {
          layer.alert('你没有权限访问', {
            icon: 5,
            title: "提示"
          });
        }



      },

      // 编辑弹框点击提交按钮 
      modify(user, index) {
        let vm = this;
        let resetname = $('.resettext').val();
        let resetphone = $('.resetphone').val();
        let resetemail = $('.resetemail').val();
        vm.$validator.validateAll().then((msg) => {
          if (msg) {
            alert('验证成功！');
            //   // 编辑后的信息更新
            Vue.set(vm.slist, this.selected, {
              'id': vm.selectedlist.id,
              'count': vm.selectedlist.count,
              'name': resetname,
              'phone': resetphone,
              'email': resetemail,
              'logintime': vm.selectedlist.logintime,
              'recent': vm.selectedlist.recent,
              'status': 'ok',
              'color': false,
              "check": false,
              'issty1': false,
              'issty2': true,
              'disabled': false,
              'btnText': '冻结',
              'btn2Text': '启用',
              'btn3Text': '编辑',
              'btn4Text': '重置密码'
            });
            Vue.set(vm.users, this.selected, {
              'id': vm.selectedlist.id,
              'count': vm.selectedlist.count,
              'name': resetname,
              'phone': resetphone,
              'email': resetemail,
              'logintime': vm.selectedlist.logintime,
              'recent': vm.selectedlist.recent,
              'status': 'ok',
              'color': false,
              "check": false,
              'issty1': false,
              'issty2': true,
              'disabled': false,
              'btnText': '冻结',
              'btn2Text': '启用',
              'btn3Text': '编辑',
              'btn4Text': '重置密码'
            });
            this.isActive = false;
          } else {
            this.$message({
              message: '填写不完整！',
              type: 'warning'
            });
          }
        })
      },
      
      add(user, index, event) {
        let vm = this;
        //  全局保存状态
        vm.changestatus = user.user_status;
        console.log(vm.changestatus);
        console.log(index);
        vm.index = index;
      },

      //  冻结
      alert: function (user, index, event) {
        let vm = this;
        vm.id = user.id;
        var a = event.currentTarget;
        var state = user.user_status;

        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          password: 123456,
          // 渠道id
          id: vm.id,
          user_status: vm.status
        };
        vm.user_id = user_id;
        layer.confirm('<input type="password"  placeholder="请输入密码">', {
          icon: 1,
          title: '提示'
        }, function (user, index, event) {
          layer.closeAll(0);
          vm.$http.post(vm.reseturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data)
              a.innerHTML = '启用';
              vm.datalist[vm.index].user_status = 2;
            }, res => {
              console.log(error)
            }
          )
        }, function () {

        });
      },
      // 启用
      use: function (user, index, event) {
        let vm = this;
        vm.id = user.id;
        var a = event.currentTarget;

        console.log(a);
        var state = user.user_status;
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          password: 123456,
          // 渠道id
          id: vm.id,
          user_status: vm.status1
        }
        vm.user_id = user_id;
        layer.confirm('<input type="password"  placeholder="请输入密码" >', {
          icon: 2,
          title: '提示'
        }, function (user, index, event) {
          layer.closeAll(0);
          vm.$http.post(vm.reseturl, user_id, {
            emulateJSON: true,
            withCredentials: true
          }).then(
            res => {
              console.log(res.data);
              a.innerHTML = '冻结';
              console.log(vm.index);
              console.log(vm.datalist[vm.index].user_status);
              vm.datalist[vm.index].user_status = 1;
              // this.datalist[index].user_status =1;
            }, res => {
              console.log(error)
            }
          )

        }, function (user, index, event) {

        });
      },


      //  添加组长按钮
      insert() {
        $('.addformbox').fadeIn(200);
        let vm = this;

      },

      // 添加组长提交事件
      submit(user, index) {
        let vm = this;
        let data = localStorage.getItem('data');
        let datalist = JSON.parse(data);
        console.log(vm.datalist);
        let add_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          user_type: '1',
          user_login: vm.addarr.count,
          user_name: vm.addarr.name,
          user_pass: vm.addarr.password,
          phone: vm.addarr.phone,
          user_email: vm.addarr.email,
          ownerid: vm.ownerid
        }
        vm.add_id = add_id;
        vm.$http.post(this.addurl, add_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(
          res => {
            console.log(res.data.message);
            if (res.data.message == "该账号已存在！") {
              console.log(666)
            } else if (res.data.message == '添加成功！') {
              $('.addformbox').fadeOut(200);
              console.log(vm.addarr);
             

            }

          }, res => {
            console.log('error')
          }
        )
      },

      // 关闭按钮
      close2() {
        $('.addformbox').fadeOut(200);
      },

      changeOverlay() {
        this.isActive = !this.isActive;
      },

      // 关闭
      close: function () {
        // $('.formbox').fadeOut(200);
        this.isActive = false;
        this.isShow = false;
        $('.resetpass').fadeOut(200);
      },

      // 重置密码
      resetclose() {
        $('.resetpass').fadeOut(200);
      },
      resetclose1() {
        $('.resetpass').fadeOut(200);
      },
      reset: function () {
        $('.resetpass').fadeIn(200);
        layui.use('form', function () {
          var form = layui.form;
          //监听提交
          form.on('submit(*)', function (data) {
            // layer.msg(JSON.stringify(data));
            $('.resetpass').fadeOut(200);
          });
        });
      },

      // 获取点击的页数
      pageChange(pageIndex) {
        let vm = this;
        vm.pageIndex = pageIndex;
        console.log(pageIndex);
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          user_type: '2',
          user_login: '',
          user_name: '',
          phone: '',
          user_status: '',
          page: vm.pageIndex,
          per_page: vm.pageSize
        }
        vm.user_id = user_id;
        this.$http.post(this.dataurl, user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(
          res => {
            console.log(res.data);
            vm.datalist = res.data.data.items;
          }, res => {
            console.log(error)
          }
        )


      },

      pageSizeChange(pageSize) {
        let vm = this;
        vm.pageIndex = 1;
        vm.pageSize = pageSize;
        // 每页显示的数目
        console.log(pageSize);
        var user_id = {
          user_id: localStorage.getItem('user_id'),
          api_token: localStorage.getItem('api_token'),
          user_type: '2',
          user_login: '',
          user_name: '',
          phone: '',
          user_status: '',
          page: vm.pageIndex,
          per_page: vm.pageSize
        }
        vm.user_id = user_id;
        this.$http.post(this.dataurl, user_id, {
          emulateJSON: true,
          withCredentials: true
        }).then(
          res => {
            console.log(res.data);
            vm.datalist = res.data.data.items;
          }, res => {
            console.log(error)
          }
        )
      },
    },

    watch: {
      datalist: {
        handler(val) {
          let vm = this;
          console.log('watch数组的变化', val);
          var i = 0
          vm.datalist.forEach(user => {
            if (user.check === true) {
              i++
            }
          })
          if (i === this.datalist.length) {
            this.allchecked = true
          } else {
            this.allchecked = false
          }
        },
        deep: true
      },
      pokerHistory(newValue, oldValue) {　　　　
        console.log(newValue, oldValue);
        let vm = this;
        vm.oldValue = oldValue;
        vm.newValue = newValue;

        　　
      }

    }
  }

</script>
<style lang='css' scoped>
  @import url('.././scss/table.css');

</style>
