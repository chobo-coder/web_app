
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
      <h1><a href="/">TOPIC</a></h1>
      ${list}`  
    res.send(html);
  });

// router.get('/', function(req, res, next) {
//   var sql = 'SELECT * FROM topic';
//   db.query(sql, function(err,data,field){
//     if(err) throw err;
//     var list = '';
//     for(var i=0;i<data.length;i++){
//       list+=`<p><a href = "./${data[i].title}">${data[i].title}</a></p>`
//     i}
//     var html = '';
//     html += `<!DOCTYPE html>
//     <html>
//       <head>
//         <title>Express</title>
//       </head>
//       <body>
//       <h1><a href="/">TOPIC</a></h1>
//       ${list}`  
//     res.send(html);
//   });
  
//  res.render('index', { title: 'Express' });
  
});

module.exports = router;