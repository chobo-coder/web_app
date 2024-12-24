const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 정적 파일 제공: public 폴더의 파일을 서빙
app.use(express.static(path.join(__dirname, 'public')));

// API: /api/chip-data 경로 처리
app.get('/api/chip-data', (req, res) => {
    const filePath = path.join(__dirname, 'data/chipdata.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read chip data.' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
