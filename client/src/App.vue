<template>
  <div id="app">
    <div class="flexContainer">
          <Header />
          <div class="chooseName" v-if="nameChosen === null">
             <ChooseName @nameIsChosen="setName" />
          </div>
          <div class="createGame" v-else-if="nameChosen != null">
            <create-game @gameIsCreated="gameCreated" />
          </div>
          <GameList />
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import ChooseName from './components/ChooseName/ChooseName.vue'
import Header from './components/Header/Header.vue'
import CreateGame from './components/CreateGame/CreateGame.vue'
import GameList from './components/GameList/GameList.vue'

export default {
  name: 'app',
  data: function() {
    return {
      nameChosen: null,
      userGame: null
    }
  },
  components: {
    Header,
    ChooseName,
    CreateGame,
    GameList,
  },
  methods: {
    setName(name) {
      this.nameChosen = name
      console.log(this.nameChosen)
    },
    gameCreated(gameName) {
      this.userGame = gameName
      console.log(this.userGame)
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
