var fs = require('fs');
var KeywordExtractor = require('./KeywordExtractor.js');
var DatabaseHandler = require('./DatabaseHandler.js');


class DatabaseBuilder {

    static get_articles () {
        let articles = [];

        // ===========================
        // rossi labs
        // ===========================
        articles.push({
            lab: 1,
            title: "Microglias heretical self-renewal",
            publish_date: new Date(2018, 3)
        });

        articles.push({
            lab: 1,
            title: "Inhibition of Methyltransferase Setd7 Allows the In Vitro Expansion of Myogenic Stem Cells with Improved Therapeutic Potential",
            publish_date: new Date(2018, 1, 23)
        });

        articles.push({
            lab: 1,
            title: "Increased nonHDL cholesterol levels cause muscle wasting and ambulatory dysfunction in the mouse model of LGMD2B",
            publish_date: new Date(2017, 11, 25)
        });

        articles.push({
            lab: 1,
            title: "Increased plasma lipid levels exacerbate muscle pathology in the mdx mouse model of Duchenne muscular dystrophy",
            publish_date: new Date(2017, 9, 12)
        });

        articles.push({
            lab: 1,
            title: "A blueprint for the next generation of ELSI research, training, and outreach in regenerative medicine",
            publish_date: new Date(2017, 7, 5)
        });

        articles.push({
            lab: 1,
            title: "Loss of Vascular CD34 Results in Increased Sensitivity to Lung Injury",
            publish_date: new Date(2018, 7, 6)
        });

        articles.push({
            lab: 1,
            title: "Bone Marrow-Derived Cell Accumulation in the Spinal Cord Is Independent of Peripheral Mobilization in a Mouse Model of Amyotrophic Lateral Sclerosis",
            publish_date: new Date(2018, 3, 8)
        });



        // ===========================
        // hass labs
        // ===========================
        articles.push({
            lab: 2,
            title:   "Automating Event-detection of Brain Neuron Synaptic Activity and Action Potential Firing in vivo using a Random-access Multiphoton Laser Scanning Microscope for Real-time Analysis",
            publish_date: new Date(2018, 7, 18)
        });

        articles.push({
            lab: 2,
            title:   "Interactions between mitochondria and the transcription factor myocyte enhancer factor 2 (MEF2) regulate neuronal structural and functional plasticity and metaplasticity",
            publish_date: new Date(2015, 8, 15)
        });

        articles.push({
            lab: 2,
            title: "Fast non-negative temporal deconvolution for laser scanning microscopy",
            publish_date: new Date(2012, 2, 28)
        });

        articles.push({
            lab: 2,
            title: "Dynamic morphometrics reveals contributions of dendritic growth cones and filopodia to dendritogenesis in the intact and awake embryonic brain",
            publish_date: new Date(2011, 7, 26)
        });

        articles.push({
            lab: 2,
            title: "Functional clustering drives encoding improvement in a developing brain network during awake visual learning",
            publish_date: new Date(2012, 1, 10)
        });


        // ===========================
        // duncan labs
        // ===========================
        articles.push({
            lab: 3,
            title: "More Than the Sum of Its Parts- A Role for the Hippocampus in Configural Reinforcement Learning",
            publish_date: new Date(2018, 5, 2)
        });
        articles.push({
            lab: 3,
            title: "Lingering Cognitive States Shape Fundamental Mnemonic Abilities",
            publish_date: new Date(2017, 8, 1)
        });
        articles.push({
            lab: 3,
            title: "Time-resolved neural reinstatement and separation during memory decisions in human hippocampus",
            publish_date: new Date(2017, 9, 30)
        });
        articles.push({
            lab: 3,
            title: "High-resolution investigation of memory-specific reinstatement in the hippocampus and perirhinal cortex",
            publish_date: new Date(2016, 4, 4)
        });
        articles.push({
            lab: 3,
            title: "Memory States Influence Value-Based Decisions",
            publish_date: new Date(2016, 11)
        });



        // ===========================
        // guilcher labs
        // ===========================
        articles.push({
            lab: 4,
            title: "Enhanced communication between inpatient and community pharmacists to optimize medication management during transitions of care",
            publish_date: new Date(2018, 11, 13)
        });
        articles.push({
            lab: 4,
            title: "Self-management of pain and depression in adults with spinal cord injury- A scoping review",
            publish_date: new Date(2018, 10, 18)
        });
        articles.push({
            lab: 4,
            title: "Exploring deprescribing opportunities for community pharmacists- Protocol for a qualitative study",
            publish_date: new Date(2018, 5, 30)
        });
        articles.push({
            lab: 4,
            title: "Social identification predicts health outcomes (via self-efficacy) in a chronic disease self-management program",
            publish_date: new Date(2018, 3, 5)
        });
        articles.push({
            lab: 4,
            title: "Prevalence of osteoarthritis in individuals with COPD a systematic review",
            publish_date: new Date(2018, 4, 16)
        });


        return articles;
    }


    static add_articles_to_database () {

        let articles = DatabaseBuilder.get_articles();

        articles.forEach((article) => {
            let date = article.publish_date.toJSON().slice(0, 10);

            let add_article_query = "insert ignore into article (title, publish_date) values (" + "\'" +
                article.title + "\'" + "," +
                "\'" + date + "\'" + ")";

            con.query(add_article_query, function (err, result) {
                if (err) throw err;
            });

            let get_article_id_query = "select id from article where title = '" + article.title + "';";

            DatabaseHandler.query_db(get_article_id_query, (results) => {
                let article_id = results[0].id;

                let add_lab_article_query = 'insert ignore into lab_article (lab_id, article_id) values (' + article.lab + ',' + article_id + ')';

                DatabaseHandler.query_db(add_lab_article_query, () => {});
            });

            KeywordExtractor.get_keyword_array(article.title).then((keywords) => {
                keywords.forEach((keyword) => {
                   this.add_keyword_to_database(keyword).then((keyword_id) => {
                       DatabaseHandler.query_db(get_article_id_query, (results) => {
                           let article_id = results[0].id;
                           let add_article_keyword_query = 'insert ignore into article_keyword (article_id, keyword_id) values (' + article_id + ',' + keyword_id + ');';
                           DatabaseHandler.query_db(add_article_keyword_query, () => {
                               console.log("Added article keyword");
                           });
                       });
                   });
                });
            });
        });
    }


    static add_keyword_to_database (keyword) {
        return new Promise((resolve, reject) => {
            let add_keyword_query = 'insert ignore into keyword (word) values (' + '\'' + keyword + '\'' + ');';
            DatabaseHandler.query_db(add_keyword_query, () => {
                let get_keyword_id_query = 'select id from keyword where word = ' + '\'' + keyword + '\'' + ';';
                DatabaseHandler.query_db(get_keyword_id_query, (results) => {
                    resolve(results[0].id);
                })
            });
        });
    }



    static get_pubmed_ids(query_term) {

    }
}

module.exports = DatabaseBuilder;









