<template>
    <div id="labItem">
        <div id="data">
            <h2 style="color: blue" v-on:click="goToLabPage">{{lab.name}}</h2>
            <p>Lab Location: {{lab.location}}</p>
            <div id="articleItem" v-for="article in shortenedArticleList">
                <p>Article Name: {{article.title}}</p>
                <p>Article Date {{article.date.toString()}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "labItem",
        props:["lab", "goToLabView"],
        methods: {
            goToLabPage: function () {
                this.goToLabView(this.lab)
            }
        },
        computed: {
            shortenedArticleList: function () {
                return this.lab.articles.slice(0, 3);
            }
        }
    }
</script>

<style scoped>
    #data{
        border: 2px solid black;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding-left: 5%;
        margin-bottom:5%;
    }
    #articleItem{
        border: 2px solid red;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding-left: 5%;
    }

</style>