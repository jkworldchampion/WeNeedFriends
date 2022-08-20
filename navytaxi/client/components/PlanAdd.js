import React from 'react';
import { post } from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#A1A1A1',
      contrastText: '#fff',
    },
  },
});
	
class PlanAdd extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			departure: '',
			arrival: '',
			time: '',
			number: '',
			name: '',
			open: false
		}
	}
	
	handleFormSubmit = (e) => {
		e.preventDefault()
		this.addPlan()
			.then((response) => {
				console.log(response.data);
				this.props.stateRefresh();
		})
		this.setState({
			departure: '',
			arrival: '',
			time: '',
			number: '',
			name: '',
			open: false
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
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config);
	}
	
	handleClickOpen = () => {
		this.setState({
			open: true
		});
	}
	
	handleClose = () => {
		this.setState({
			departure: '',
			arrival: '',
			time: '',
			number: '',
			name: '',
			open: false
		})
	}
	
	render() {
		return (
			<div>
				<ThemeProvider theme={theme}>
					<Button variant="contained" color="neutral" onClick={this.handleClickOpen}>
						계획 추가하기
					</Button>
				</ThemeProvider>
				<Dialog open={this.state.open} onClose={this.handleClose}>
					<DialogTitle align="center">계획 추가</DialogTitle>
					<DialogContent>
						<br/>
						<TextField label="출발지" type="text" name="departure" value={this.state.departure} onChange={this.handleValueChange} /><br/>
						<br/>
						<TextField label="도착(목적)지" type="text" name="arrival" value={this.state.arrival} onChange={this.handleValueChange} /><br/> 
						<br/>
						<TextField label="시간" type="text" name="time" value={this.state.time} onChange={this.handleValueChange} /><br/>
						<br/>
						<TextField label="인원" type="text" name="number" value={this.state.number} onChange={this.handleValueChange} /><br/>
						<br/>
						<TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
						<Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default PlanAdd;
