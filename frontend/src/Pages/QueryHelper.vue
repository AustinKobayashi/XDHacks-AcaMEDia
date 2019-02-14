<template>
    <div style="text-align: center" id="QueryHelper">
        <h3>Add new labs and articles to the Database</h3>
        <div class="container">
            <div>
                <label>Researchers name:</label>
                <input type="text" class="form-control" v-model="researchersName" placeholder="Researchers Name"><br>
            </div>
            <div>
                <label>Lab id:</label>
                <input type="text" class="form-control" v-model="labId" placeholder="Lab Id"><br>
            </div>
        </div>
        <br>
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="submit">Submit</button>
        <br>
        <p v-if="querying">Querying... This might take a moment</p>
        <p v-bind:style="replyStyle" v-if="reply != null">Reply: {{reply}}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "QueryHelper",
        data: function () {
            return {
                labId: null,
                researchersName: null,
                reply: null,
                querying: false,
                replyStyle: "color: green"
            }
        },
        methods: {
            submit: function () {
                if (this.labId == null || this.researchersName == null) return;
                this.reply = null;
                this.querying = true;
                axios.get('https://us-central1-t-solstice-224300.cloudfunctions.net/QueryPubmed', {
                    params: {
                        term: this.researchersName,
                        lab_id: this.labId
                    }
                }).then((response) => {
                    this.querying = false;
                    this.reply = response.status;
                    this.replyStyle = "color: green"
                }, (error) => {
                    this.querying = false;
                    console.log(error);
                    this.reply = error.response.status;
                    this.replyStyle = "color: red"
                })
            }
        }
    }
</script>

<style scoped>
    .container {
      width: 100%;
        display: inline-table;
        text-align: center;
    }
    .container input {
      width: 100%;
        display: table-cell;
      clear: both;
    }
    .container label {
        display: table-cell;
    }
    .container div {
        display: table-row;
    }
    button {
        display: block;
        margin: 0 auto;
        margin-top: 15px;
    }
</style>