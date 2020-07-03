import React, { Component } from "react";
import MyButton from "../../utils/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

//redux stuff
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.screamId
			)
		)
			return true;
		else return false;
	};

	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	};

	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId);
	};
	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to="/login">
				<MyButton tip="Like">
					<FavoriteBorder color="primary" />
				</MyButton>
			</Link>
		) : this.likedScream() ? (
			<MyButton tip="Undo like" onClick={this.unlikeScream}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="like" onClick={this.likeScream}>
				<FavoriteBorder color="primary" />
			</MyButton>
		);
		return likeButton;
	}
}

LikeButton.propTypes = {
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { likeScream, unlikeScream })(
	LikeButton
);
