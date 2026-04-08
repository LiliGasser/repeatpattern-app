<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script setup>
import Dashboard from './views/Dashboard.vue'
</script>

<style>
/* CSS Variables for consistent styling */
:root {
  /* Colors */
  --element-color: #000000;
  --element-color-hover: #0052cc; /* TODO adjust */
  --text-color: #000000;
  --text-color-secondary: #ffffff;
  --background-color: #f5f5f5;
  --background-color-secondary: #ffffff;
  --error-color: #d63031;
  
  /* Borders */
  --border-color: #ccc;
  --border-color-hover: #999;
  --border-color-focus: #000000;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  
  /* Effects */
  --focus-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* Spacing */
  --control-padding: 0.5rem;
  --control-gap: 1rem;
  
  /* Typography */
  --h1-font-size: 2.5rem;
  --h1-font-weight: 500rem;
  --control-font-size: 0.95rem;
  --label-font-size: 0.9rem;
  --label-font-weight: 500;
}

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
  color: var(--text-color);
  min-height: 100vh;
  background-color: var(--background-color);
}
</style>