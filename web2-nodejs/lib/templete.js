var template = {
    HTML: function(title, list, body, control) {
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
            ${control}
            ${body}   
        </body>
    </html>
    `},
    LIST: function(filelist) {
        var i = 0;
        var list = `<ul>`;
        while (i<filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
        }
        list += `</ul>`;
        return list;
    }
};


module.exports = template;