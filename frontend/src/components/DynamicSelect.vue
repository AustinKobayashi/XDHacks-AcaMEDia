<template>
    <div id="DynamicSelect">
        <label for="select">{{label}}</label>
        <select id="select"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)">
            <option disabled value="">Please select one</option>
            <option v-for="option in options" v-bind:value="option">
                {{option}}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "DynamicSelect",
        props: ["label", "value", "options"]
    }
</script>

<style scoped>

</style>