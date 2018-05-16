<template>
  <div class="app-card">
    <h2 class="card-title">
      <span class="label">Block:</span>
      <span>{{block.blockNumber}}</span>
      <span>{{(block.timestamp * 1000) | unixToDate}}</span>
    </h2>
    <div>
      <router-link :to="{ name: 'block', params: { blockNum: prevBlockNum }}">prev {{prevBlockNum}}</router-link>
      &nbsp;
      <router-link :to="{ name: 'block', params: { blockNum: nextBlockNum }}">next {{nextBlockNum}}</router-link>
    </div>
    <div class="card-body">
      <div v-if="block">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="8" :span="8">
            <div>nonce: {{block.miningNonce}}</div>
            <div>reward: {{block.rewardBlock/1000000000}}</div>
            <div>fee: {{block.rewardFee}}</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :span="16">
            <div>curr: {{block.hashHeader}}</div>
            <div>prev: {{block.hashHeaderPrev}}</div>
            <div>root: {{block.merkleRoot}}</div>
            <div></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-title">
      Transactions
    </div>
    <div class="card-body data-table">
      <div class="card-body data-table">
        <el-table
          v-if="transactions"
          :data="transactions"
          class="data-table"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            label="Addresses"
            width="300">
            <template slot-scope="scope">
              <div v-bind:title="scope.row.addrFrom" class="{scope.row.addrFrom ? 'addr-from' : 'display-none'}">
                from: <router-link :to="{ name: 'addr', params: { addrHash: scope.row.addrFrom }}">{{scope.row.addrFrom}}</router-link>
              </div>
              <div v-for="(addrTo, idx) in scope.row.addrTo" v-bind:title="addrTo" class="{addrTo ? 'addr-to' : 'display-none'}">
                &nbsp;&nbsp;to: <router-link :to="{ name: 'addr', params: { addrHash: addrTo }}">{{addrTo}}</router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Tx Hash"
            width="300">
            <template slot-scope="scope">
              <div v-bind:title="scope.row.hash">
                <router-link :to="{ name: 'tx', params: { txHash: scope.row.hash }}">{{scope.row.hash}}</router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Amounts"
            width="75">
            <template slot-scope="scope">
              <div v-for="(amnt, idx) in scope.row.amount">{{amnt/1000000000}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="Fee"
            width="75">
            <template slot-scope="scope">
              <div>{{scope.row.fee/1000000000}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="nonce"
            label="Nonce">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.component('Block', {
    data() {
      return {
        loading: false,
        error: null,
        blockNum: null,
        prevBlockNum: null,
        nextBlockNum: null,
        block: {},
        transactions: []
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
        this.blockNum = this.$route.params.blockNum;
        this.prevBlockNum = null;
        this.nextBlockNum = null;
        this.block = {};
        this.transactions = [];
        this.error = null;
        this.loading = true;
        axios.get(`/v1/obj/${this.blockNum}`)
          .then(
            (rsp) => {
              this.prevBlockNum = rsp.data.block.blockHeader.blockNumber - 1;
              this.nextBlockNum = rsp.data.block.blockHeader.blockNumber + 1;
              this.block = rsp.data.block.blockHeader;
              this.transactions = rsp.data.block.transactions;
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
