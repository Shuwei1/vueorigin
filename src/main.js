    // The Vue build version to load with the `import` command
    // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
    import Vue from 'vue';
    import App from './App';
    import Vuex from 'vuex'
    import store from './vuex/store'
    import router from './router'
    import ElementUI from 'element-ui';
    import $ from 'jquery';
    import VueResource from 'vue-resource';
    import verify from "vue-verify-plugin";
    import 'element-ui/lib/theme-chalk/index.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'lib-flexible';
    // 引入echarts
    import echarts from 'echarts';
    // 引入样式 
    import 'vue-easytable/libs/themes-base/index.css';
    // 导入 table 和 分页组件
    import {
      VTable,
      VPagination
    } from 'vue-easytable';
    // 引入表单验证插件
    import VeeValidate from 'vee-validate';
    import zh_CN from 'vee-validate/dist/locale/zh_CN';
    import VueI18n from 'vue-i18n';
    import crypto from 'crypto';
    import domain from './domain.js';
    import Clipboard from 'clipboard'; 
    global.domain = domain;


    // 注册到全局
    Vue.component(VTable.name, VTable)
    Vue.component(VPagination.name, VPagination)
    Vue.prototype.Clipboard=Clipboard;
    Vue.prototype.$echarts = echarts;
    Vue.config.productionTip = true;


    Vue.use(Vuex);
    Vue.use(verify);
    Vue.use(ElementUI);
    Vue.use(VueResource);
    Vue.use(VueI18n);


    Vue.http.options.xhr = {
      withCredentials: true
    };

    // Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next) => {
      // ...
      // 请求发送前的处理逻辑
      // ...
      // console.log(666);
      // request.credentials = true;
      next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        // console.log(888);
        return response
      })
    })

    const i18n = new VueI18n({
      locale: 'zh_CN',
    })


    Vue.use(VeeValidate, {
      i18n,
      i18nRootKey: 'validation',
      dictionary: {
        zh_CN
      }
    });
    new Vue({
      el: '#app',
      router,
      components: {
        App
      },
      template: '<App/>'
    })
