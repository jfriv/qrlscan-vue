<template>
  <div id="app-layout">
    <header class="app-header">
      <div class="container">
        <h1 class="app-logo">
          <router-link :to="{ name: 'latest' }">QRLscan</router-link>
        </h1>
        <div class="app-search">
          <search-bar></search-bar>
        </div>
      </div>
    </header>
    <div class="app-wrap">
      <div class="container">
        <div class="app-body-wrap">
          <div id="app-body" class="app-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import SearchBar from '@/components/SearchBar';

  Vue.component('search-bar', SearchBar);

  export default Vue.component({
    path: '/',
    name: 'Layout'
  });

</script>

<style>
  .app {}

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    clear: both;
  }

  .app-header {
    height: 65px;
    background-color: white;
    box-shadow: 0 3px 24px 0 rgba(0,0,0,.08);
  }

  .app-logo {
    float: left;
    margin: 0;
    padding: 5px 0 0 0;
    width: 255px;
    font-family: 'Press Start 2P', cursive;
    font-size: 36px;
    color: #222222;
  }
  .app-logo a,
  .app-logo a:hover,
  .app-logo a:visited,
  .app-logo a:active {
    color: black;
    text-decoration: none;
  }

  .app-search {
    margin-left:280px;
  }

  .app-wrap {
    padding: 0;
  }

  .app-menu-wrap {
    padding: 20px 0 0 0;
  }

  .app-menu {
    padding: 0;
  }

  .app-menu ul,
  .app-menu ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .app-menu ul li {
    display: inline-block;
  }

  .app-menu ul li a,
  .app-menu ul li a:visited {
    display: inline-block;
    padding: 3px 7px;
    color: #87888a;
    border-left: 3px solid transparent;
  }

  .app-menu ul li a.active,
  .app-menu ul li a:active,
  .app-menu ul li a:hover {
    display: block;
    color: #4886ff;
  }
  .app-menu ul li a.active,
  .app-menu ul li a:active {
    border-left: 3px solid #4886ff;
  }

  .app-body-wrap {
    padding: 0;
  }

  .app-body {
    padding: 15px 0;
  }

  .app-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 15px;
    word-wrap: break-word;
    background-color: white;
    background-clip: border-box;
    border-radius: 12px !important;
    box-shadow: 0 10px 20px rgba(0,0,0,.08);
    border: 1px solid #e9ecf8;
  }

  .card-title {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    color: #343a40;
  }

  .card-body {
    padding-bottom: 30px;
  }

  h2.card-title {
    font-size: 18px;
  }
  h2.card-title span {
    vertical-align: middle;
  }
  h2.card-title span.label {
    font-family: 'Press Start 2P', cursive;
    color: #222222;
  }


  .data-table table {
    font-size: 12px;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .data-table table th,
  .data-table table td {
    text-align: left;
    vertical-align: top;
  }

  .data-table table td .cell > div {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table.key-value-table th.key-col,
  table.key-value-table td.key-col,
  table.key-value-table th.value-col,
  table.key-value-table td.value-col {
    width: 150px;
  }

  table th.addr-col,
  table td.addr-col,
  table th.txhash-col,
  table td.txhash-col {
    width: 300px;
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
