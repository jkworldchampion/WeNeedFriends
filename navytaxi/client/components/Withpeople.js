import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PeopleDelete from './PeopleDelete';

class Withpeople extends React.Component {
	
	
	
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.name}</TableCell>
				<TableCell>{this.props.phonenumber}</TableCell>
				<TableCell>{this.props.time}</TableCell>
				<TableCell><PeopleDelete stateRefresh={this.props.stateRefresh} idname={this.props.idname} /></TableCell>
			</TableRow>
		);
	}
}

export default Withpeople;
