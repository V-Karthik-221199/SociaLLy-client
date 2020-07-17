import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/Scream/Scream";
import StaticProfile from "../components/Profile/StaticProfile";

//MUI stuff
import Grid from "@material-ui/core/Grid";

// redux stuff
import { connect } from "react-redux";
import { getUserdata } from "../redux/actions/dataActions";

class user extends Component {
	state = {
		profile: null,
	};
	componentDidMount() {
		const handle = this.props.match.params.handle;
		this.props.getUserdata(handle);
		axios
			.get(`/user/${handle}`)
			.then((res) => {
				this.setState({
					profile: res.data.user,
				});
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { screams, loading } = this.props.data;

		const screamsMarkup = loading ? (
			<p>Loading....</p>
		) : screams === null ? (
			<p>No Screams from this user</p>
		) : (
			screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					{screamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<p>Loading profile......</p>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserdata: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

export default connect(mapStateToProps, { getUserdata })(user);
