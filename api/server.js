var http = require("http");
var url = require("url");



function start(route){

    function onRequest(request, response){

        var pathname = url.parse(request.url).pathname;

        var arg = url.parse(request.url);

        console.log("*************");
        console.log("路径:" + pathname);
        console.log("参数:" + url.parse(request.url, true).query);
        console.log("*************");
        console.log("Request for " + pathname + " received.");

        route(pathname, http, response ,url.parse(request.url, true).query);


    }

    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

exports.start = start;

