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
      main: '#1976d2',
      contrastText: '#fff',
    },
  },
});

class PeopleAdd extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',   // 입력받는 이름
			phonenumber: '',  // 전화번호
			time: '',   // 출발지 도착시간
			peopleopen: false, // 해당 페이지 열림변수
			value: ''
		}
	}
	
	handleClickOpen = () => {
		this.setState({
			peopleopen: true
		})
	}
	
	handleClose = () => {
		this.setState({
			name: '',   
			phonenumber: '', 
			time: '', 
			peopleopen: false
		})
	}
	
	handleValueChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}
	
	handleFormSubmit = (e) => {
		e.preventDefault()
		this.addPeople()
			.then((response) => {
				console.log(response.data);
				this.props.stateRefresh();
		})
		this.setState({
			name: '',   
			phonenumber: '', 
			time: '', 
			peopleopen: false
		})
	}
	
	addPeople = () => {
		const url = '/api/planid';
		const formData = new FormData();
		formData.append('name', this.state.name);
		formData.append('phonenumber', this.state.phonenumber);
		formData.append('time', this.state.time);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config);
	}
	
	render() {
		return (
			<div>
				<ThemeProvider theme={theme}>
					<Button variant="contained" color="neutral" onClick={this.handleClickOpen}>
						같이 타기
					</Button>
				</ThemeProvider>
				<Dialog open={this.state.peopleopen} onClose={this.handleClose}>
					<DialogTitle align="center">내 정보 입력</DialogTitle>
					<DialogContent>
						<br/>
						<TextField label="이름" type="text" name="name" value={this.state.departure} onChange={this.handleValueChange} /><br/>
						<br/>
						<TextField label="전화번호" type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleValueChange} /><br/>
						<br/>
						<TextField label="출발지 도착시간" type="text" name="time" value={this.state.time} onChange={this.handleValueChange} /><br/>
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

export default PeopleAdd;
