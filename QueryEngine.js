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

        let keywords = this.keyword_parser(keyword_string);

    }
};