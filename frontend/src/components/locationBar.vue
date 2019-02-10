<template>
    <div id="locationBar">
        <label for="select">Location filter: </label>
        <select id="select"
                v-bind:value="locationSelection"
                v-on:input="$emit('updateOptions', $event.target.value)">
            <option disabled value="">Please select one</option>
            <option v-for="option in locationOptions" v-bind:value="option">
                {{option}}
            </option>
        </select>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "locationBar",
        props: ["locationSelection"],
        data: function () {
            return {
                locationOptions: {},
            }
        },
        methods: {
            populateLocationOptions: function () {
                axios.get("https://t-solstice-224300.appspot.com/location")
                    .then((response) =>{
                        this.locationOptions = {...response.data};
                    }).catch(function (Error) {
                    console.error(Error)
                })
            }
        },
        mounted () {
            this.populateLocationOptions()
        }
    }
</script>

<style scoped>

</style>