var DatabaseHandler = require('./DatabaseHandler.js');

module.exports = class QueryEngine {

    static get_locations () {
        return new Promise ((resolve, reject) => {
            let query = 'select location from lab;';
            DatabaseHandler.query_db(query, (results) => {
                let locations = [];
                for(let i = 0; i < results.length; i++) {
                    let location = results[i].location;
                    let location_parts = location.split(',');
                    location = location_parts.splice(1, location.length - 1).toString();
                    locations.push(location);
                }
                locations = locations.filter(function(elem, pos) {
                    return locations.indexOf(elem) === pos;
                });

                resolve(locations);
            });
        });
    }


    static keyword_parser (keyword_string) {
        let keywords = keyword_string.split(',');
        for (let i = 0; i < keywords.length; i++) {
            keywords[i] = keywords[i].trim();
        }
        return keywords;
    }




    static query (keyword_string, location) {

        return new Promise ((resolve, reject) => {
            let keywords = this.keyword_parser(keyword_string);

            let labs = [];
            let articles = {};
            let people = [];
            let counter = 0;

            function callback () {
                console.log('all done');
                resolve ({});
            }

            console.log(keywords.length);

            keywords.forEach((keyword) => {

                let query = "select * from keyword inner join article_keyword on " +
                    "keyword.id = article_keyword.keyword_id inner join article on " +
                    "article_keyword.article_id = article.id inner join lab_article on " +
                    "lab_article.article_id = article.id inner join lab on " +
                    "lab.id = lab_article.article_id inner join lab_person on " +
                    "lab_person.lab_id = lab.id inner join person on " +
                    "person.id = lab_person.person_id where word = " + "\'" + keyword + "\'" + ";";

                DatabaseHandler.query_db(query, (results) => {

                    for(let i = 0; i < results.length; i++) {
                        let lab = {
                                name: results[i].lab_name,
                                location: results[i].location,
                                url: results[i].url
                            };

                        let article = {
                            title: results[i].title,
                            date: results[i].publish_date
                        };

                        let person = {
                            name: results[i].name,
                            email: results[i].email
                        };

                        // labs.indexOf(lab) === -1 ? labs.push(lab) : console.log("Lab already exists");
                        articles[lab.name] !== undefined ? articles[lab.name].push(article) : articles[lab.name] = [article];
                        // people.indexOf(person) === -1 ? people.push(person) : console.log("Person already exists");
                        // this.check_if_duplicate_lab(lab, labs) ? console.log("Lab already exists") : labs.push(lab);

                        //labs.push(lab);
                        //people.push(person);
                    }
                    counter++;
                    console.log(counter);
                    if(counter === keywords.length)
                        callback();
                });
            });
        });
    }


    static check_if_duplicate_lab (lab, labs) {
        for(let i = 0; i < labs.length; i++) {
            if(lab[i].name === lab.name) {
                return true;
            }
        }

        return false;
    }
};