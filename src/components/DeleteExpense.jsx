import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenseSlice";

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
const DeleteExpense = ({ timestamp }) => {
	const dispatch = useDispatch();

	return (
		<>
			<Box sx={style}>
				<Typography variant="h4">Delete Expense</Typography>

				<Box sx={{ mt: 3 }}>
					<Typography variant="h6">
						Are you sure you want to delete this expense?
					</Typography>
				</Box>
				<Box sx={{ mt: 3 }}>
					<Button
						variant="contained"
						color="error"
						onClick={() => dispatch(deleteExpense({ timestamp }))}
					>
						Confirm
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default DeleteExpense;
