function songLrc(http, para, response){

    http.get("http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.lry&format=json&callback=&songid=" + para.songlrcId, function(res){

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

            newData = newData.lrcContent.toString();
            console.log(newData);

            var data = newData.split("\n");
            var song = [];
            for(var i=0; i<data.length; i++){
                    console.log(data[i]);
                    //解析歌词
                    var tempo = {};
                    if(data[i] != "") {
                        var result = data[i].match(/(\[.*\])(.+)?/);
                        //解析时间
                        var time = result[1];
                        var text = result[2];

                        if (time.indexOf(".") != "-1") {
                            time = time.match(/(\d{2}):(\d{2})\.(\d{2})/);
                            time = time[1] * 60 + 1 * time[2];
                            tempo.time = time;
                            tempo.text = text || "";
                            song.push(tempo);
                        }
                    }
                }

            response.setHeader('Access-Control-Allow-Origin', '*');
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(song));
            response.end();

        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

exports.songLrc = songLrc;