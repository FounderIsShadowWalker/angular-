function songlist(http, para, response){

    http.get("http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.billboard.billList&format=json&type="
                   + para.type + "&offset=" + para.offset + "&size=" + para.size, function(res){

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
            var returnData = {};
            var common = {};
            //console.log(originData);

            common.title = newData.billboard.name;
            common.desc= newData.billboard.comment;
            common.date = newData.billboard.update_date;
            returnData.common = common;


            var list = [];
            for(var i=0;  i<newData.song_list.length; i++){
                var tmp = {};
                tmp.id = newData.song_list[i]['song_id'];
                tmp.title = newData.song_list[i]['title'];
                tmp.author = newData.song_list[i]['author'];

                list.push(tmp);
            };

            returnData.list = list;
            //console.log(returnData);

            response.setHeader('Access-Control-Allow-Origin', '*');
            response.writeHead(200, {"Content-Type": "text/plain"});


            //console.log(JSON.parse(data.toString()).song_list[0].artist_id);



            response.write(JSON.stringify(returnData));
            response.end();

        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

exports.songlist = songlist;