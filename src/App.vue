<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import DateFilter from './filters/unixToDateFormat' // Import date

Vue.filter('unixToDate', DateFilter ); // register filter globally

const app = new Vue({
  el: '#app'
});

export default app;
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P|Space+Mono');

  body {
    margin: 0;
    padding: 0;
    background-color: #f6f7fb;
    font-family: 'Space Mono', monospace;
    font-size: 0.875rem;
    font-weight: normal;
    line-height: 1.5;
    color: #868ba1;
  }

  ::selection {
    background: #d3e0fc;
  }

  ::-moz-selection {
    background: #d3e0fc;
  }

  a {
    color: #4886ff;
    text-decoration: none;
  }

  a:hover {
    color: #4886ff;
    text-decoration: underline;
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }

  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .align-right {
    text-align: right;
  }
</style>
