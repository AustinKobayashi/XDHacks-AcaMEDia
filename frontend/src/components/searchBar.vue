<template>
    <div id="searchBar">
        <div class="input-group mb-3">
            <input v-on:keyup.enter="$emit('search', searchTerm)" type="text" class="form-control" v-model="searchTerm" placeholder="Enter keywords here">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="$emit('search', searchTerm)">Search</button>
            </div>
        </div>
        </div>
</template>

<script>
    export default {
        name: "searchBar",
        data: function() {
            return {
                searchTerm: "",
            };
        },
    }
</script>

<style scoped>

</style>