import React from "react";
import { TableRow, TableCell, Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";
import { useDispatch, useSelector } from "react-redux";
import {
	closeDelete,
	closeEdit,
	openDelete,
	openEdit,
} from "../features/expenseSlice";

let timestamp;
let name, amount, type;

const Expenses = ({ row }) => {
	const dispatch = useDispatch();
	const { modalEdit, modalDelete } = useSelector((state) => state.expense);

	let deleteEx = () => {
		dispatch(openDelete());
		timestamp = row.timestamp;
	};
	let EditEx = () => {
		dispatch(openEdit());
		name = row.name;
		amount = row.amount;
		type = row.type;
		timestamp = row.timestamp;
	};
	return (
		<>
			<TableRow hover tabIndex={-1}>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="left">{row.type}</TableCell>
				<TableCell align="left">{row.amount}</TableCell>
				<TableCell align="left">{row.date}</TableCell>
				<TableCell>
					<Button variant="contained" color="success" onClick={EditEx}>
						<EditIcon />
					</Button>
					<Modal
						open={modalEdit}
						onClose={() => dispatch(closeEdit())}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<EditExpense
							name={name}
							amount={amount}
							type={type}
							timestamp={timestamp}
						/>
					</Modal>
					&nbsp;
					<Button variant="contained" color="error" onClick={deleteEx}>
						<DeleteIcon />
					</Button>
					<Modal
						open={modalDelete}
						onClose={() => dispatch(closeDelete())}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<DeleteExpense timestamp={timestamp} />
					</Modal>
				</TableCell>
			</TableRow>
		</>
	);
};

export default Expenses;
