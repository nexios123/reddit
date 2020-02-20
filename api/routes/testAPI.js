var express = require("express");
var cheerio = require("cheerio");
var request = require("request");
var router = express.Router();
var posts = [];

router.get("/", function (req, res) {

    // use Cheerio to make request
    request({
        method: 'GET',
        url: 'https://old.reddit.com/'
        //url: 'http://www.wordthink.com/'
    }, function(err, response, body, callback) {
        if (err) return console.error(err);

        // get the HTML body from WordThink.com
        let $ = cheerio.load(body);

        if (posts.length > 0) {
            posts = [];
        }

        let elements = $('#siteTable > div[class*="thing"]');

        for (let i = 0; i < elements.length; i++) {
            let title = elements.find('p.title').eq(i).text();
            let rank = elements.find('span.rank').eq(i).text();
            let link = elements.find('a.title').eq(i).attr("href");

            if(!link.includes('http')) link = 'https://www.reddit.com' + link;

            if (rank != '') {
                posts.push({
                    id: rank,
                    title: title,
                    link: link
                })
            }
        }


        res.send(JSON.stringify(posts));
    });

});

module.exports = router;
