import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import PlanDelete from './PlanDelete';
import Withpeople from './Withpeople';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



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

const pp = [
	{
		"id":1,
		"name":"박주환",
		"phonenumber":"010-7110-8128",
		"time":"1805"
	},
	{
		"id":1,
		"name":"정의철",
		"phonenumber":"010-4039-3970",
		"time":"1810"
	},
	{
		"id":2,
		"name":"황동원",
		"phonenumber":"010-2736-1234",
		"time":"1500"
	},
	{
		"id":2,
		"name":"김김김",
		"phonenumber":"010-1456-1234",
		"time":"1500"
	},
	{
		"id":2,
		"name":"박박박",
		"phonenumber":"010-1478-5534",
		"time":"1500"
	}
]

class Timeplan extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			people: ''
		}
	}
	
	handleClick = () => {
		this.setState({
			open: !this.state.open
		});
	}
	
	// 각 계획에 대한 사람들 정보 불러오기	
	componentDidMountPeople() {
		this.callpeople()
			.then(res => this.setState({people: res}))
			.catch(err => console.log(err));
	}
	
	callpeople = async() => {
		const response = await fetch('/api/planid');
		const body = await response.json();
		return body;
	}
	
	render() {		
		return (
			<React.Fragment>
				<StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
					<StyledTableCell>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={this.handleClick}
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</StyledTableCell>
					<StyledTableCell align="right">{this.props.departure}</StyledTableCell>
					<StyledTableCell align="right">{this.props.arrival}</StyledTableCell>
					<StyledTableCell align="right">{this.props.time}</StyledTableCell>
					<StyledTableCell align="right">{this.props.number}</StyledTableCell>
					<StyledTableCell align="right">{this.props.name}</StyledTableCell>
					<StyledTableCell align="center"><PlanDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></StyledTableCell> 
				</StyledTableRow>
				<StyledTableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									Together
								</Typography>
							<Table size="small" aria-label="together">
								<TableHead>
									<TableRow>
										<TableCell>이름</TableCell>
										<TableCell>전화번호</TableCell>
										<TableCell>출발지 도착시간</TableCell>
									</TableRow>
								</TableHead>	
								<TableBody>
									<div>
										{this.props.people.map((p, index) => {
											let i = Math.floor(Math.random() * 1000+1)
											return (
												<Withpeople
													key={i}
													name={p.name}
													phonenumber={p.phonenumber}
													time={p.time}
												/>
											);
										})}
									</div>
									<TableRow>
										<TableCell>이름이다</TableCell>
										<TableCell>전화번호다</TableCell>
										<TableCell>출발지 도착시간이다</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							</Box>
						</Collapse>
					</TableCell>
				</StyledTableRow>
			</React.Fragment>
			// <StyledTableRow>
			// 	<StyledTableCell width="10">
			// 		<IconButton
			// 		aria-label="expand row"
			// 		size="small"
			// 		onClick={() => this.state.setOpen(!this.state.open)}
			// 	>
			// 		{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			// 	</IconButton>
			// 	</StyledTableCell>
			// 	<StyledTableCell align="right">{this.props.departure}</StyledTableCell>
			// 	<StyledTableCell align="right">{this.props.arrival}</StyledTableCell>
			// 	<StyledTableCell align="right">{this.props.time}</StyledTableCell>
			// 	<StyledTableCell align="right">{this.props.number}</StyledTableCell>
			// 	<StyledTableCell align="right">{this.props.name}</StyledTableCell>
			// 	<StyledTableCell align="center"><PlanDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></StyledTableCell> 
			// </StyledTableRow>
		);
	}
}

export default Timeplan;
