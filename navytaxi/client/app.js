import React, { Component } from 'react';
import Timeplan from './components/Timeplan';
import PlanAdd from './components/PlanAdd';
// import SearchAppBar from './components/SearchAppBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


class App extends Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			plans: '',
			searchKeyword: ''
		}
	}
	
	stateRefresh = () => {   // 상태를 다시 초기화 한 뒤, 고객 값을 불러옴
		this.setState({
			plans: '',
			searchKeyword: ''
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
	
	handleValueChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}
	
	render() {
		const filteredComponents = (data) => {
			data = data.filter((c) => {
				return (c.departure.indexOf(this.state.searchKeyword) + c.arrival.indexOf(this.state.searchKeyword)) > -2;
			});
			return data.map((p) => {
				return <Timeplan 
											stateRefresh={this.stateRefresh}
											key={p.id}
											id={p.id}
											departure={p.departure}
											arrival={p.arrival}
											time={p.time}
											number={p.number}
											name={p.name}
										/> 
			})
		}
		
		return (
			<div>
				<Box sx={{ flexGrow: 1 }}>
					<ThemeProvider theme={darkTheme}>
						<AppBar position="static">
							<Toolbar>
								<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} >
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" noWrapcomponent="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
									NavyTaxi
								</Typography>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase placeholder="검색…" inputProps={{ 'aria-label': 'search' }} 
										name="searchKeyword"
										value={this.state.searchKeyword}
										onChange={this.handleValueChange}
										/>
								</Search>
							</Toolbar>
						</AppBar>
					</ThemeProvider>
				</Box>
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
								{this.state.plans ? 
									filteredComponents(this.state.plans) :
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
