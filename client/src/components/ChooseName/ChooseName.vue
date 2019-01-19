<template>
  <div>
    <h2 class="inputText">Enter name</h2>
    <input class="nameInput" v-model="name" v-on:keydown.enter="postName" type="text" placehoder="Name">
    <button class="submitButton" @click="postName">Submit</button>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data: function() {
    return {
      name: ""
    };
  },

  methods: {
    postName() {
      console.log('Event button pressed')  
      var name = this.name;
      axios.post('http://192.168.0.49:3000/newPlayer', {userName: name})
    }
  }
};
</script>

<style scoped>

.nameInput {
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