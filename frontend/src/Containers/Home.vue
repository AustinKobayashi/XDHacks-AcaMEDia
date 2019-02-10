<template>
    <div class="home" id="home">
        <div class="container" id="header-container">
            <div id="posty-container">
                <img class="posty" id="blue-posty" src="../assets/blue-posty.png"/>
                <img class="posty" id="yellow-posty" src="../assets/yellow-posty.png"/>
                <img class="posty" id="orange-posty" src="../assets/orange-posty.png"/>
            </div>
            <img id="header-img" class="logo" alt="acaMEDia logo" src="../assets/acamedia-header.png">
            <div id="stuff-on-header-img">
                <search-bar v-on:search="searchHandler"></search-bar>
                <location-bar v-on:updateOptions="updateLocationHandler"></location-bar>
            </div>
        </div>

        <homeContent class="about" style="margin-top: 20%; margin-left: auto; margin-right: auto;" title="About">
            <div id="about-stuff">
                <div class="about-row-container">
                    <div id="about-one">
                        <h2 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">what is acaMEDia?</h2>
                        <p>
                            acaMEDia is a vue.js-based webapp geared towards undergraduate and graduate Science students
                            looking to gain more knowledge about current medical research papers and the flourishing scientific
                            laboratories conducting the research.
                        </p>
                        <p>
                            The world of scientific academia can be daunting to traverse,
                            with many laboratories around the world and individual laboratory websites to explore.
                        </p>
                    </div>
                    <div id="chair-container">
                        <img id="chair" src="../assets/acamedia-chair.png">
                    </div>
                </div>
                <br style="clear: both;"/>
                <div id="about-two">
                    <h2 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">how can acaMEDia be useful?</h2>
                    <p>
                        Whether it's an undergraduate student looking to kickstart their lifelong passion in a scientific
                        specialization or it's a graduate student looking to contribute towards a lab with publications
                        that align to their interests, we are confident that acaMEDia can help bridge the gap and bring
                        more young minds in contact with medical research.
                    </p>
                </div>
                <br style="clear: both;"/>
                <div id="about-three">
                    <h2 style="color: #4886ca; font-family: Marion, 'Times New Roman', Serif; font-weight: bold; ">can this idea be extended further?</h2>
                    <p>
                        Of course! The construction and design we put into acaMEDia can be applied to other fields, not just medical research.
                        There is immense opportunity to extend our system design to fields in academia, from Anthropology to Zoology.
                        Use our cloud based webapp to reach for the sky (pun intended)!
                    </p>
                </div>
            </div>
            <div class="container" id="bottom-shelf-container">
                <img id="bottom-shelf-img" class="logo" alt="acaMEDia logo" src="../assets/acamedia-bottom-shelf.png">
            </div>
            <br style="clear: both;"/>
        </homeContent>
        <homeContent class="how-to" style="margin-top: 20%; margin-left: auto; margin-right: auto;" title="How-To">
            <br style="clear: both;"/>
            <div id="how-to-use">
                <p>
                    A user can access the home page and enter keywords for their interested field of study in the search bar,
                    optionally also entering a location filter for country and city of potential lab results.
                </p>
                <p>
                    Upon starting the search,
                    the user will be directed to a page of search results comprised of labs with the most publications related to their search query,
                    and the user may read more about the lab and its research by clicking on the result name.
                </p>
                <p>
                    The user can then access the lab profile,
                    which consists of recent publications, the lab's website, and the lab's focus.
                </p>
            </div>
            <div id="octocat-container">
                <img id="octocat" src="../assets/acamedia-octocat.png">
            </div>
            <br style="clear: both;"/>
        </homeContent>
        <homeContent class="contact" style="margin-top: 20%; margin-left: auto; margin-right: auto;" title="Contact">
            <div class="contact-creator">
                <a href="https://www.linkedin.com/in/allison-chiang" target="_blank">
                    <p class="creator-name">Allison Chiang</p>
                <div class="creator-image-container">
                        <img left class="creator-image" id="AC" left src="../assets/Allison.jpg" alt="Allison Chiang"/>
                </div>
                </a>
            </div>
            <div class="contact-creator">
                <a href="https://www.linkedin.com/in/austinkobayashi" target="_blank">
                    <p class="creator-name">Austin Kobayashi</p>
                    <div class="creator-image-container">
                            <img right class="creator-image" id="AK" src="../assets/Austin.jpg" alt="Austin Kobayashi"/>
                    </div>
                </a>
            </div>
            <div class="contact-creator">
                <a href="https://www.linkedin.com/in/giulio-rossi-662152110" target="_blank">
                    <p class="creator-name">Giulio Rossi</p>
                    <div class="creator-image-container">
                            <img center class="creator-image" id="GR" src="../assets/Giulio.jpeg" alt="Giulio Rossi"/>
                    </div>
                </a>
            </div>
        </homeContent>
        <div style="text-align: center;">
            <div id="beaker-container">
                <img id="beaker" src="../assets/acamedia-beaker.png">
            </div>
            <br style="clear: both;"/>
            <a href="/#" class="btn btn-outline-secondary" style="display: inline-block; margin: 10px;">Back To Top</a>
            <br style="clear: both;"/>
            <p> Copyright (c) acaMEDia 2019   ||   Made with love in Vancouver, BC </p>
        </div>
    </div>
