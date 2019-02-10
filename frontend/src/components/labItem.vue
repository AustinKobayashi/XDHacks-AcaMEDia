<template>
    <div id="labItem">
        <div id="data">
            <h2 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">{{lab.name}}</h2>
            <button type="button" class="btn btn-light" v-on:click="goToLabPage">Go to Lab Profile</button>
            <p>{{lab.location}}</p>
            <div id="articleItem" v-for="article in shortenedArticleList">
                <p>Article Name: {{article.title}}</p>
                <p>Article Date: {{formatDate(article.date)}}</p>
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
            },
            formatDate: function (date) {
                    return date.slice(0, 10);
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
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding-left: 5%;
        padding-right: 5%;
        margin-bottom:5%;
    }
    #articleItem{
        background-color: #c2c4c6;
        margin: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding-left: 3%;
    }

</style>