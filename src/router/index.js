import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import tabledemo from '@/components/tabledemo';
import index from '@/components/index';
import indexrouter from '@/components/indexrouter';
import kokoPay from '@/components/kokoPay';
import kokoTransfer from '@/components/kokoTransfer';
import kokogame from '@/components/kokogame';
import kokoExtension from '@/components/kokoExtension';
import kokoDailysummary from '@/components/kokoDailysummary';
import kokoGamedata from '@/components/kokoGamedata';
import kokoExtendrformance from '@/components/kokoExtendrformance';
import kokoPlayermanage from '@/components/kokoPlayermanage';
import kokoPlayerlist from '@/components/kokoPlayerlist';
import kokoapplygame from '@/components/kokoapplygame';
import kokoRolesearch from '@/components/kokoRolesearch';
import kokoRegistrationsearch from '@/components/kokoRegistrationsearch';
import kokoOrdersearch from '@/components/kokoOrdersearch';
import kokoEquipmentsearch from '@/components/kokoEquipmentsearch';
import kokoGamemanage from '@/components/kokoGamemanage';
import kokoProportionsearch from '@/components/kokoProportionsearch';
import kokoAccountingcenter from '@/components/kokoAccountingcenter';
import kokoAccountingdetail from '@/components/kokoAccountingdetail';
import kokoWithdrawarecord from '@/components/kokoWithdrawarecord';
import kokoPwdchange from '@/components/kokoPwdchange';
import kokoPwdpaychange from '@/components/kokoPwdpaychange';
import kokoUserbaseinformation from '@/components/kokoUserbaseinformation';
import count from '@/components/count';
import withdraw from '@/components/withdraw';
import adv from '@/components/adv';
import personal from '@/components/personal';


Vue.use(Router);
export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },

  
    {
      path: '/table',
      name: 'tabledemo',
      component: tabledemo
    },
    {
      path: '/count',
      name: 'count',
      component: count
    },

    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/index/adv',
          name: 'adv',
          component: adv
        },
        {
          path: '/index/personal',
          name: 'personal',
          component: personal
        },
        {
          path: '/index/indexrouter',
          name: 'indexrouter',
          component: indexrouter
        },
        {
          path: '/index/kokoPay',
          name: 'kokoPay',
          component: kokoPay
        },
        {
          path: '/index/kokoTransfer',
          name: 'kokoTransfer',
          component: kokoTransfer
        },
        {
          path: '/index/kokogame',
          name: 'kokogame',
          component: kokogame
        },
        {
          path: '/index/kokoExtension',
          name: 'kokoExtension',
          component: kokoExtension
        },
        {
          path: '/index/kokoDailysummary',
          name: 'kokoDailysummary',
          component: kokoDailysummary
        },
        {
          path: '/index/kokoGamedata',
          name: 'kokoGamedata',
          component: kokoGamedata
        },
        {
          path: '/index/kokoExtendrformance',
          name: 'kokoExtendrformance',
          component: kokoExtendrformance
        },
        {
          path: '/index/kokoPlayermanage',
          name: 'kokoPlayermanage',
          component: kokoPlayermanage
        },
        {
          path: '/index/kokoRolesearch',
          name: 'kokoRolesearch',
          component: kokoRolesearch
        },
        {
          path: '/index/kokoRegistrationsearch',
          name: 'kokoRegistrationsearch',
          component: kokoRegistrationsearch
        },
        {
          path: '/index/kokoOrdersearch',
          name: 'kokoOrdersearch',
          component: kokoOrdersearch
        },
        {
          path: '/index/kokoGamemanage',
          name: 'kokoGamemanage',
          component: kokoGamemanage
        },
        {
          path: '/index/kokoEquipmentsearch',
          name: 'kokoEquipmentsearch',
          component: kokoEquipmentsearch
        },
        {
          path: '/index/kokoProportionsearch',
          name: 'kokoProportionsearch',
          component: kokoProportionsearch
        },
        {
          path: '/index/kokoAccountingcenter',
          name: 'kokoAccountingcenter',
          component: kokoAccountingcenter
        },
        //  提现路由
        {
          path: '/withdraw',
          name: 'withdraw',
          component: withdraw
        },

        {
          path: '/index/kokoAccountingdetail',
          name: 'kokoAccountingdetail',
          component: kokoAccountingdetail
        },
        {
          path: '/index/kokoWithdrawarecord',
          name: 'kokoWithdrawarecord',
          component: kokoWithdrawarecord
        },
        {
          path: '/index/kokoPwdchange',
          name: 'kokoPwdchange',
          component: kokoPwdchange
        },
        {
          path: '/index/kokoPwdpaychange',
          name: 'kokoPwdpaychange',
          component: kokoPwdpaychange
        },
        {
          path: '/index/kokoUserbaseinformation',
          name: 'kokoUserbaseinformation',
          component: kokoUserbaseinformation
        },
        {
          path: '/index/kokoPlayerlist',
          name: 'kokoPlayerlist',
          component: kokoPlayerlist
        },
        {
          path: '/index/kokoapplygame',
          name: 'kokoapplygame',
          component: kokoapplygame
        }
      ]
    },
  ]
})