</template>

<script>
    import homeContent from "../components/homeContent";
    import SearchBar from "../components/searchBar";
    import LocationBar from "../components/locationBar";
    export default {
        name: "home",
        props: ["getArticleData"],
        components: {LocationBar, SearchBar, homeContent},
        methods: {
            searchHandler(searchTerm){
                this.getArticleData(searchTerm, this.locationOption)
            },
            updateLocationHandler(selectedOptions){
                this.locationOption = selectedOptions
            },
        },
        data: function () {
            return {
                locationOption: null
            }
        },
    }
</script>

<style scoped>
    .home{
        background-color: #d8e5f8;
        color: #6c6c77;
        padding: 20px;
    }
    #header-container{
        position:relative;
        margin-top: 2%;
    }
    #header-img, #bottom-shelf-img{
        width:100%;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    #stuff-on-header-img{
        position: absolute;
        bottom: 10px;
        width: 70%;
    }
    #bottom-shelf-container{
        position: inherit;
    }
    #about-one {
        margin: 70px;
        width: 30%;
        margin-left: 20%;
        float: left;
        height: auto;
    }
    #chair-container{
        width: 40%;
        float: right;
        padding: 2px;
        position: relative;
    }
    #chair{
        height: 300px;
        position: absolute;
        left: 0;
        x-transition: all 1.5s ease-in-out;
        animation: aniside 2.5s infinite;
    }

    @keyframes aniside {
        0% {
            left: 0;
        }
        50% {
            left: 80px;
        }
        100% {
            left: 0;
        }
    }
    #beaker-container{
        width: 40%;
        display: inline-block;
        margin-top: 40px;
    }
    #beaker{
        max-height: 250px;
    }
    @keyframes aniup {
        0% {
            top: 0;
        }
        50% {
            top: 50px;
        }
        100% {
            top: 0;
        }
    }
    #about-two {
        display: inline-block;
        margin-top: 20%;
        width: 40%;
        height: auto;
    }
    #about-three {
        display: inline-block;
        margin-top: 5%;
        width: 40%;
        height: auto;
    }
    #how-to-use {
        display: inline-block;
        margin: 70px;
        width: 40%;
        clear: right;
        height: auto;
    }
    #octocat-container{
        width: 40%;
        float: right;
        padding: 2px;
        position: relative;
    }
    #octocat{
        height: 400px;
        position: absolute;
        margin-left: -15%;
        left: 0;
        x-transition: all 1.5s ease-in-out;
        animation: aniup 2.5s infinite;
    }
    .about, .how-to, .contact {
        position: relative;
        width: 100%;
        text-align: center;
    }
    .about {
        margin-bottom: 20%;
    }.contact-creator{
        display: inline-block;
    }
    .creator-name{
        color: #4886ca;
        font-family: Marion, 'Times New Roman', Serif;
        font-weight: bold;
        transition: 0.3s;
    }
    .creator-image-container{
        width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
        margin: 20px;
    }
    .creator-image{
        max-width: 250px;
        transition: 0.3s;
    }
    .creator-image:hover{
        max-width: 300px;
        transition: 0.3s;
    }
    #posty-container{
        text-align: right;
        height: 100px;
    }
    #yellow-posty{
        margin-right: 3%;
        x-transition: all 3s ease-in-out;
        animation: aniposty 5.1s infinite;
    }
    #orange-posty {
        margin-right: 15%;
    }
    #blue-posty{
        float:left;
        margin-left: 5%;
        x-transition: all 3s ease-in-out;
        animation: aniposty 5.1s infinite;
    }
    @keyframes aniposty {
        0% {
            margin-top: 0px;
        }
        50% {
            margin-top: 5%;
        }
        100% {
            margin-top: 0px;
        }
    }


</style>