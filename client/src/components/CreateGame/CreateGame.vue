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
      axios.post('http://10.2.22.30:3000/createGame', {gameName: this.gameName})
      this.$emit("gameIsCreated", this.gameName)
    }
  }
};
</script>

<style scoped>

.inputText {
    font-size: 2rem;
    font-weight: 200;
}

.gameInput {
    color: white;
    padding: 1.2rem;
    width: 20rem;
    background-color: rgba(0, 132, 255, 0.3);
    font-size: 2.8rem;
}

.nameInput:focus {
  background-color: rgba(0, 132, 255, 0.5);
}

.submitButton {
    font-size: 1.6rem;
    font-weight: 400;
    cursor: pointer;
    padding: 1.2rem;
    border: 1px solid rgba(0, 132, 255, 0.3);
    transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.submitButton:hover {
  background-color: rgba(0, 132, 255, 0.8);
  color: white;
}

</style>