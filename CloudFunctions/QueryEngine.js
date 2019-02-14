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
            let people = {};
            let counter = 0;

            function callback () {
                let data = [];
                for(let i = 0; i < labs.length; i++) {
                    data.push({
                       name: labs[i].name,
                       location: labs[i].location,
                       url: labs[i].url,
                       articles: articles[labs[i].name],
                       person: people[labs[i].name]
                    });
                }
                resolve (data);
            }

            console.log(keywords.length);

            keywords.forEach((keyword) => {

                let query = "select article.title, article.publish_date, lab.lab_name, lab.location, lab.url, " +
                    "person.name, person.email from keyword inner join article_keyword on " +
                    "keyword.id = article_keyword.keyword_id inner join article on " +
                    "article_keyword.article_id = article.id inner join lab_article on " +
                    "lab_article.article_id = article.id inner join lab on " +
                    "lab.id = lab_article.lab_id inner join lab_person on " +
                    "lab_person.lab_id = lab.id inner join person on " +
                    "person.id = lab_person.person_id where word";

                if(keyword_string !== "") {
                    query += " = " + "\'" + keyword + "\'";
                } else {
                    query += " like \'%%\'";
                }

                if (location !== "") {
                    query += " and location like \'%" + location + "%\';"
                } else {
                    query += ";";
                }

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


                        if(articles[lab.name] !== undefined) {
                            let articleExists = false;
                            for(let j = 0; j < articles[lab.name].length; j++) {
                                if (articles[lab.name][j].title === article.title)
                                    articleExists = true;
                            }
                            if(!articleExists)
                                articles[lab.name].push(article);
                        } else {
                            articles[lab.name] = [article];
                        }

                        if(people[lab.name] === undefined)
                            people[lab.name] = person;

                        // this.check_if_duplicate_lab(lab, labs) ? console.log("Lab already exists") : labs.push(lab);
                        if(!this.check_if_duplicate_lab(lab, labs))
                            labs.push(lab);
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
            if(labs[i].name === lab.name) {
                return true;
            }
        }
        return false;
    }

    static check_if_duplicate_person (person, people) {
        for(let i = 0; i < people.length; i++) {
            if(people[i].name === person.name) {
                return true;
            }
        }
        return false;
    }
};