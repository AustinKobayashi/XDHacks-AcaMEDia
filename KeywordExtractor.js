var pdfUtil = require('pdf-to-text');
var fs = require('fs');
var path = require('path');
var keyword_extractor = require('keyword-extractor');

module.exports = class KeywordExtractor {

    static extract_keywords (file_path) {
        fs.readdir(file_path, function(err, items) {
            for (let i = 0; i<items.length; i++) {
                //console.log(items[i]);
                if(path.extname(items[i]) === '.pdf') {
                    KeywordExtractor.get_text_from_pdf(file_path, items[i]).then((text) => {
                        text = text.replace(/\s\s+/g, ' ');
                        KeywordExtractor.get_keywords_from_text(text).then((keywords) => {
                            fs.writeFile('./keywords/' + items[i].substr(0, items[i].length - 3) + 'txt', keywords.toString(), function(err, data){
                                if (err) console.log(err);
                                console.log("Successfully Written to File.");
                            });
                        });
                    });
                }
            }
        });
    }

    static get_text_from_pdf (file_path, pdf) {
        return new Promise(function (resolve, reject) {
            pdfUtil.pdfToText(file_path + '/' + pdf, function(err, data) {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    static get_keywords_from_text (text) {
        return new Promise(function (resolve, reject) {
            let extraction_result = keyword_extractor.extract(text, {
                language:"english",
                remove_digits: true,
                return_changed_case:true,
                remove_duplicates: true
            });

            for (let i = 0; i < extraction_result.length; i++) {
                extraction_result[i] = extraction_result[i].replace(/[.,\\\/#!$%\'\"\^&\*;:{}=\-_`~()]/g,"");
            }

            resolve(extraction_result);
        });
    }


    static get_keyword_array (article_title) {
        return new Promise((resolve, reject) => {
            fs.readFile('./keywords/' + article_title + '.txt', 'utf8', function read(err, data) {
                if (err) {
                    throw err;
                }
                resolve(data.split(','));
            });
        });
    }
};