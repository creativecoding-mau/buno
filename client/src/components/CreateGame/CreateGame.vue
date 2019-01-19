<template>
  <div>
    <h2 class="inputText">Create new game!</h2>
    <input class="gameInput" v-model="gameName" v-on:keydown.enter="postGame" type="text" placehoder="Game">
    <button class="submitButton" @click="postGame">Submit</button>
  </div>
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
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    
    display: block;
    margin-left: auto;
    margin-right: auto;
}

</style>