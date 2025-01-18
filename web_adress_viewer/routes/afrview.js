var express = require('express');
var router = express.Router();

var dsize = require('../data/dsize.js');
var d_struct = require('../data/d_struct.js');

console.log(d_struct)
console.log(dsize)
var html =`
<!DOCUTYPE html>
<html>
<head>
    <meta charset ="utf-8">
    <meta name ="viewport" content = "width=device-width, initial-scale=1"> 
    <title>map_total</title>
</head>
<body>
    <article class = "dut">
       
       
        <div class = "lbanks"></div>
        <div class = "rbranks"></div>
        <div class = "ubanks"></div>
        <div class = "dbanks"></div>
    </article>
</body>
</html>`
console.log(html);
module.exports = router;