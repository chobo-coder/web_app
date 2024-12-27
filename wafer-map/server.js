const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;
const url = require('url');

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

// MySQL 데이터베이스 연결 설정
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'guswoduf1@',
    database: 'afr_data_db',
    port: 3306
};




// /lot/x/y 경로 추가
app.get('/:lot/:wf_no/:x/:y', async (req, res) => {
    const {lot, wf_no, x, y } = req.params;
    fs.readdir(`./data`, async (err, data) => {
        if(!data.includes(lot.slice(0,3).toUpperCase())) {
            res.status(404).json({ error: `lot information did not exist, please regist ${lot.slice(0,3)} Product info` });
            //return;
        } else{      
            try{
                // 데이터베이스 연결
                const connection = await mysql.createConnection(dbConfig);
                console.log(lot,wf_no,x,y);  
                // SQL 쿼리 실행
                const [rows] = await connection.execute(
                    'SELECT * FROM afr_table WHERE LOT =? and wf_no =? AND x = ? AND y = ?',
                    [lot, wf_no, x, y]
                );
                console.log(rows);
                // 연결 종료
                await connection.end();

                if (rows.length > 0) {
                    res.json(rows); // 첫 번째 데이터 반환
                } else {
                    res.status(404).json({ error: `Data not found for x: ${x}, y: ${y}` });
                }
                }
            catch (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: 'Failed to retrieve data from database.' });
            }
        }
    });

});


// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
