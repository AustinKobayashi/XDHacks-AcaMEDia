<template>
    <div id="Results">
        <button class="btn btn-light" style="margin: 10px; margin-top: 20px" v-on:click="back">Go Back</button>
        <div id="results-shelf-container" style="text-align: center; margin-top: 5%;">
            <img id="results-shelf" src="../assets/acamedia-results.png" style="display: inline-block;">
        </div>
        <div id="labItems">
            <lab-item v-bind:go-to-lab-view="goToLabView" v-for="lab in queryResponse" v-bind:lab="lab"></lab-item>
            <div style="text-align: center" v-if="!queryResponse || queryResponse.length <=0">
                <img id="no-results-octocat" src="../assets/404-octocat.png">
                <h2>No results! Try again please :(</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import LabItem from "../components/labItem";
    export default {
        name: "Results",
        components: {LabItem},
        props: ["switchLabView", "queryResponse", "back"],

        methods: {
            goToLabView: function (lab) {
                this.switchLabView(lab)
            }
        },
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #no-results-octocat{
        display: inline-block;
        height: 300px;
        x-transition: all 1.5s ease-in-out;
        animation: aniside 2.5s infinite;
    }
    @keyframes aniside {
        0% {
            transform: rotate(180deg);
        }
        50% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-180deg);
        }
    }

</style>