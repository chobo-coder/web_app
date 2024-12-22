const express = require('express');
const mysql =require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'guswoduf1@',
    database: 'db_jaeyeol'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to db_jaeyeol');
});

app.post('/add_user', (req, res) =>{
    const {name, email} = req.body;
    const query = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;

    db.query(query, [name, email], (err, result) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.send({ message: 'User added successfully' });
        }
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
