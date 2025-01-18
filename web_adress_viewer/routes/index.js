var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM topic';
  db.query(sql, function(err,data,field){
    if(err) throw err;
    var list = '';
    for(var i=0;i<data.length;i++){
      list+=`<p><a href = "./${data[i].title}">${data[i].title}</a></p>`
    i}
    var html = '';
    html += `<!DOCTYPE html>
    <html>
      <head>
        <title>Express</title>
      </head>
      <body>
      <h1><a href="/">HOME</a></h1>
      <h2><a href="/topic">topic</a></h2>
      <h2><a href="/author">author</a></h2>
      `;  
    res.send(html);
    console.log(html);
  });

  
//  res.render('index', { title: 'Express' });
  
});

module.exports = router;
