import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

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


class Timeplan extends React.Component {
	render() {
		return (
			<StyledTableRow>
				<StyledTableCell>{this.props.id}</StyledTableCell>
				<StyledTableCell align="right">{this.props.departure}</StyledTableCell>
				<StyledTableCell align="right">{this.props.arrival}</StyledTableCell>
				<StyledTableCell align="right">{this.props.time}</StyledTableCell>
				<StyledTableCell align="right">{this.props.number}</StyledTableCell>
				<StyledTableCell align="right">{this.props.name}</StyledTableCell>
			</StyledTableRow>
		);
	}
}

export default Timeplan;
