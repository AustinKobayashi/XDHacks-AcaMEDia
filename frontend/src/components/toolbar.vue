<template>
    <div id="toolbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="toolbar-button" v-on:click="$emit('scroll-down', 'home')">Home</a>
            <a class="toolbar-button" v-on:click="$emit('scroll-down', 'about')">About</a>
            <a class="toolbar-button" v-on:click="$emit('scroll-down', 'how-to')">How-To</a>
            <a class="toolbar-button" v-on:click="$emit('scroll-down', 'contact')">Contact</a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "toolbar"
    }
</script>

<style scoped>
    #toolbar{
        text-align: center;
        min-width: 100%;
        max-height: 25px;
        min-height: 25px;
        display: inline-block;
    }
    .toolbar-button {
        display: inline-block;
        padding-left: 10%;
        padding-right: 10%;
    }
</style>