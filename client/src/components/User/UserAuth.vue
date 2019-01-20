<template>
    <div>
        <button @click="authUser">GET TOKEN</button>
    </div>
</template>

<style>

</style>

<script>
const firebase = require("firebase")
const axios = require("axios")

var config = {
    apiKey: "AIzaSyAxmoL08MZkiu7E3eHLpmPKDO8XJyBXuRA",
    authDomain: "buno-61925.firebaseapp.com",
    databaseURL: "https://buno-61925.firebaseio.com/",
    projectId: "buno-61925",
    storageBucket: "buno-61925.appspot.com",
    messagingSenderId: "848237437768"
  };
  firebase.initializeApp(config);


export default {
    data: function() {
        return {
            userToken: ""
        }
    },
    methods: {
        authUser() {
            axios.get("http://localhost:3000/getToken")
                .then((response) => {
                    const responseArray = [];
                    for (let key in response) { // Organizes the JSON file.
                        responseArray.push(response[key]);
                    }
                    this.userToken = responseArray[0]
                })
                firebase.auth().signInWithCustomToken(this.userToken).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                })
        }
    }
}
</script>