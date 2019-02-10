<template>
    <div id="'toolbar">
        <button v-on:click="$emit('scroll-down', 'logo')">Home</button>
        <button v-on:click="$emit('scroll-down', 'about')">About</button>
        <button v-on:click="$emit('scroll-down', 'contact')">Contact</button>
    </div>
</template>

<script>
    export default {
        name: "toolbar"
    }
</script>

<style scoped>

</style>