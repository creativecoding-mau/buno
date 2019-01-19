<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
            <h2 class="inputText">Create new game!</h2>
      </v-flex>
      <v-flex xs12>
             <input class="gameInput" v-model="gameName" v-on:keydown.enter="postGame" type="text" placehoder="DankGamez">
      </v-flex>
      <v-flex xs12>
               <button class="submitButton" @click="postGame">Create Game</button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  data: function() {
    return {
      gameName: ""
    };
  },

  methods: {
    postGame() {
      console.log('Game Created')
      axios.post('http://192.168.0.49:3000/createGame', {gameName: this.gameName})
      this.$emit("gameIsCreated", this.gameName)
    }
  }
};
</script>

<style scoped>

.gameInput {
    padding: 1.2rem;
    width: 10rem;
    background-color: grey;
    font-size: 2.8rem;
}

.submitButton {
    cursor: pointer;
    padding: 1rem;
}

</style>