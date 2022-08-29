const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: conf.host,
	user: conf.user,
	password: conf.password,
	port: conf.port,
	database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});


app.get('/api/plans', (req, res) => {
	connection.query(
		"SELECT * FROM PLAN WHERE isDeleted = 0",
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});
 
// 내가 만든, 같은 택시 타는 사람들에 대한 정보 불러오는 api
// TOGETHER는 `이름`, `전화번호`, `출발지 도착시간` 으로 구성
app.get('/api/planid', (req, res) => {
	connection.query(
		"SELECT * FROM TOGETHER",
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});

// 여기는 추후에 고칠 예정
// app.get('/api/planid', upload.none(), (req, res) => {
// 	let sql = 'SELECT * FROM TOGETHER WHERE id = ?';
// 	let id = req.body.id;
// 	connection.query(sql, id,
// 		(err, rows, fields) => {
// 		res.send(rows);
// 	})
// })

app.use('/text', express.static('./upload'));
app.use(express.json()); 
app.post('/api/plans', upload.none(), (req, res) => {   
	let sql = 'INSERT INTO PLAN VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
	let departure = req.body.departure;
	let arrival = req.body.arrival;
	let time = req.body.time;
	let number = req.body.number;
	let name = req.body.name;
	let params = [departure, arrival, time, number, name];
	connection.query(sql, params, 
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});

app.delete('/api/plans/:id', (req, res) => {
	let sql = 'UPDATE PLAN SET isDeleted = 1 WHERE id = ?';
	let params = [req.params.id];
	connection.query(sql, params,
		(err, rows, fields) => {
			res.send(rows);
		}
	)
});

app.post('/api/planid', upload.none(), (req, res) => {
	let sql = 'INSERT INTO TOGETHER VALUES (?, ?, ?, ?)';  // 요청한 plan의 id, name, phonenumber, time
	let id = req.body.id;
	let name = req.body.name;
	let phonenumber = req.body.phonenumber;
	let time = req.body.time;
	let params = [id, name, phonenumber, time];
	connection.query(sql, params, 
		(err, rows, fields) => {
			res.send(rows);
		}
	);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
