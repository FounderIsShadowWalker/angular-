function uniqueSong(http, para, response){


    http.get("http://music.baidu.com/data/music/links?songIds={" + para.songid +"}", function(res){

        var size = 0;
        var chunks = [];

        res.on('data', function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function(){
            var data = Buffer.concat(chunks, size);
            var originData = data.toString();
            var newData = JSON.parse(originData);
            //console.log(newData);

            var returnData = {};
            var songlist = newData.data.songList[0];

            returnData.id = songlist.songId;
            returnData.img = songlist.songPicSmall;
            returnData.author = songlist.artistName;
            returnData.title = songlist.songName;
            returnData.time = songlist.time;
            returnData.audio = songlist.songLink;

            response.setHeader('Access-Control-Allow-Origin', '*');
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(returnData));
            response.end();

        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

exports.uniqueSong= uniqueSong;