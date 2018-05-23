<template>
  <div class="pagePwdchange">
    <nav class="breadcrumb">
      <div class="lnav">
        <span> <i class="layui-icon" style="font-size: 20px; color:#1E9FFF;">&#xe68e;</i>  首页</span>
        <span class="c-gray en">&gt;</span>
        安全管理
        <span class="c-gray en">&gt;</span>
       修改密码
      </div>
      <div class="rnav">
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.reload()"
          title="刷新">
         <i class="layui-icon" style="color:white">&#x1002;</i>
        </a>
      </div>
    </nav>
    <div class="clesrfix" style="width:90%;height:55px;margin-bottom:100px;"></div>
     <div class="resetpass" style="">
      <form class="layui-form" action="" style="">
        <div class="layui-form-item">
          <label class="layui-form-label"><span class="c-red" style="color:red">*</span>旧密码:</label>
          <div class="layui-input-inline">
            <input type="password" name="" class="form-control" style="width:300px;height:35px;margin-left:30px;">
          </div>
        </div>
        <div class="layui-form-item" style="display:flex;align-item:center;">
          <label class="layui-form-label"><span class="c-red" style="color:red">*</span>新密码:</label>
          <div class="layui-input-inline">
            <input type="password" name=""  class="form-control"  style="width:300px;height:35px;margin-left:30px;">
          </div>
        </div>
        <div class="layui-form-item" style="display:flex;align-item:center;">
          <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="*">提交</button>
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
  </div>



</template>

<script>
  export default {
    name: 'kokoPwdchange',
    data() {
      return {
        msg: 'kokoPwdchange'
      }
    }
  }

</script>
<style scoped>
  @import url('../scss/pwd.css');
</style>
