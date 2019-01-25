<template>
    <div>
        <div class="createGame">
            <game-create @gameIsCreated="gameCreated" />
          </div>
          <div>
            <game-list :openGames="openGames" />
          </div>
    </div>
</template>

<script>
import GameCreate from "./GameCreate.vue"
import GameList from "./GameList.vue"

const axios = require("axios")

export default {
    data: function() {
        return {
            openGames: []
        }
    },
    methods: {
        gameCreated(gameName) {
            this.openGames.push(gameName)
        },
        requestGames() {
            console.log("Körs")
            axios.get('http://localhost:3000/listGameNames').then(response => {
                this.openGames = response.data;
            })
            console.log(this.openGames)
        },
    },
    created() {
        this.requestGames()
    },
    props: ["nameChosen"],
    components: {
        GameCreate,
        GameList
    }
}
</script>

<style scoped>

</style>
