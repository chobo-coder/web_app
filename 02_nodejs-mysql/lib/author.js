var template = require('./template.js');
var db = require('./db.js');
var url = require('url');
var qs = require('qs');
const { PassThrough } = require('stream');
exports.home = function(request, response){
    db.query('select * from topic',function(err,topics){
        if (err) throw err;
        db.query('select * from author',function(err,author){
            if(err) throw err;
            var title = 'author';
            var list = template.list(topics);
            var tag = template.maketable(author);
            var html = template.HTML(title,list,`
                ${tag}`,
                `<a href="/author/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
        });
    });
}
exports.create = function(request, response){
    db.query('select * from topic',function(err,topics){
        if (err) throw err;
        db.query('select * from author',function(err,author){
            if(err) throw err;
            var title = 'author';
            var list = template.list(topics);
            var tag = template.maketable(author);
            var html = template.HTML(title,list,`
                ${tag}
                    <form action="/author/create_process" method="post">
                    <p><input type="text" name="name" placeholder="name"></p>
                    <p>
                        <input type="textarea" name="profile" placeholder="profile">
                    </p>
                    <p><input type="submit"></p>
                    </form>    
                `,
                ``
            );
            response.writeHead(200);
            response.end(html);
        });
    });
}
exports.createprocess = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    })
    request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
        db.query('insert into author (name, profile) values (?, ?)',
            [post.name, post.profile]
            ,function(err, result){
                if(err) throw err;
                response.writeHead(302, {Location: `/author`});
                response.end();
            });
    });
}
exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query('select * from topic',function(err,topics){
        if (err) throw err;
        db.query('select * from author',function(err,author){
            if(err) throw err;
            db.query(`select * from author where id = ${queryData.id}`,function(err,author1){
                if(err) throw err;
                console.log(author1);
                var title = 'author';
                var list = template.list(topics);
                var tag = template.maketable(author);
                var html = template.HTML(title,list,`
                    ${tag}
                    <form action="/author/update_process" method="post">
                    <p><input type="hidden" name="id" value="${queryData.id}"></p>
                    <p><input type="text" name="name" placeholder="name" value="${author1[0].name}"></p>
                    <p>
                        <input type="textarea" name="profile" placeholder="profile" value="${author1[0].profile}"
                    </p>
                    <p><input type="submit"></p>
                    </form>    
                        `,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}
exports.updateprocess = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    })
    request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
        db.query('update author set name=?, profile=? where id =?',
            [post.name,post.profile,post.id],function(err, result){
                if(err) throw err;
                response.writeHead(302, {Location: `/author`});
                response.end();
            });
    });
}