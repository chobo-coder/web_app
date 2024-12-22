var http = require('http');
var fs = require('fs');
var url = require('url');
var app =http.createServer(function(request, response) {
    var _url = request.url;
    var _quertData = url.parse(_url,true).query;

    var pathname = url.parse(_url,true).pathname;
    console.log(url.parse(_url,true));
//  if(_url == '/'){
//      title = "welcome";
//  }
//  if (_url == '/favicon.ico') {
//      return response.writeHead(404);
//  }
//  response.writeHead(202);
    if (pathname == '/') {
        if (_quertData.id === undefined) {
            fs.readdir('./data', 'utf8', function(err, filelist) {
                //response.end(title);
                var title = "Welcome"
                    //decription 읽은  파일  정보
                var description = "Welcome Node.js";
                var list = '<ul>';
                var i = 0;
                while (i<filelist.length){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list += '</ul>';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a>
                    ${list}
                    <h2>${title}</h2>
                    <p>=${description}
                    </p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
                });
                console.log(__dirname + _url);
        } else {
            fs.readdir('./data', 'utf8', function(err, filelist) {
                var list = '<ul>';
                var i = 0;
                while (i<filelist.length){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list += '</ul>';
            
                fs.readFile(`data/${_quertData.id}`, function(err, description) {
                    var title = _quertData.id;
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title> WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a>
                        <ol>
                        ${list}
                        <h2>${title}</h2>
                        <p>=${description}
                        </p>
                    </body>
                    </html>
                `;
                response.writeHead(200);
                response.end(template);
                });
            });
        }    
    }else {
        response.writeHead(404);
        response.end('Not Found');
    }
});    

//                  <ol>
//                  <li><a href="/?id=HTMl">HTML</a></li>
//                      <li><a href="/?id=CSS">CSS</a></li>
//                      <li><a href="/?id=JAVASCRIPT">JavaScript</a></li>
//                  </ol>

app.listen(3000);