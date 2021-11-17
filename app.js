const jsdom = require("jsdom");
const https = require("https");
const { JSDOM } = jsdom;

let url = process.argv[2];

function httpGet(url, callback) {
    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            callback(data);
        });

    }).on("error", (err) => {
        console.error("Error: " + err.message);
    });
}

httpGet(url, (index) => {
    const dom = new JSDOM(index, {
    url: url,
    resources: "usable",
    runScripts: "outside-only"
});
console.log(dom.serialize());
})
