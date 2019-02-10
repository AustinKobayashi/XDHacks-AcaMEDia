<template>
    <div id="labItem">
        <button class="btn btn-light" style="margin: 5px;" v-on:click="back">Go Back</button>
        <div id="profile-shelf-container" style="text-align: center; margin-top: 5%; margin-bottom: 5%;">
            <img id="profile-shelf" src="../assets/acamedia-profile.png" style="display: inline-block;">
        </div>
        <h2 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">{{lab.name}}</h2>
        <a class="btn btn-light" v-bind:href="lab.url" target="_blank" style="margin: 5px;">Visit Lab Website</a>
        <br style="clear: both;"/>
        <div id="data">
            <p>Lab Location: {{lab.location}}</p>
            <p>Principal Investigator: {{lab.person.name}} ( <a v-bind:href="'mailto:' +lab.person.email">{{lab.person.email}}</a> )</p>
            <h3 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">Recent Publications: </h3>
            <div id="articleItem" v-for="article in lab.articles">
                <p>Article Name: {{article.title}}</p>
                <p>Article Date: {{formatDate(article.date)}}</p>
                <button class="btn btn-light" style="margin: 5px;">DOI Link</button>
                <button class="btn btn-info" style="margin: 5px;">Share</button>
                <button class="btn btn-dark" style="margin: 5px;">Bookmark</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "labView",
        props: ["lab", "back"],
        methods:{
            formatDate: function (date) {
                return date.slice(0, 10);
            }
        }
    }
</script>

<style scoped>
    #labItem{
        margin: 10px;
    }
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