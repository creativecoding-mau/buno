<template>
  <div id="app">
    <div class="flexContainer">
          <Header />
          <ChooseName />
    </div>
  </div>
</template>

<script>
import ChooseName from './components/ChooseName/ChooseName.vue'
import Header from './components/Header/Header.vue'

export default {
  name: 'app',
  components: {
    Header,
    ChooseName,
  }
}
</script>

<style>

html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Alegreya Sans SC', sans-serif;

  display: flex;
  flex-direction: column;
  text-align: center;
}

.flexContainer {
    flex: 1 0 auto;
}
</style>
