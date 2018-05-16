import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout.vue';
import Latest from '@/components/Latest.vue';
import Block from '@/components/Block.vue';
import Address from '@/components/Address.vue';
import Transaction from '@/components/Transaction.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          name: 'latest',
          path: 'latest',
          alias: '',
          component: Latest
        },
        {
          name: 'block',
          path: 'block/:blockNum',
          component: Block
        },
        {
          name: 'addr',
          path: 'addr/:addrHash',
          component: Address
        },
        {
          name: 'tx',
          path: 'tx/:txHash',
          component: Transaction
        },
      ]
    },
  ],
});
