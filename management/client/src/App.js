import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const customers = [
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
		//'image' : 'https://placeimg.com/64/64/3',
		'image' : 'https://proxy.goorm.io/service/62e625b3963aff975fc24b76_d3uwCbw3tlLCJHYu880.run.goorm.io/9080/file/load/Ayoung.jpg?path=d29ya3NwYWNlJTJGVGFEYSUyRmNsb25lX2NvZGUlMkZtYW5hZ2VtZW50JTJGc3JjJTJGY29tcG9uZW50cyUyRkF5b3VuZy5qcGc=&docker_id=d3uwCbw3tlLCJHYu880&secure_session_id=OzerQejxcoY83HfWMzaH7nEh4pV1tjKS',
		'name' : '이아영',
		'birthday' : '010616',
		'gender' : '여자',
		'job' : '디자이너'	 
}]

class App extends Component { 
	render() {  
		return (  
			<div>     
				<Table> 
					<TableHead>   
						<TableRow>    
							<TableCell>번호</TableCell>   
							<TableCell>이미지</TableCell>   
							<TableCell>이름</TableCell>     
							<TableCell>생년월일</TableCell> 
							<TableCell>성별</TableCell>       
							<TableCell>직업</TableCell>       
						</TableRow>      
					</TableHead> 
					<TableBody>       
						{customers.map(c => {     
							return <Customer 
											 key={c.id} 
											 id={c.id} 
											 image={c.image} 
											 name={c.name} 
											 birthday={c.birthday} 
											 gender={c.gender} 
											 job={c.job} />      
						})}    
					</TableBody> 
				</Table>   
			</div>   
		); 
	}
}

export default App;
