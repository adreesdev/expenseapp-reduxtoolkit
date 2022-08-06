import React, { useEffect, useState } from "react";
import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	Box,
	Toolbar,
	Typography,
	Button,
	Modal,
	MenuItem,
	DialogActions,
	OutlinedInput,
	Select,
	InputLabel,
	FormControl,
	DialogContent,
	DialogTitle,
	Dialog,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Expenses from "./Expenses";
import ExpenseHeader from "./ExpenseHeader";
import AddExpense from "./AddExpense";
import { useDispatch, useSelector } from "react-redux";
import { closeAdd, openAdd } from "../features/expenseSlice";
// import { saveState } from "../localStorage";

// store.subscribe(() => {
// 	saveState({
// 		tableData: store.getState().tableData,
// 		order: store.getState().order,
// 		orderBy: store.getState().orderBy,
// 		modalAdd: store.getState().modalAdd,
// 		modalEdit: store.getState().modalEdit,
// 		modalDelete: store.getState().modalDelete,
// 	});
// });

const ExpenseContainer = () => {
	const dispatch = useDispatch();
	const { tableData, order, orderBy, modalAdd } = useSelector(
		(state) => state.expense
	);
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState({
		type: "",
		amount: "",
	});

	const [filteredData, setFilteredData] = useState(tableData);

	useEffect(() => {
		setFilteredData(tableData);
	}, [tableData]);
	const [searchData, setSearchData] = useState([]);
	const [search, setSearch] = useState("");

	const filterData = (tableData, filter) => {
		if (filter.type === "" && filter.amount === "") {
			setFilteredData(tableData);
		} else if (filter.type !== "" && filter.amount === "") {
			setFilteredData(tableData.filter((item) => item.type === filter.type));
		} else if (filter.type === "" && filter.amount !== "") {
			if (filter.amount === 500) {
				setFilteredData(tableData.filter((item) => item.amount <= 500));
			} else if (filter.amount === 1000) {
				setFilteredData(
					tableData.filter((item) => item.amount <= 1000 && item.amount > 500)
				);
			} else {
				setFilteredData(tableData.filter((item) => item.amount > 1000));
			}
		} else {
			if (filter.amount === 500) {
				setFilteredData(
					tableData.filter(
						(item) => item.amount <= 500 && item.type === filter.type
					)
				);
			} else if (filter.amount === 1000) {
				setFilteredData(
					tableData.filter(
						(item) =>
							item.amount <= 1000 &&
							item.amount > 500 &&
							item.type === filter.type
					)
				);
			} else {
				setFilteredData(
					tableData.filter(
						(item) => item.amount > 1000 && item.type === filter.type
					)
				);
			}
		}
		setOpen(false);
	};
	useEffect(() => {
		let results = [];
		for (var i = 0; i < filteredData.length; i++) {
			if (
				filteredData[i].name.toLowerCase().indexOf(search.toLowerCase()) === 0
			) {
				results.push(filteredData[i]);
			}
		}

		setSearchData(results);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, filteredData]);

	const handleClickOpen = () => setOpen(true);

	const handleClose = (event, reason) =>
		reason !== "backdropClick" ? setOpen(false) : null;

	const handleClear = () => {
		setFilter({
			type: "",
			amount: "",
		});
		setFilteredData(tableData);
		setOpen(false);
	};

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}
	const getComparator = (order, orderBy) => {
		return order === "desc"
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	};

	return (
		<>
			<Box sx={{ width: "100%", borderRadius: "20px", overflow: "hidden" }}>
				<Paper sx={{ width: "100%" }}>
					<Toolbar
						sx={{
							pl: { sm: 2 },
							pr: { xs: 1, sm: 1 },
						}}
					>
						<Typography
							sx={{ flex: "1 1 100%" }}
							variant="h6"
							id="tableTitle"
							component="div"
						>
							Expenses: {tableData.reduce((a, b) => a + b.amount, 0)}
						</Typography>
						{tableData.length > 0 ? (
							<>
								<TextField
									size="small"
									label="Search"
									variant="outlined"
									onChange={(e) => setSearch(e.target.value)}
								/>
								&nbsp;
								<Button variant="contained" onClick={handleClickOpen}>
									<FilterAltIcon />
								</Button>
							</>
						) : null}
						&nbsp;
						<Button
							variant="contained"
							color="warning"
							onClick={() => dispatch(openAdd())}
						>
							<AddIcon />
						</Button>
						<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
							<DialogTitle>Select the filters</DialogTitle>
							<DialogContent>
								<Box
									component="form"
									sx={{ display: "flex", flexWrap: "wrap" }}
								>
									<FormControl sx={{ m: 1, minWidth: 120 }}>
										<InputLabel htmlFor="filter1">Type</InputLabel>
										<Select
											value={filter.type}
											onChange={(e) =>
												setFilter({ ...filter, type: e.target.value })
											}
											input={<OutlinedInput label="Type" id="filter1" />}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value="Rent">Rent</MenuItem>
											<MenuItem value="Utility">Utility</MenuItem>
											<MenuItem value="Medical">Medical</MenuItem>
											<MenuItem value="Food">Food</MenuItem>
											<MenuItem value="Other">Other</MenuItem>
										</Select>
									</FormControl>
									<FormControl sx={{ m: 1, minWidth: 150 }}>
										<InputLabel id="filter2">Amount</InputLabel>
										<Select
											value={filter.amount}
											onChange={(e) =>
												setFilter({ ...filter, amount: e.target.value })
											}
											input={<OutlinedInput label="Amount" id="filter2" />}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={500}>&#60;= 500</MenuItem>
											<MenuItem value={1000}>&#62; 500 & &#60;= 1000</MenuItem>
											<MenuItem value={1001}>&#62; 1000</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<Button onClick={handleClear}>Clear</Button>
								<Button onClick={() => filterData(tableData, filter)}>
									Ok
								</Button>
							</DialogActions>
						</Dialog>
						<Modal
							open={modalAdd}
							onClose={() => dispatch(closeAdd)}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<AddExpense />
						</Modal>
					</Toolbar>
					{searchData.length > 0 ? (
						<TableContainer>
							<Table sx={{ minWidth: 750 }} aria-label="tableTitle">
								<ExpenseHeader />
								<TableBody>
									{searchData
										.sort(getComparator(order, orderBy))
										.map((row, i) => {
											return <Expenses key={i} row={row} />;
										})}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography sx={{ textAlign: "center" }} variant="h4" py={3}>
							No Expenses.
						</Typography>
					)}
				</Paper>
			</Box>
		</>
	);
};

export default ExpenseContainer;
