<template>
    <div id="locationBar">
        <label style="padding-right: 5%; font-size: 25px; text-align: center" for="select">Location filter: </label>
        <select id="select"
                class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                v-bind:value="locationSelection"
                v-on:input="$emit('updateOptions', $event.target.value)">
            <option value="">(optional)</option>
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
                axios.get("https://backend-dot-t-solstice-224300.appspot.com/location")
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