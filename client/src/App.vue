<template>
  <div id="app">
    <div class="flexContainer">
          <header-vue />
          <div class="chooseName" v-if="nameChosen === null">
             <ChooseName @nameIsChosen="setName" />
          </div>
          <div v-if="nameChosen != null">
            <game :nameChosen="nameChosen" />
          </div>
          
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import ChooseName from './components/ChooseName/ChooseName.vue'
import HeaderVue from './components/Header/Header.vue'
import Game from "./components/Game/Game.vue"

export default {
  name: 'app',
  data: function() {
    return {
      nameChosen: null,
      userGame: null,
      openGames: []
    }
  },
  components: {
    HeaderVue,
    ChooseName,
    Game
  },
  methods: {
    setName(name) {
      this.nameChosen = name
      console.log(this.nameChosen)
    },
    gameCreated(gameName) {
      this.userGame = gameName
      this.openGames.push(gameName)
    },
    listedGames(listOfGames) {
      this.openGames.push(listOfGames)
    }
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
