<template>
    <div id="searchBar">
        <input v-model="searchTerm" placeholder="Enter text here">
        <button v-on:click="$emit('search', searchTerm)">Search</button>
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