<script setup>
import AppHeader from './components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';
</script>

<template>
  <div>
    <AppHeader/>
      <main>
        <RouterView />
      </main>
    <AppFooter/>
  </div>
</template>

<style lang="scss" >
html {
    background-image: linear-gradient(90deg, #150d58 7%, black);
    font-family: "M PLUS Rounded 1c";
}

main {
    width: 100%;
    position: absolute;
    z-index: 1;
    padding-bottom: 75px;
}

</style>