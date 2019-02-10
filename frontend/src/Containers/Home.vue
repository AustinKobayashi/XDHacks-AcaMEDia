<template>
    <div class="home" id="home">
        <img class="logo" alt="acaMEDia logo" src="../assets/logo.png">
        <search-bar v-on:search="searchHandler"></search-bar>
        <location-bar v-on:updateOptions="updateLocationHandler"></location-bar>
        <homeContent class="about" title="About">
            <div>
                <p>
                    acaMEDia is a vue.js-based webapp geared towards undergraduate and graduate Science students
                    looking to gain more knowledge about current medical research papers and the flourishing scientific
                    laboratories conducting the research. The world of scientific academia can be daunting to traverse,
                    with many laboratories around the world and individual laboratory websites to explore.
                </p>
            </div>
            <div>
                <p>
                    Whether it's an undergraduate student looking to kickstart their lifelong passion in a scientific
                    specialization or it's a graduate student looking to contribute towards a lab with publications
                    that align to their interests, we are confident that acaMEDia can help bridge the gap and bring
                    more young minds in contact with medical research.
                </p>
            </div>
            <div>
                <p>
                    A user can access the home page and enter keywords for their interested field of study in the search bar,
                    optionally also entering a location filter for country and city of potential lab results. Upon starting the search,
                    the user will be directed to a page of search results comprised of labs with the most publications related to their search query,
                    and the user may read more about the lab and its research by clicking on the result name. The user can then access the lab profile,
                    which consists of recent publications, the lab's website, and the lab's focus.
                </p>
            </div>
        </homeContent>
        <homeContent class="contact" title="Contact">
            <div>
                <p>
                    Created by <a href="https://www.linkedin.com/in/allison-chiang">Allison Chiang</a>, <a href="https://www.linkedin.com/in/austinkobayashi">Austin Kobayashi</a>  and <a href="https://www.linkedin.com/in/giulio-rossi-662152110">Giulio Rossi</a>
                </p>
            </div>
        </homeContent>
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

</style>