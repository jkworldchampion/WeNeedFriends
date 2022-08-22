import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import PlanDelete from './PlanDelete';
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

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	
	return (
	<React.Fragment>
		<StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
			<StyledTableCell>
				<IconButton
					aria-label="expand row"
					size="small"
					onClick={() => setOpen(!open)}
				>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box sx={{ margin: 1 }}>
						<Typography variant="h6" gutterBottom component="div">
							같이타는 사람
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
	)
}

class Timeplan extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			setOpen: false
		}
	}
	
	render() {		
		return (
			<StyledTableRow>
				<StyledTableCell width="10">
					<IconButton
					aria-label="expand row"
					size="small"
					onClick={() => this.state.setOpen(!this.state.open)}
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
		);
	}
}

export default Timeplan;
