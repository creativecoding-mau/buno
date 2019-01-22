<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
            <h1 class="gameListHeader">Game servers</h1>
            <hr class="gameListLine">
            <li v-for="(game, index) in gameList" :key="index+1" class="gameList">
                {{ game }}
            </li>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
    data: function() {
        return {
            gameList: []
        }
    },

    methods: {
        requestGames() {
            console.log("Körs")
            axios.get('http://10.2.22.30:3000/listGameNames').then(response => {
                this.gameList = response.data;
            })
        },
    },

    created() {
        this.requestGames();
    }

};
</script>

<style>

    .gameListHeader {
        font-size: 2rem;
        font-weight: 300;
        text-transform: uppercase;
    }


    .gameList {
        list-style: none;
        font-size: 2rem;
    }

</style>