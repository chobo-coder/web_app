var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var db = require('./lib/db.js');
var topic = require('./lib/topic.js');
var author = require('./lib/author.js');
var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {
        if(queryData.id === undefined) {
            topic.home(request, response);
        } else {
            topic.page(request,response);
        }
    } else if(pathname ==='/author'){
        author.home(request, response);
    } else if(pathname === '/create') {
        topic.create(request, response);
    } else if(pathname === '/create_process') {
        topic.craeteprocess(request, response);
    } else if(pathname === '/update') {
        topic.update(request, response);
    } else if(pathname === '/update_process') {
        topic.updateprocess(request, response);
    } else if(pathname === '/delete_process') {
        topic.deleteprocess(request, response);
    } else if(pathname === '/author/create') {
        author.create(request, response);
    } else if(pathname ==='/author/create_process'){
        author.createprocess(request, response);
    } else if(pathname ==='/author/update_process'){
        author.update(request, response);
    } else if(pathname ==='/author/update_process'){
        author.updateprocess(request, response);
    } else if(pathname ==='/author/delete_process'){
        author.deleteprocess(request, response);
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
