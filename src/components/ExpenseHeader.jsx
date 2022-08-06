import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import React from "react";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import { requestSort } from "../features/expenseSlice";

const headCells = [
	{
		id: "name",
		numeric: false,
		label: "Name",
	},
	{
		id: "type",
		numeric: false,
		label: "Type",
	},
	{
		id: "amount",
		numeric: false,
		label: "Amount",
	},
	{
		id: "timestamp",
		numeric: false,
		label: "Date",
	},
];

const ExpenseHeader = () => {
	const dispatch = useDispatch();
	const { order, orderBy } = useSelector((state) => state.expense);
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={() => dispatch(requestSort({ property: headCell.id }))}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell>Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default ExpenseHeader;
