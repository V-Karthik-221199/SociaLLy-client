import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";

//utils
import AuthRoute from "./utils/AuthRoute";

//components
import Navbar from "./components/Layout/Navbar";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "33c9dc",
			main: "#00bcd4",
			dark: "#008394",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff6333",
			main: "#ff3d00",
			dark: "#b22a00",
			contrastText: "#fff",
		},
	},
	typography: {
		useNextVariants: true,
	},
	spreadIt: {
		form: {
			textAlign: "center",
		},
		image: {
			margin: " 20px auto 20px auto",
		},
		pageTitle: {
			margin: "10px auto 10px auto",
		},
		textField: {
			margin: "10px auto 10px auto",
		},
		button: {
			marginTop: 20,
			position: "relative",
		},
		customError: {
			color: "red",
			fontSize: "0.8rem",
			marginTop: 10,
		},
		small: {
			marginTop: 30,
		},
		progress: {
			position: "absolute",
		},
		invisibleSeparator: {
			border: "none",
			margin: 4,
		},
		visibleSeparator: {
			width: "100%",
			borderBottom: "1px solid rgba(0,0,0,0.1)",
			marginBottom: 20,
		},
	},
});

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = "/login";
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common["Authorization"] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
							<AuthRoute exact path="/login" component={login} />
							<AuthRoute exact path="/signUp" component={signUp} />
						</Switch>
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
