<template>
  <div class="search-wrapper">
    <input
      v-model="inputValue"
      v-on:keypress="onKeyPress($event)"
      placeholder="Search here by Address, Txhash, or Block"
      spellCheck="false"
    />
    <span v-bind:class="{
        'search-highlight': inputValue.length > 0,
        'search-highlight empty': inputValue.length === 0
      }">
      {{ inputValue.replace(/ /g, "\u00a0") }}
    </span>
    <button v-on:click="onClick($event)" type="submit">
      go
    </button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component('search-bar', {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    onKeyPress(e) {
      if (e.key === 'Enter') {
        this.go((this.inputValue || '').trim());
      }
    },
    onClick(e) {
      this.go((this.inputValue || '').trim())
    },
    go(val) {
      if (val.length === 0) {
        return;
      }
      let firstChar = val.charAt(0);
      let transTo = null;
      if (firstChar && firstChar.toUpperCase() === 'Q') {
        transTo = {name: 'addr', params: {addrHash: val}};
        // transTo = `/addr/${val}`;
      } else if(val.length === 64) {
        transTo = {name: 'tx', params: {txHash: val}};
        // transTo = `/tx/${val}`;
      } else if(parseInt(val) !== 0) {
        transTo = {name: 'block', params: {blockNum: val}};
        // transTo = `/block/${val}`;
      }
      if (transTo) {
        this.inputValue = '';
        this.$router.push(transTo);
      } else {
        console.log('Not a recognizable search input.');
      }
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-wrapper {
    position: relative;
    padding-right: 75px;
  }

  .search-wrapper button{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    height: 65px;
    width: 65px;
    border: 0;
    color: #555555;
    text-transform: uppercase;
    font-size: 14px;
    cursor: pointer;
  }

  .search-highlight {
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 57px;
    padding: 0 10px 0 0;
    border-top: 3px solid white;
    position: absolute;
    right: 65px;
    bottom: 0;
    max-width: 100%;
    height: 0;
    color: transparent;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
  }

  .search-wrapper input {
    display: block;
    width: 100%;
    height: 57px;
    padding: 0 10px 0 0;
    border-radius: 0;
    line-height: 57px;
    background-color: transparent;
    color: #222222;
    font-size: 16px;
    border: none;
    outline: none;
    border-top: 5px solid white;
    border-bottom: 3px solid white;
    font-family: 'Space Mono', monospace;
    text-align: right;
  }

  .search-wrapper input:focus + .search-highlight {
    border-top: 3px solid #4886ff;
  }
  .search-wrapper input:focus + .search-highlight.empty{
    border-top: 3px solid transparent;
  }


  .search-wrapper button:hover,
  .search-wrapper button:active,
  .search-wrapper input:focus + span + button {
    border: 3px solid #4886ff;
    background-color: #4886ff;
    color: #eeeeee;
  }
</style>
