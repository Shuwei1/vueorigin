<template>
  <div class="box">
    <table class="layui-table">
      <colgroup>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th lay-data="{align:'center'}">标题</th>
          <th>发送时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in arr" :key="index">
          <td>{{item.post_title}}</td>
          <td>{{item.post_modified}}</td>
        </tr>
      </tbody>
    </table>
  </div>


</template>
<script>
  export default {
    name: 'personal',
    data() {
      return {
        msg: "sasas",
        arr:'',
        post_title:'',
        post_modified:'',
        post_hits:'',
        user_nicename:'',
        number:'',
        data:''
      }
    },
    created () {
        let vm=this;
        let  arr=JSON.parse(localStorage.getItem('Private_list1'));
        vm.arr=arr;

    }
  }

</script>
<style scoped>
   .box{
     padding: 100px;
   }
</style>
