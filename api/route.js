var songlist = require("./songlist");
var uniqueSong = require("./uniqueSong");
var songLrc = require("./songLrc");
var search = require("./search");

function route(pathname, http, response, para){

    console.log("About to route a request for " + pathname);

    // 取歌单列表
    if(pathname == "/songlist") {
        songlist.songlist(http, para, response);
    }
    //取某一首歌
    if(pathname == "/songid"){
       uniqueSong.uniqueSong(http, para , response);
    }
    //取某一首歌的歌词
    if(pathname == "/songlrc"){
        console.log(para);
        songLrc.songLrc(http, para, response);
    }

    if(pathname == "/search"){
       search.searchSong(http, para, response);
    }
}

exports.route = route;