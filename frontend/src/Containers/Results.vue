<template>
    <div id="Results">
        <h1>Results</h1>
        <div id="labItems">
            <lab-item v-bind:go-to-lab-view="goToLabView" v-for="lab in queryResponse" v-bind:lab="lab"></lab-item>
        </div>
    </div>
</template>

<script>
    import LabItem from "../components/labItem";
    export default {
        name: "Results",
        components: {LabItem},
        props: ["switchLabView", "queryResponse"],

        methods: {
            goToLabView: function (lab) {
                this.switchLabView(lab)
            }
        },
    }
</script>

<style scoped>

</style>