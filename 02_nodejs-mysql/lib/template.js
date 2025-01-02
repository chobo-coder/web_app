module.exports = {
    HTML:function(title, list, body, control) {
        return `
        <!doctype html>
        <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                <h2><a href="/author">author</a></h2>
                ${list}
                ${control}
                ${body}
            </body>
        </html>
        `;
    },
    list:function(topic) {
        var list = '<ul>';
        var i = 0;
        while(i < topic.length) {
            list = list + `<li><a href="/?id=${topic[i].id}">${topic[i].title}</a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        return list;
    },
    tag:function(author,author_id){
        var tg = '';
        var i =0;
        while (author.length > i) {
            selected = '';
            if(author[i].id == author_id){
                selected ='selected';
            }    
            tg +=  `<option value="${author[i].id}" ${selected}>${author[i].name}</option>`;
            i++;
        }
        return `
            <select name="author">
                ${tg}
            </select>
        `
    },
    maketable:function(author){
            var tag = '<table>';
            var aut = 0; 
            while (aut< author.length ){
                tag += `<tr>
                <td>${author[aut].name}</td>
                <td>${author[aut].profile}</td>
                <td><a href="/author/update?id=${author[aut].id}">update</a></td> 
                <td><a href ="/author/delete_process?id=${author[aut].id}">delete</a></td>
                </tr>`;
                aut++;
            }
            tag += '</table>'
            tag += `
            <style>
            table {
                border-collapse: collapse;
            }
            td {
                border: 1px solid black;
            }
            </style>
            `;
            return tag;
    }
}
