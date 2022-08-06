import { Container } from "@mui/material";
import React from "react";
import ExpenseContainer from "./components/ExpenseContainer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const App = () => {
	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Container>
					<br />
					<ExpenseContainer />
				</Container>
			</ThemeProvider>
		</>
	);
};

export default App;
