import React, { Component } from 'react';
import Timeplan from './components/Timeplan';
import PlanAdd from './components/PlanAdd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import './App.css';

import { post } from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




class App extends Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			plans: '',
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
		this.setState({
			departure: '',
			arrival: '',
			time: '',
			number: '',
			name: ''
		})
		window.location.reload();
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
	
	
	stateRefresh = () => {   // 상태를 다시 초기화 한 뒤, 고객 값을 불러옴
		this.setState({
			plans: ''
		});
		this.callApi()
			.then(res => this.setState({plans: res}))
			.catch(err => console.log(err));
	}
	
	componentDidMount(){
		this.callApi()
			.then(res => this.setState({plans: res}))
			.catch(err => console.log(err));
	}
	
	callApi = async() => {
		const response = await fetch('/api/plans');
		const body = await response.json();
		return body;
	}
	//
	render() { //
		return (//
			<div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<StyledTableRow>
								<StyledTableCell align="right">출발지</StyledTableCell>
								<StyledTableCell align="right">도착지</StyledTableCell>
								<StyledTableCell align="right">시간</StyledTableCell>
								<StyledTableCell align="right">인원</StyledTableCell>
								<StyledTableCell align="right">이름</StyledTableCell>
								<StyledTableCell align="right">설정</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{this.state.plans ? this.state.plans.map(p => {
								return (
									<Timeplan 
										stateRefresh={this.stateRefresh}
										key={p.id}
										id={p.id}
										departure={p.departure}
										arrival={p.arrival}
										time={p.time}
										number={p.number}
										name={p.name}
									/>
								);
							}) : 
							<StyledTableRow>
								<StyledTableCell colSpan="6" align="center">
										<CircularProgress />
								</StyledTableCell>
							</StyledTableRow>}
						</TableBody>
					</Table>
				</TableContainer>	
				<PlanAdd stateRefresh={this.stateRefresh} />
			</div>
		);
	}
}

export default App;
