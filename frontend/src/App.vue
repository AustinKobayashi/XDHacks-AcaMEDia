<template>
  <div id="app">
    <toolbar v-on:scroll-down="switchPage"></toolbar>
    <keep-alive>
      <comment v-bind:is="currentComponent" v-bind="currentProps"></comment>
    </keep-alive>
  </div>
</template>

<script>
  import Toolbar from './components/toolbar.vue'
  import Home from "./Containers/Home";
  import Results from "./Containers/Results"
  import labView from "./Containers/labView"
  import axios from 'axios';
  const queryURL = "https://t-solstice-224300.appspot.com/query";
  const scroller = {
    methods: {
      switchPage: function (className) {
        if (this.currentComponent !== "Home"){
          this.currentComponent = "Home";
        }else{
          this.scrollToClass(className)
        }
      },
      scrollToClass: function (className) {
        // Get the first element with the given class name
        var el = this.$el.getElementsByClassName(className)[0];
        // Get the bounding rectangle so we can get the element position position
        let rect = el.getBoundingClientRect()
        // Scroll to the element (using x and y axis)
        window.scrollTo(rect.left, rect.top)
      }
    }
  };
  export default {
    name: 'app',
    mixins: [scroller],
    components: {
      Home,
      Toolbar,
      Results,
      labView
    },
    data: function () {
      return {
        currentComponent: "Home",
        queryResponse: {},
        selectedLab: {}
      }
    },
    methods: {
      getArticleData: function (query, location) {
        console.log("called")
        const cutQuery = query.split(" ").join(",");
        axios.get(queryURL, {
          params: {
            term: cutQuery,
            location: location
          }
        }).then((response) => {
          console.log("gottem");
          console.log(response);
          this.queryResponse = response.data;
          this.currentComponent = "Results"
        }).catch(function (error) {
          console.log("error..")
          console.error(error);
        })
      },
      openLabView: function (lab) {
        this.selectedLab = lab;
        this.currentComponent = "labView"
      }
    },
    computed: {
      currentProps: function () {
        if (this.currentComponent === "Home"){
          return {
            getArticleData: this.getArticleData
          }
        }else if (this.currentComponent === "labView"){
          return {
            lab: this.selectedLab,
          }
        }else{
          return {
            queryResponse: this.queryResponse,
            switchLabView: this.openLabView
          }
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
