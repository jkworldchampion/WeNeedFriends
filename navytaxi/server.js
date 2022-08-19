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


app.listen(port, () => console.log(`Listening on port ${port}`));
