import React, { Component } from "react";
import { Button, ButtonGroup, Container, Alert } from 'reactstrap';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from "axios";
import color from "@material-ui/core/colors/amber";
import FeedBackForm from 'components/form/FeedBackForm'
import { withRouter } from "react-router-dom";
import { Popover } from '@material-ui/core';
//import Alert from 'react-bootstrap/Alert'
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
//import { ListItemText } from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


class Suggestions extends Component {
	constructor() {
		super();
		this.state = {
			userid: "",
			open: false,
			tl: false
		}

	}
	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true
			,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};


	callThis = (id) => {
		//this.setState({ id: id })
		//console.log("Hello i am ID : ", id);
		this.setState({ userid: id })
		var userid = localStorage.getItem('userid');
		axios.put(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/users/${userid}/subscribe`, id)
			.then(res => {
				console.log(res);
				if (res.data.length === 0)
					this.setState({ tl: true })
				//return <FeedBackForm id={id} />;
			})
			.catch(err =>
				console.log(err)
			)
	}

	feedback = (id, number) => {

		this.feedback = this.feedback.bind(this);
		localStorage.setItem('courseNumber', number)
		//history.push
		this.setState({ userid: id })
		//	console.log("feedback is called : ", id, " state", this.state.userid);
		this.props.history.push({
			pathname: "/admin/feedbackforms",
			state: {
				userid: id
			}
		});
		// location = "http://localhost:3000/form"
		// this.props.history.pushState(this.state.id, document.title, location.href);
		//this.props.history.push("http://localhost:3000/form");
		//window.location.href = "http://localhost:3000/form"
	}

	render() {
		const options = this.props.results.map(r =>
			// {/* <tr><td>{r.courseName}</td></tr> */}

			<li>{r.courseName}  <Button onClick={() => this.callThis(r.id)}>Subscribe</Button> <Button onClick={() => this.feedback(r.id, r.courseNumber)}>Feedback</Button></li>

		);

		return (
			<div>


				<Snackbar
					place="tr"
					color="success"
					icon={AddAlert}
					message="You cannot subscribe as you are out of coins ! Please provide more feedbacks to earn coins !."
					open={this.state.tl}
					closeNotification={() => this.setState({ tl: false })}
					close
				/>
				<ul>{options}</ul>
			</div>

		)
			;
	}
}
// const Suggestions = props => {


// };

export default withRouter(Suggestions);
