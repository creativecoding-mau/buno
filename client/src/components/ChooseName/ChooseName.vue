<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
              <form action="#" class="formForm">
                  <div class="formGroup">
                      <input class="formInput" type="text" id="userName" v-model="name" v-on:keydown.enter="postName" placeholder="Name" requierd>
                      <label for="userName" class="formLabel">Name</label>
                  </div>
              </form>
      </v-flex>
      <v-flex xs12>
           <button class="submitButton" @click="postName">Submit </button>
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
        displayName: this.name,
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

.formGroup {
    margin: 1rem;
}

.formLabel {
    color: grey;
    font-size: 1.4rem;
    font-weight: 200;
    margin-right: 13rem;
    margin-top: .7rem;
    display: block;
    transition: all .4s;
    text-transform: uppercase;
}

.formInput {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: 2px;
    background-color: rgb(255, 255, 255, .2) !important;
    border-top: 2px solid #424242;
    border-bottom: 2px solid #424242;
}

.formInput:focus {
    outline: none;
    box-shadow: 0 1rem 2rem rgba(#424242, .1);
    border-bottom: 2px solid rgba(0, 132, 255, 0.8);
}


.formInput::-webkit-input-placeholder {
    color: grey;
}

.formInput:placeholder-shown + .formLabel {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-3.5rem);
}

input-internal-autofill-selected {
    background-color: rgb(255, 255, 255, .2) !important;
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