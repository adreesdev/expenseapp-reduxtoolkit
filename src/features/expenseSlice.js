import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import { loadState } from "./localStorage";

const initialState = {
	tableData: [],
	order: "asc",
	orderBy: "amount",
	modalAdd: false,
	modalEdit: false,
	modalDelete: false,
};

const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		openAdd: (state) => {
			state.modalAdd = true;
		},
		closeAdd: (state) => {
			state.modalAdd = false;
		},
		openEdit: (state) => {
			state.modalEdit = true;
		},
		closeEdit: (state) => {
			state.modalEdit = false;
		},

		openDelete: (state) => {
			state.modalDelete = true;
		},
		closeDelete: (state) => {
			state.modalDelete = false;
		},

		addExpense: (state, { payload }) => {
			let now = dayjs();
			let newExpense = {
				type: payload.type,
				name: payload.name,
				amount: +payload.amount,
				date: now.format("MMMM-DD-YYYY / HH:mm:ss"),
				timestamp: now.unix(),
			};
			state.tableData.push(newExpense);
			state.modalAdd = false;
		},

		editExpense: (state, { payload }) => {
			state.tableData = state.tableData.map((expense) => {
				if (expense.timestamp === payload.timestamp) {
					expense.name = payload.names;
					expense.amount = payload.amounts;
					expense.type = payload.types;
				}
				return expense;
			});
			state.modalEdit = false;
		},
		deleteExpense: (state, { payload }) => {
			state.tableData = state.tableData.filter(
				(expense) => expense.timestamp !== payload.timestamp
			);
			state.modalDelete = false;
		},
		requestSort: (state, { payload }) => {
			const isAsc = state.orderBy === payload.property && state.order === "asc";

			state.order = isAsc ? "desc" : "asc";
			state.orderBy = payload.property;
		},
	},
});

export const {
	openAdd,
	closeAdd,
	openEdit,
	closeEdit,
	openDelete,
	closeDelete,
	addExpense,
	editExpense,
	deleteExpense,
	requestSort,
} = expenseSlice.actions;

export default expenseSlice.reducer;
