var http = require('http');
var fs = require('fs');
var url = require('url');
const { brotliDecompress } = require('zlib');
function templatehtml(title, list, body) {
    return `
    <!doctype html>
    <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a>
            ${list}
            ${body}   
        </body>
    </html>
    `;
}

function templatelist(filelist) {
    var i = 0;
    var list = `<ul>`;
    while (i<filelist.length){
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
    }
    list += `</ul>`;
    return list;
}

var app =http.createServer(function(request, response) {
    var _url = request.url;
    var _quertData = url.parse(_url,true).query;

    var pathname = url.parse(_url,true).pathname;
    console.log(url.parse(_url,true));
    if (pathname == '/') {
        if (_quertData.id === undefined) {
            fs.readdir('./data', 'utf8', function(err, filelist) {
                //response.end(title);
                var title = "Welcome"
                    //decription 읽은  파일  정보
                var list = templatelist(filelist); 
                var body = `<p>Welcome node js </p>`;
                response.writeHead(200);
                response.end(templatehtml(title, list,`<h2>${title}</h2> <p>Welcome node js </p>`));
                });
                console.log(__dirname + _url);
        } else {
            fs.readdir('./data', 'utf8', function(err, filelist) {
                var list = templatelist(filelist); 
                fs.readFile(`data/${_quertData.id}`, function(err, description) {
                    var title = _quertData.id;
                response.writeHead(200);
                response.end(templatehtml(title, list, `<h2>${title}</h2> <p>${description}</p>` ));
                });
            });
        }    
    }else {
        response.writeHead(404);
        response.end('Not Found');
    }
});    


app.listen(3000);