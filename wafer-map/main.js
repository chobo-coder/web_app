const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = requre('mysql2/promise');
const app = express();
const PORT = 3000;
const url = require('url');


// MySQL 데이터베이스 연결 설정
const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
};



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

// /lot/x/y 경로 추가
app.get('/:lot/:x/:y', async (req, res) => {
    const { lot, x, y } = req.params;
    req.prarmas.lot 
    fs.readdir(`./data`, (err, data) => {
            if(!(`${lot.slice(0,3)}` in data)) {
                res.status(404).json({ error: `Lot not found: ${lot}` });
                return;
            }            
           });
    try {
        // 데이터베이스 연결
        const connection = await mysql.createConnection(dbConfig);

        // SQL 쿼리 실행
        const [rows] = await connection.execute(
            'SELECT * FROM afr_data WHERE LOT =? AND x = ? AND y = ?',
            [lot, x, y]
        );
        console.log(rows);
        // 연결 종료
        await connection.end();

        if (rows.length > 0) {
            res.json(rows[0]); // 첫 번째 데이터 반환
        } else {
            res.status(404).json({ error: `Data not found for x: ${x}, y: ${y}` });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to retrieve data from database.' });
    }
});

// 서버 시작


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });