<template>
  <div class="take">
    <nav class="breadcrumb">
      <div class="lnav">
        <span>
          <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i> 财务管理</span>
        <span class="c-gray en">&gt;</span>
        结算中心
        <span class="c-gray en">&gt;</span>
        提现
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
          <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div style="width:100%;height:55px;"></div>
    <article class="cl">
      <form action="/agent_new.php/Agent/Settle/withdraw" method="post" class="form form-horizontal">
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3 text-right">账户余额：</label>
          <div class="formControls col-xs-8 col-sm-9 text-left">
            <label class="">
              <b>237.92</b>元</label>
          </div>
        </div>
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3  text-right">手机号码：</label>
          <div class="formControls col-xs-8 col-sm-9 text-left">
            <label>
              <i>13682495736</i>
            </label>
          </div>
        </div>
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3 text-right">银行账户：</label>
          <div class="formControls col-xs-8 col-sm-9 text-left">
            <label>
              <i>6225056411687316351</i>
            </label>
            <a class="modification-btn">修改</a>
          </div>
        </div>
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3 text-right">输入提现金额：</label>
          <div class="formControls col-xs-8 col-sm-1 text-left">
            <input type="text"  class="form-control inline" onkeyup="calcFee(this)"  v-validate="{ required: true, regex: /^\d{2,}$/ }"  onblur="setAmount(this)" placeholder="请输入提现金额" id="amount"
              name="amount"> </div>
            <span class="errortip" v-show="errors.has('amount')">{{ errors.first('amount') }}</span>
              
          <div id="error-amount" style="margin-bottom:0px;"></div>
        </div>
        <div class="row cl dourow">
          <label class="form-label col-xs-4 col-sm-3 text-right">提现手续费：</label>
          <div class="formControls col-xs-8 col-sm-9 text-left">
            <label>
              <b id="withdraw_fee">0.00</b>元</label>
          </div>
        </div>
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3 text-right">实际提现金额：</label>
          <div class="formControls col-xs-8 col-sm-9 text-left">
            <label>
              <b id="real_money">0.00</b>元</label>
          </div>
        </div>
        <div class="row cl">
          <label class="form-label col-xs-4 col-sm-3 text-right">支付密码：</label>
          <div class="formControls col-xs-8 col-sm-3 text-left">
            <input type="password"   v-validate="{ required: true, regex: /^^[0-9]{6,16}$|^[a-zA-Z]{6,16}$$/ }" class="form-control inline" value="" placeholder="6-16为数字或字母" id="password" name="password"> 
            <span class="errortip" v-show="errors.has('password')">{{ errors.first('password')}}</span>
            
            </div>
        </div>
        <div class="row cl" style="height:auto;">
          <label class="form-label col-xs-4 col-sm-3"></label>
          <div class="formControls col-xs-8 col-sm-3 text-left announcement">
            <p class="text-left" style="color:red;font-weight:700;margin-bottom:10px">尊敬的合作伙伴：</p>
            <p style="text-indent:2em">您好，为了给您提供更安全、更高效、更专业、更贴心的服务，创造一个公平有序的交易环境。</p>
            <p  style="text-indent:2em">即日起，我们将收取适当的提现服务费，提现服务首次免费，超出部分次数，提现服务费在申请金额中扣除。</p>
            <p>提现服务费收取规则为：</p>
            <p  style="text-indent:2em">1、每个用户在自然日中首次提现免费，提现金额无限制；</p>
            <p  style="text-indent:2em">2、超过次数部分收费：任意提现方式须支付提现额度的1%作为提现手续费。最低2元（不足2元按2元计算）；</p>
            <p  style="text-indent:2em">3、提现时间09:00-24:00，申请提现后24小时到账；</p>

            <p>感谢您的支持，有问题请及时咨询页面咨询客服，我们将会在第一 时间解答您的问题。</p>
            <p>真诚感谢您对我们工作一如既往的支持!</p>

          </div>
        </div>

        <div class="">
          <div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3 text-left">
            <input class="btn btn-primary radius " type="button" value="提交"  @click="submit()"> </div>
        </div>
      </form>
    </article>





  </div>
</template>
<script>
  export default {
    name: 'withdraw',
    data() {
      return {
        msg: "sasasas"
      }
    },
    methods: {
      submit(){
        let vm = this;
        vm.$validator.validateAll().then((msg) => {
          if (msg) {
            alert('验证成功！');
             this.$router.push({path: '/'});
          } else {
            this.$message({
              message: '填写不完整！',
              type: 'warning'
            });
          }
        })
      }
    }
  }

</script>
<style scoped>
  @import url('../scss/take.css');

</style>
