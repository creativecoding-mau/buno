<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
            <h2 class="inputText">Enter name</h2>
      </v-flex>
      <v-flex xs12>
             <input class="nameInput" v-model="name" v-on:keydown.enter="postName" type="text" placehoder="Name">
      </v-flex>
      <v-flex xs12>
           <button class="submitButton" @click="postName">Submit</button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require("axios");
const uuidv1 = require('uuid/v1');

export default {
  data: function() {
    return {
      name: "Dipak"
    };
  },

  methods: {
    postName() {
      console.log('Name is chosen!')
      let uid = uuidv1();
      let postUser = {
        userName: this.name,
        uid: uid
      }
      console.log(postUser)  
      axios.post('http://localhost:3000/newPlayer', postUser)
      this.$emit("nameIsChosen", this.name)
    }
  }
};
</script>

<style scoped>

.inputText {
    font-size: 2rem;
    font-weight: 200;
}

.nameInput {
    color: white;
    padding: 1.2rem;
    width: 10rem;
    background-color: rgba(0, 132, 255, 0.3);
    font-size: 2.8rem;
}

.nameInput:focus {
  background-color: rgba(0, 132, 255, 0.5);
}

.submitButton {
    cursor: pointer;
    padding: 1rem;
  
}

</style>