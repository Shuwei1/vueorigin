<template>
  <div class="login">
    <div class="loginheader">
      <img src="../assets/logo.png" alt="" width="226" height="76">
    </div>
    <div class="loginmain">
      <div class="mainbox">
        <div class="login-r">
          <div class="loginbox">
            <div>
              <input type="text" placeholder="请输入账号" class="form-control" v-model="user_name" v-verify.grow1="user_name">
              <label v-verified="verifyError.user_name" v-bind="sas"></label>
            </div>
            <div>
              <input type="password" placeholder="请输入密码" class="form-control" v-model="password" v-verify.grow1="password">
              <label v-verified="verifyError.password"></label>
            </div>
            <div>
              <a class="btn btn-success" @click="submit();" id="index_login_btn" style="width:100%;">登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import store from '@/vuex/store';
  export default {
    name: 'login',
    data() {
      return {
        name: '',
        password: '',
        code: '',
        user_name: '',
        password: '',
        sas: '',
        loginurl: domain.testUrl + '/index.php/Index/login/login',
        login_number: 0

      }
    },
    store,
    methods: {
      submit: function () {
        var vm = this;
        if (vm.$verify.check()) {
          //通过验证  
          var admin = { user_name: vm.user_name, password: vm.password,    
           // 登录错误次数
          login_number: vm.login_number
          }
          vm.$http.post(vm.loginurl, admin, { emulateJSON: true, withCredentials: true}).then(res => {
            //  接口请求成功
            console.log(res.data);
            var code = res.data.code;
            var localname = res.data.data.user_id;
            var password = res.data.data.api_token;
            var user_pass = res.data.data.user_pass;
            // 获取用户名存储到本地
            var userlogin = res.data.data.user_login;
            var ownerid = res.data.data.ownerid;
            var loginname = localStorage.setItem('user_id', localname);
            var pass = localStorage.setItem('api_token', password);
            localStorage.setItem('user_login', userlogin);
            localStorage.setItem('user_pass', user_pass);
            localStorage.setItem('id', ownerid);
            if(code == 0){
              //  登录成功
              this.$router.push({
                path: '/index/indexrouter'
              });　
            }else{
              // 失败
              this.$router.push({ path: '/'});　
              this.$store.state.count = '';
              vm.login_number++;
            }
          }, res => {
            // 接口请求失败
            this.$router.push({path: '/'});　
            this.$store.state.count = '';
        
          })
        } else {
          if (this.user_name.length == '') {
            alert("账号不能为空")
          } else if (this.user_name.length < 5) {
            alert("账号不能小于5位")
          } else if (this.password.length == '') {
            alert("密码不能为空")
          } else if (this.password.length < 5) {
            alert("密码不能小于6位")
          } else if (this.user_name != 'admin' && this.password != '123456') {
            console.log(999999)
          } else {
            alert('通过验证');
          }
        }
      }
    },
    verify: {
      username: [
        "required",
        {
          test: function (val) {
            if (val.length < 5) {
              return false;
            }
            return true;
          },
          message: "账号不能小于5位"
        }
      ],
      password: [
        "required",
        {
          test: function (val) {
            if (val.length < 5) {
              return false;
            }
            return true;
          },
          message: "账号不能小于5位"
        }
      ]
    },
    computed: {
      verifyError: function () {
        return this.$verify.$errors;
      }
    }
  }
</script>
