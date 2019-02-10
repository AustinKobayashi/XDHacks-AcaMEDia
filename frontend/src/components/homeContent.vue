<template>
    <div id="homeContent">
        <h2> {{title}}</h2>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "homeContent",
        props: ['title'],
    }
</script>

<style scoped>

</style>