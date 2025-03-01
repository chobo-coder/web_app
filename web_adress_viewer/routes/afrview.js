var express = require('express');
var router = express.Router();

var dsize = require('../data/dsize.js');
var d_struct = require('../data/d_struct.js');
var db_afr = require('../lib/db_afr.js');

console.log(d_struct)
console.log(dsize)


router.get('/', function(req, res, next) {
  var sql = `select * from afr_table`;
  db_afr.query(sql, function(err,data,field){
    if (err) {
      console.error("Database query error:", err);
      res.status(500).send('Database query failed');
      return; // 에러 발생 시 이후 코드 실행 방지
    }
    console.log(data); 
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset ="utf-8">
        <meta name ="viewport" content = "width=device-width, initial-scale=1"> 
        <title>map_total</title>
        <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
    <body>
        <h1> hello. </h1>
        <article class = "dut">
            <div class = "lbanks"></div>
            <div class = "rbranks"></div>
            <div class = "ubanks"></div>
            <div class = "dbanks"></div>
        </article>
        <article class = "dut">
            <div class = "lbanks"></div>
            <div class = "rbranks"></div>
            <div class = "ubanks"></div>
            <div class = "dbanks"></div>
        </article>
        <h2><a href="/afrview">afrview</a></h2>
    </body>
    </html>`
    
    res.send(html);
    console.log(html);
  });
});

router.get('/:lotid/:wfno/:x/:y', function(req, res, next) {
    var lotid = req.params.lotid;
    var wfno = req.params.wfno;
    var x = req.params.x;
    var y = req.params.y;
    var lotcd = lotid.substring(0,3)
    var lot_struct = d_struct['hjy']
    var dut_size = 1260; 

    var dynamic_style = `
    .dynamicbgblock {
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length / 3)}px; /* 'hight' 오타 수정: 'height' */
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .dynamicbg {
        width: ${Math.floor(dut_size / lot_struct['bgarr'][0].length)}px;
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length )*10}px; /* 'hight' 오타 수정: 'height' */
        display: grid;
        grid-template-columns: repeat(${lot_struct['baarr'][0].length},  ${Math.floor(dut_size / lot_struct['bgarr'][0].length / lot_struct['baarr'][0].length)}px);
        flex-direction: column;
        border-width: 5px;
    }
    .dynamicbablock {
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length / 3 / lot_struct['baarr'].length)}px; /* 'hight' 오타 수정 */
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .dynamicba {
        width: ${Math.floor(dut_size / lot_struct['bgarr'][0].length / lot_struct['baarr'][0].length)-10}px;
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length  / lot_struct['baarr'].length)*10-10}px; /* 'hight' 오타 수정 */
        display: flex;
        flex-direction: row;
        border-width: 5px;
    }
    .dynamicbud {
        width: ${Math.floor(dut_size / lot_struct['bgarr'][0].length / lot_struct['baarr'][0].length)}px;
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length / 3 / lot_struct['baarr'].length / 2)}px; /* 'hight' 오타 수정 */
    .dynamicblr {
        width: ${Math.floor(dut_size / lot_struct['bgarr'][0].length / lot_struct['baarr'][0].length / 2)}px;
        height: ${Math.floor(dut_size / lot_struct['bgarr'].length / 3 / lot_struct['baarr'].length)}px; /* 'hight' 오타 수정 */
    }
    `
    console.log(dynamic_style)
    var sql = `select * from afr_table
    where lot =? and wf_no =? and x =? and y =?`;
    console.log((sql,[lotid,wfno,x,y]))
  db_afr.query(sql,[lotid,wfno,x,y], function(err,data,field){
    if (err) {
      console.error("Database query error:", err);
      console.log (`please check lot =${lotid}, wfno: ${wfno}, x:${x}, y:${y}
        `)
      res.status(500).send('Database query failed');
      return; // 에러 발생 시 이후 코드 실행 방지
    }
    console.log(data); 
    
    
    var div_string = ``; 
    for(var i=0; i<lot_struct['bgarr'].length; i++) {
        for (k =0; k<lot_struct['bgarr'][i].length; k++){
            div_string += `<div class ="dynamicbg bg">`;
            for(var j=0; j<lot_struct['baarr'].length; j++) {
                for (t=0; t<lot_struct['baarr'][j].length; t++){
                    div_string+= `<div class ="dynamicba ba"> </div>` 
                }
            }
            div_string += `</div>`;
        div_string +=`</div>`;}
    };

    // var div_string = ``; 
    // for(var i=0; i<lot_struct['bgarr'].length; i++) {
    //     for (k =0; k<lot_struct['bgarr'][i].length; k++){
    //         if(k==0) div_string += `<div class ="dynamicbg_col bg">`;
    //         else div_string += `<div class ="dynamicbg_row bg">`;
    //         for(var j=0; j<lot_struct['baarr'].length; j++) {
    //             for (t=0; t<lot_struct['baarr'][j].length; t++){
    //                 if(t==0) div_string+= `<div class ="dynamicba_col ba"> </div>` 
    //                 else div_string += `<div class ="dynamicba_row ba"> </div>` 
    //             }
    //         div_string += `</div>`;}
    //     div_string +=`</div>`;
    // };
    // for(var i=0; i<lot_struct['bgarr'].length; i++) {
    //     div_string += `<div class="dynamicbgblock">`; 
    //     for (k =0; k<lot_struct['bgarr'][i].length; k++){
    //         div_string += `<div class ="dynamicbg bg">`;
    //         for(var j=0; j<lot_struct['baarr'].length; j++) {
    //             div_string += `<div class="dynamicbablock">`; 
    //             for (t=0; t<lot_struct['baarr'][j].length; t++){
    //                 div_string += `<div class ="dynamicba ba"> </div>` 
    //             }
    //             div_string += `</div>`;}
    //         div_string +=`</div>`;}
    //     div_string +=`</div>`;
    // };
    console.log(div_string);
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset ="utf-8">
        <meta name ="viewport" content = "width=device-width, initial-scale=1"> 
        <title>afr_map(${lotid},${wfno},${x},${y}</title>
        <link rel="stylesheet" href="/stylesheets/style.css">
        <style>
         ${dynamic_style}
        </style>
    </head>
    <body>
        <h1> ${lotid}/${wfno}/${x}/${y} </h1>
        <article class = "dut">
         ${div_string} 
        </article>
        <h2><a href="/afrview">afrview</a></h2>
    </body>
    </html>`
    
    res.send(html);
    console.log(html);
  });
});
module.exports = router;