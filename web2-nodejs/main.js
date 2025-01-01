var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');

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
                var list = template.LIST(filelist); 
                var body = `<p>Welcome node js </p>`;
                response.writeHead(200);
                response.end(template.HTML(title, list,`<h2>${title}</h2> <p>Welcome node js </p>`,`<a href="/create">create</a>`));
                });
                console.log(__dirname + _url);
        } else {
            fs.readdir('./data', 'utf8', function(err, filelist) {
                var list = template.LIST(filelist); 
                fs.readFile(`data/${_quertData.id}`, function(err, description) {
                    var title = _quertData.id;
                response.writeHead(200);
                response.end(template.HTML(title, list, `<h2>${title}</h2> <p>${description}</p>`,
                `<a href="/create">create</a> <a href = "/update?id=${title}">update</a>
                <form action = "delete_process" method ="post" onsubmit="return confirm('it will be deleted do you confirm?');">
                    <input type = "hidden" name ="id" value="${title}">
                    <input type="submit" value="delete">
                </form> `));
                });
            });
        }    
    } else if (pathname == '/create') {
        fs.readdir('./data', 'utf8', function(err, filelist) {
            //response.end(title);
            var title = "WEB_CREATE"
                //decription 읽은  파일  정보
            var list = template.LIST(filelist); 
            response.writeHead(200);
            response.end(template.HTML(title, list,`
                <form action="/create_process" method="post">
                <p><input type = "text" name ="title" placeholder ="title"> </p>
                <p>
                    <textarea name = "description" placeholder = "description"></textarea>
                </p>
                <p>
                    <input type="submit" value="저장">
                </p>
                </form>   
                `,``));
            });
    } else if (pathname == '/update') {
        fs.readdir('./data','utf8',function(err, filelist){
            fs.readFile(`data/${_quertData.id}`, 'utf8', function(err,description){
                var title = _quertData.id;
                var list = template.LIST(filelist);
                response.writeHead(200);
                response.end(template.HTML(title, list,`
                <h2>${title}</h2> 
                    <form action="/update_process" method="post">
                <p><input type = "hidden" name ="id" value="${title}"> </p>
                <p><input type = "text" name ="title" value="${title}"> </p>
                <p>
                    <textarea name = "description" placeholder = "description">${description}</textarea>
                </p>
                <p>
                    <input type="submit" value="update">
                </p>
                </form>   
                `,``));
        })

        })
    } else if (pathname == '/create_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
            console.log(body);
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            console.log(title, description);
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302,{Location: `/?id=${title}`});
                response.end();
            })
        });
    } else if (pathname == '/update_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
            console.log(body);
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            console.log(title, description);
            fs.rename(`data/${id}`, `data/${title}`, function(err) {
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302,{Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    } else if (pathname == '/delete_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
            console.log(body);
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302,{Location: `/`});
                response.end();
            })
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});    


app.listen(3000);