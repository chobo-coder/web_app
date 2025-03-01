var template = require('./template.js');
var db = require('./db.js');
var url = require('url');
var qs = require('qs');


exports.home = function(request, response){
    db.query('select * from topic',function(err,topics){
        console.log(topics);
        var title = 'Welcome'
        var description = 'Hellow, Node.js'
        var list = template.list(topics); 
        var html = template.HTML(title,list,`<h2>${title}</h2>
            <p>${description}</p>`,
            `<a href="/create">create</a>`
        );

        response.writeHead(200);
        response.end(html);
    });
}

exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query('select * from topic',function(err,topics){
        if (err){
            throw err;
        }
        db.query(`select topic.id,topic.title,topic.description,topic.created,topic.author_id,
            author.name, author.profile from 
            topic left join author on(topic.author_id = author.id) 
            where topic.id = ${queryData.id}`,function(err2,topic){
            if (err2){
                throw err2;
            }
            console.log(topic);
            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(title,list,`<h>${title}</h>
                <p>${description}</p>
                <p> by ${topic[0].name} </p>
                <form action="/delete_process" method="post">
                    <p><input type="hidden" name="id" value =${topic[0].id}></p>
                    <p>
                        <input type="submit" value = "delete">
                    </p>
                </form>`,
                    `<a href="/create">create</a>
                    <a href="/update?id=${topic[0].id}">update</a>`
            );            
            response.writeHead(200);
            response.end(html);
        });
    });
}
exports.create  = function(request, response){
    db.query('select * from topic',function(err,topics){
        if (err){
            throw err;
        }
        db.query(`select * from author`,function(err,author){
            if (err) {
            throw err;
            }              
        
            var title = "CREATE";       
            var list = template.list(topics);
            var html = template.HTML(title,list,`
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    ${template.tag(author)}
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`,
            ``);
            response.writeHead(200);
            response.end(html);
        });
    });    
}

exports.craeteprocess = function(request,response){
    var body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        var post = qs.parse(body);
        console.log(`insert into topic (title, description,created,author_id)
                values(?,?,now(),?)`,
            [post.title,post.description,post.author])
        db.query(`insert into topic (title, description,created,author_id)
                values(?,?,now(),?)`,
            [post.title,post.description,post.author],
            function(error,result) {
            if(error) {
                console.log(error);
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
        });
    });
}
exports.update = function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query('select * from topic',function(err,topics){
        if (err){
            throw err;
        }
        db.query('select * from author',function(err,author){
            if(err) {
                throw err;

            } 
            db.query(`select topic.id,topic.title,topic.description,topic.created,topic.author_id,
                author.name, author.profile from 
                topic left join author on(topic.author_id = author.id) 
                where topic.id = ${queryData.id}`,function(err2,topic){
                if (err2){
                    throw err2;
                }
                var title = "UPDATE";       
                var list = template.list(topics);
                var html = template.HTML(title,list,`
                <form action="/update_process" method="post">
                    <p><input type="hidden" name="id" value="${queryData.id}"></p>
                    <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                    </p>
                    <p>
                        ${template.tag(author,topic[0].author_id)}
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>`,
                `<a href="/create">create</a>
                <a href="/update?id=${topic[0].id}">update</a>`);
                response.writeHead(200);
                response.end(html);
            });
        });
    });//
}
exports.updateprocess = function(request, response){
    var body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        var post = qs.parse(body);
        db.query(`update topic set title=?,description=?, author_id =? where id=?`,
            [ post.title,post.description,post.author,post.id], function(err,result){
                response.writeHead(302, {Location: `/?id=${post.id}`});
                response.end();
            })
    });
}
exports.deleteprocess = function(request, response){
    var body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        var post = qs.parse(body);
        db.query(`delete  from topic where id=?`,
            [post.id], function(err,result){
                if(err){
                    throw err;
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            })
    });
}