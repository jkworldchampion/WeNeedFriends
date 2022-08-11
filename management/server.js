const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
	res.send([
		{
			'id' : 1,
			'image' : 'https://placeimg.com/64/64/1',
			'name' : '나동빈',
			'birthday' : '980516',
			'gender' : '남자',
			'job' : '디자이너'
		},
		{
			'id' : 2,
			'image' : 'https://placeimg.com/64/64/2',
			'name' : '박주환',
			'birthday' : '000930',
			'gender' : '남자',
			'job' : '대학생'
		},
		{
			'id' : 3,
			// 'image' : 'https://placeimg.com/64/64/3',
			'image' : 'https://proxy.goorm.io/service/62e625b3963aff975fc24b76_d3uwCbw3tlLCJHYu880.run.goorm.io/9080/file/load/Ayoung.jpg?path=d29ya3NwYWNlJTJGVGFEYSUyRmNsb25lX2NvZGUlMkZtYW5hZ2VtZW50JTJGc3JjJTJGY29tcG9uZW50cyUyRkF5b3VuZy5qcGc=&docker_id=d3uwCbw3tlLCJHYu880&secure_session_id=OzerQejxcoY83HfWMzaH7nEh4pV1tjKS',
			'name' : '이아영',
			'birthday' : '010616',
			'gender' : '여자',
			'job' : '디자이너'	 
}])
});

app.listen(port, () => console.log(`Listening in port ${port}`));
