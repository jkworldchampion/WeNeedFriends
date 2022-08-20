import React, { Component } from 'react';
import Timeplan from './components/Timeplan';
import PlanAdd from './components/PlanAdd';
import SearchAppBar from './components/SearchAppBar';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: theme.palette.common.black,
		backgroundColor: '#FFEAD8',
    //color: theme.palette.common.white,
		color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
		// backgroundColor: "FFEAD8"
    backgroundColor: "theme.palette.action.hover",
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
			plans: ''
		}
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
	
	render() {
		return (
			<div>
				<SearchAppBar />
				<div align="center">
					<br/>
					<PlanAdd stateRefresh={this.stateRefresh} />
					<br/>
				</div>
				<Paper>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 500 }} aria-label="customized table">
							<TableHead>
								<StyledTableRow>
									<StyledTableCell align="right">출발지</StyledTableCell>
									<StyledTableCell align="right">도착지</StyledTableCell>
									<StyledTableCell align="right">시간</StyledTableCell>
									<StyledTableCell align="right">인원</StyledTableCell>
									<StyledTableCell align="right">이름</StyledTableCell>
									<StyledTableCell align="center">설정</StyledTableCell>
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
				</Paper>
			</div>
		);
	}
}

export default App;
