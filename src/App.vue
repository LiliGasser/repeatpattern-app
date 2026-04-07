<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from './views/Dashboard.vue'
</script>

<style>
/* Global styles that apply to the entire app */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
               Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;   /* for dropdown, etc. names (or colors not otherwise defined?) */
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>