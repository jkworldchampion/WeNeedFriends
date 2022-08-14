const exprerss = require('express');
const app = express();
const port = process.env.PORT || 5000;   // 5000이 비면 5000으로

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const data = fs.readFileSync('./database.json');
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
app.get('/api/plans', (req, res) => {
	connection.query(
		'SELECT * FROM PLAN',
		(err, rows, fields) => {
			res.send(rows);
		}
	)}
);
// 데이터 구조 : 지역, 시간, 인원, 이름으로 일단 
app.post('/api/plans', (req, res) => {
	let sql = 'INSERT INTO PLAN VALUES (null, ?, ?, ?, ?)';
})



app.listen(port, () => console.log(`Listening in port ${port}`));
