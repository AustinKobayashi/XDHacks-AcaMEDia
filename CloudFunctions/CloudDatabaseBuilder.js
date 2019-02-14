var fs = require('fs');
const https = require('https');
var KeywordExtractor = require('./KeywordExtractor.js');
var DatabaseHandler = require('./DatabaseHandler.js');
var parseString = require('xml2js').parseString;
var request = require('request');
var async = require("async");


class DatabaseBuilder {

    static query_pubmed (query_term, lab_id, callback) {
        const baseUrl = "https://us-central1-t-solstice-224300.cloudfunctions.net/InsertPubmedArticles";
        this.get_pubmed_ids(query_term).then((ids) => {
            let Promises = [];
            console.log("ID count: " + Object.keys(ids).length);
            ids.forEach((id) => {
                Promises.push(new Promise((resolve, reject) => {
                    let queryURL = baseUrl + "?id=" + id + "&lab_id=" + lab_id;
                    https.get(queryURL, (res ) => {
                        if (res.statusCode === 200){
                            console.log("Accepted code for id: " + id + " With code: " + res.statusCode);
                            resolve(0)
                        }else{
                            console.log("Rejected code from id: " + id + " With code: " + res.statusCode);
                            reject(id)
                        }
                    })
                }));
            });
            Promise.all(Promises).then(() => {
                console.log("No errors found for some reason")
                callback(0);
            }, (data) => {
                console.log("Data from reject: " + data.toString());
                let failcount = 0;
                for (item in data) {
                    console.log("item: " + item);
                    failcount += item;
                }
                console.log("Fail couunt: " + failcount);
                // callback(failcount);
            });
        }, (e) => {
            console.log("Rejected pubmed because of error: " + e);
            callback(-1)
        });
    }
    static get_and_insert_articles (id, lab_id, callback) {
        if(id) {
            this.get_pubmed_article(id).then((data) => {
                console.log("Inserting article:" + data.article.title);
                new Promise((resolve, reject) => {
                    let add_article_query = "insert ignore into article (title, publish_date) values (" +
                        "\'" + data.article.title + "\', " + "\'" + data.article.date.toJSON().slice(0, 10) + "\'" + ");";
                    DatabaseHandler.query_db(add_article_query, () => {
                        let get_article_id_query = "select id from article where title = " + "\'" + data.article.title + "\';";
                        DatabaseHandler.query_db(get_article_id_query, (results) => {
                            let article_id = results[0].id;
                            let add_lab_article = 'insert ignore into lab_article (lab_id, article_id) values (' + lab_id + ',' + article_id + ');';
                            DatabaseHandler.query_db(add_lab_article, () => {
                                resolve(true)
                            });
                        });
                    });
                }).then(() => {
                    let Promises = [];
                    data.keywords.forEach((keyword) => {
                        const promise = new Promise((resolve, reject) => {
                            let add_keyword_query = "insert ignore into keyword (word) values (" + "\'" + keyword + "\');";
                            DatabaseHandler.query_db(add_keyword_query, () => {
                                let get_keyword_id_query = "select id from keyword where word = '" + keyword + "\';";
                                DatabaseHandler.query_db(get_keyword_id_query, (results) => {
                                    let keyword_id = results[0].id;

                                    let get_article_id_query = "select id from article where title = " + "\'" + data.article.title + "\';";
                                    DatabaseHandler.query_db(get_article_id_query, (results) => {
                                        let article_id = results[0].id;
                                        let add_article_keyword_query = 'insert ignore into article_keyword (article_id, keyword_id) values (' + article_id + ',' + keyword_id + ');';
                                        DatabaseHandler.query_db(add_article_keyword_query, () => {
                                            resolve()
                                        });
                                    });
                                })
                            })
                        });
                        Promises.push(promise);
                    });
                    Promise.all(Promises).then(() => {
                        console.log("All promises complete for article: " + data.article.title);
                        callback(true);
                    })
                });
                }, (e) => {
                console.log("Failed to get article from pubmed because of: " + e);
                callback(false);
            });
        }
    }


    static get_pubmed_ids(query_term) {
        let query = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=" + query_term + "&api_key=bcca0f4e17fbc99b5040457f23f2a9056a08";
        return new Promise((resolve, reject) => {
            https.get(query, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    parseString(data, (err, result) => {
                        // console.dir(result);
                        resolve(result.eSearchResult.IdList[0].Id);
                    });
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        });
    }


    static get_pubmed_article(id) {
        let query = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id=" + id + "&api_key=bcca0f4e17fbc99b5040457f23f2a9056a08";
        return new Promise((resolve, reject) => {
            request(query, (error, response, body) => {
                let title = "";
                let date;

                try {
                    let article_json = JSON.parse(body);
                    title = article_json.result[id].title.replace(/[.,\\\/#!$%\'\"\^&\*;:{}=\-_`~()]/g,"");
                    date = new Date(article_json.result[id].epubdate);
                } catch (e) {
                    reject(e);
                }
                let abstract_query = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=text&rettype=abstract&id=" + id + "&api_key=bcca0f4e17fbc99b5040457f23f2a9056a08";

                request(abstract_query, (error, response, body) => {
                    KeywordExtractor.get_keywords_from_text(body).then((keywords) => {
                        let data = {
                            article: {
                                title: title,
                                date: date
                            },
                            keywords: keywords
                        };
                        resolve(data);
                    });
                });
            });
        });
    }
}

module.exports = DatabaseBuilder;









