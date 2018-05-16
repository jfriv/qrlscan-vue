<template>
  <div class="app-card">
    <h2 class="card-title">
      <span class="label">TX:</span>
      <span>{{tx.hash}}</span>
    </h2>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :span="24">
        <div v-bind:title="tx.addrFrom" class="{tx.addrFrom ? 'addr-from' : 'display-none'}">
          from: <router-link :to="{ name: 'addr', params: { addrHash: tx.addrFrom }}">{{tx.addrFrom}}</router-link>
        </div>
        <div v-for="(addrTo, idx) in tx.addrTo" v-bind:title="addrTo" class="{addrTo ? 'addr-to' : 'display-none'}">
          &nbsp;&nbsp;to: <router-link :to="{ name: 'addr', params: { addrHash: addrTo }}">{{addrTo}}</router-link>
        </div>
        <div v-for="(amnt, idx) in tx.amount">
          amount: {{amnt/1000000000}}
        </div>
        <div>fee: {{tx.fee/1000000000}}</div>
        <div>nonce: {{tx.nonce}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.component('Transaction', {
    data() {
      return {
        loading: false,
        error: null,
        txHash: null,
        tx: {}
      }
    },
    mounted() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchBlockData();
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchBlockData'
    },
    methods: {
      fetchBlockData() {
        this.txHash = this.$route.params.txHash;
        this.tx = {};
        this.error = null;
        this.loading = true;
        axios.get(`/v1/tx/${this.txHash}`)
          .then(
            (rsp) => {
              this.tx = rsp.data;
            },
            (err) => {
              this.error = err.toString();
            }
          )
          .finally(() => {
            this.loading = false;
          });
      }
    }
  });
</script>

<style>

</style>
