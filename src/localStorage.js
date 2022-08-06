export const loadState = () => {
	try {
		const serialState = localStorage.getItem("expenses");
		if (serialState === null) {
			return {
				tableData: [],
				order: "asc",
				orderBy: "amount",
				modalAdd: false,
				modalEdit: false,
				modalDelete: false,
			};
		}
		return JSON.parse(serialState);
	} catch (err) {
		return undefined;
	}
};
export const saveState = (state) => {
	try {
		const serialState = JSON.stringify(state);
		localStorage.setItem("expenses", serialState);
	} catch (err) {
		console.log(err);
	}
};
