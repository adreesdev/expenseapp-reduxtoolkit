import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editExpense } from "../features/expenseSlice";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
};

const EditExpense = ({ name, amount, type, timestamp }) => {
	const dispatch = useDispatch();

	const [names, setNames] = useState(name);
	const [amounts, setAmounts] = useState(amount);
	const [types, setTypes] = useState(type);
	return (
		<>
			<Box sx={style}>
				<Typography variant="h4">Edit Expense</Typography>
				<Box sx={{ mt: 3 }}>
					<TextField
						label="Name"
						variant="outlined"
						value={names}
						onChange={(e) => setNames(e.target.value)}
					/>
				</Box>
				<Box sx={{ mt: 3 }}>
					<FormControl sx={{ minWidth: 220 }}>
						<InputLabel htmlFor="filter1">Type</InputLabel>
						<Select
							value={types}
							onChange={(e) => setTypes(e.target.value)}
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
				</Box>
				<Box sx={{ mt: 3 }}>
					<TextField
						label="Amount"
						type="number"
						variant="outlined"
						value={amounts}
						onChange={(e) => setAmounts(e.target.value)}
					/>
				</Box>
				<Box sx={{ mt: 3 }}>
					<Button
						variant="contained"
						color="success"
						onClick={() =>
							dispatch(editExpense({ names, amounts, types, timestamp }))
						}
					>
						Update
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default EditExpense;
