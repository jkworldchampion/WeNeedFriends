import React from 'react';
import { post } from 'axios';

class planAdd extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			departure: '',
			arrival: '',
			time: '',
			number: '',
			name: ''
		}
	}
	
	handelFormSubmit = (e) => {
		e.preventDefault()
		this.addPlan()
			.then((response) => {
				console.log(response.data);
		})
	}
	
	handleValueChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}
	
	addPlan = () => {
		const url = '/api/plans';
		const formData = new FormData();
		formData.append('departure', this.state.departure);
		formData.append('arrival', this.state.arrival);
		formData.append('time', this.state.time);
		formData.append('number', this.state.number);
		formData.append('name', this.state.name);
		return post(url, formData);
	}
	
	render() {
		return (
			<form onSubmit={this.handelFormSubmit}>
				<h1>계획 추가</h1>
				출발지: <input type="text" name="departure" value={this.state.departure} onChange={this.handleValueChange} /><br/>
				도착(목적)지: <input type="text" name="arrival" value={this.state.arrival} onChange={this.handleValueChange} /><br/> 
				시간: <input type="text" name="time" value={this.state.time} onChange={this.handleValueChange} /><br/>
				인원: <input type="text" name="number" value={this.state.number} onChange={this.handleValueChange} /><br/>
				이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
				<button type="submit"> 추가하기</button>
			</form>
		)
	}
}

export default planAdd;
