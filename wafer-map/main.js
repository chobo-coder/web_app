const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.get('api/chip-data', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'chip-data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read chip data.' });
        }   else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });



   
