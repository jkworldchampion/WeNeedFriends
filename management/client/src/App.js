import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends Component { 
	
	constructor(props) {
		super(props);
		this.state = {
			customers: '',
			completed: 0
		}
	}
	
	stateRefresh = () => {
		this.setState({
			customers: '',
			completed: 0
		});
		this.callApi()
			.then(res => this.setState({customers: res}))
			.catch(err => console.log(err));
	}
	
	componentDidMount(){
		this.timer = setInterval(this.progress, 100);
		this.callApi()
			.then(res => this.setState({customers: res}))
			.catch(err => console.log(err));
	}
	
	callApi = async () => {
		const response = await fetch('api/customers');
		const body = await response.json();
		return body;
	}
	
	progress = () => {
		const { completed } = this.state;
		this.setState({ completed: completed >= 100 ? 0 : completed + 1});
	}
	
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
						{this.state.customers ? this.state.customers.map(c => {
							return <Customer 
											 key={c.id} 
											 id={c.id} 
											 image={c.image} 
											 name={c.name} 
											 birthday={c.birthday} 
											 gender={c.gender} 
											 job={c.job} />      
						}) : 
						<TableRow>
							<TableCell colSpan="6" align="center">
								<CircularProgress variant="determinate" value={this.state.completed} /> 
							</TableCell> 
						</TableRow>
						}    
					</TableBody> 
				</Table>
				<CustomerAdd stateRefresh={this.stateRefresh}/>
			</div>   
		); 
	}
}

export default App;
