<template>
  <div>
    <h2 class="title">
      <span class="label">Addr:</span>
      <span>{{addr.address}}</span>
    </h2>
    <div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :span="24">
          <div>
            balance: {{addr.balance/1000000000}}
          </div>
          <div>nonce: {{addr.nonce}}</div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <strong>Transactions ({{(addr.transactionHashes || []).length}}):</strong>
        <table class="table">
          <tbody>
          <tr>
            <td>
              <div v-for="(txHash, idx) in addr.transactionHashes">
                <router-link :to="{ name: 'tx', params: { txHash: txHash }}">{{txHash}}</router-link>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.component('Address', {
    data() {
      return {
        loading: false,
        error: null,
        addrHash: null,
        addr: {},
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
        this.addrHash = this.$route.params.addrHash;
        this.addr = {};
        this.error = null;
        this.loading = true;
        axios.get(`/v1/addr/${this.addrHash}`)
          .then(
            (rsp) => {
              this.addr = rsp.data;
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
