import React, { Component } from 'react'
import axios from 'axios'
//import { MDBRangeInput, MDBRow } from "mdbreact";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
//import Slider from '../Slider'
//import {updateFeedback} from "../../actions/FeedbackFormAction";
//import { colors } from 'material-ui/styles';
import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
class FeedBackForm extends Component {
	constructor() {
		super();
		this.state = {
			courseId: "",
			timeConsumedPerWeek: 0,
			assignDifficulty: 0,
			midtermDifficulty: 0,
			finalDifficulty: 0,
			overallDifficulty: 0,
			courses: [],
			coins: 0,
			open: false,
			tl: false
		}
	}
	componentDidMount() {
		var userId = localStorage.getItem('userid');
		//console.log(courseNumber)
		axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/coins', userId).then((res, err) => {
			this.setState({ coins: res.data });
			console.log('Coins:  ', this.state.coins);
			if (err)
				console.log(err);
		})
		console.log('Feedback form id : ', localStorage.getItem('courseNumber'));
		axios
			.put(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/coursenumber`, localStorage.getItem('courseNumber'))
			.then(response => {
				console.log(JSON.stringify(response))
				this.setState({ courses: response.data })
			})
			.catch(error => console.log(error.response));
		var userId = localStorage.getItem('userid');
		//console.log(courseNumber)
		axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/coins', userId).then((res, err) => {
			this.setState({ coins: res.data });
			console.log('Coins:  ', this.state.coins);
			if (err)
				console.log(err);
		})
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
	onChangeSlide(data) {
		this.setState({ assignDifficulty: parseInt(data[0]) });
		console.log(this.state.assignDifficulty) // logs the value
	}
	onChangeSlide1(data) {
		this.setState({ midtermDifficulty: parseInt(data[0]) });
		console.log(this.state.midtermDifficulty) // logs the value
	}
	onChangeSlide2(data) {
		this.setState({ finalDifficulty: parseInt(data[0]) });
		console.log(this.state.finalDifficulty) // logs the value
	}
	onChangeSlide3(data) {
		this.setState({ overallDifficulty: parseInt(data[0]) });
		console.log(this.state.overallDifficulty) // logs the value
	}
	onChangeSlide4(data) {
		this.setState({ timeConsumedPerWeek: parseInt(data[0]) });
		console.log(this.state.timeConsumedPerWeek) // logs the value
	}

	onChangeDropDown = e => { console.log("Changed") }

	// onChangeSlide = e =>{
	// 	this.setState({ [e.target.id]: e.target.value });
	// }
	onSubmit = e => {
		e.preventDefault();
		console.log("submitted");
		const newFeedback = {
			courseId: this.state.courses.id,
			assignDifficulty: this.state.assignDifficulty,
			midtermDifficulty: this.state.midtermDifficulty,
			finalDifficulty: this.state.finalDifficulty,
			overallDifficulty: this.state.overallDifficulty,
			timeConsumedPerWeek: this.state.timeConsumedPerWeek
		};
		console.log("submitted");
		//debugger;
		axios
			.post("http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/addfeedback", newFeedback)
			.then(res => {
				console.log(res);
				console.log(newFeedback)
				console.log("Successful")
				var userId = localStorage.getItem('userid');
				//console.log(courseNumber)
				axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/addcoins', userId).then((res, err) => {
					this.setState({ coins: res.data });
					console.log('Coins:  ', this.state.coins);
					this.setState({ tl: true })
					if (err)
						console.log(err);
				})
			})
			.catch(err =>
				console.log(err)
			);

	};

	render() {
		const { classes } = this.props;
		const coins = Object.keys(this.state.courses).map((key) => (
			<div className="container">
				{/* <span className="left">{key}</span> */}
				<span className="right"><h1 value={this.state.courses[key].courseName} displayType={'text'} /></span>
			</div>
		));

		return (
			<div className="App">
				{/* {this.state.courses.map((key) => (
					<div key={key}>
						{key.courseName}
					</div>
				))} */}
				<Snackbar
					place="tr"
					color="success"
					icon={AddAlert}
					message="Your Feedback has been submitted successfully."
					open={this.state.tl}
					closeNotification={() => this.setState({ tl: false })}
					close
				/>
				<GridContainer>

					<GridItem xs={12} sm={6} md={3}>
						<Card>
							<CardHeader color="warning" stats icon>
								<CardIcon color="warning">
									<Icon>content_copy</Icon>
								</CardIcon>
								<p className={classes.cardCategory}>Used Coins</p>
								<h3 className={classes.cardTitle}>
									{this.state.coins}/100 <small>coins</small>
								</h3>
							</CardHeader>
							<CardFooter stats>
								<div className={classes.stats}>
									<Danger>
										<Warning />
									</Danger>
									<a href="#pablo" onClick={e => e.preventDefault()}>
										Get more coins
                </a>
								</div>
							</CardFooter>
						</Card>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={6} sm={6} md={6}>
						<Card chart>
							<CardHeader color="success">
								<h1>Feedback Form</h1>
							</CardHeader>
							<CardBody>
								{/* <h4 className={classes.cardTitle}> Course Difficulty</h4> */}
								<p className={classes.cardCategory}>
									<p className={classes.cardCategory}>Course Name : {this.state.courses.courseName}</p>
									<br />
									<p className={classes.cardCategory}>Department : {this.state.courses.department}</p>
									<br />
									<p className={classes.cardCategory}>Course Number {this.state.courses.courseNumber}</p>
									<br />
									<p className={classes.cardCategory}>Subject : {this.state.courses.subject}</p>
									<br />
									<p>Rate the difficulty of the Assignment </p>
									<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide.bind(this)}
										ref="NoUiSlider"
										tooltips connect
									// onChangeSlide = {this.onChangeSlide}
									// id = "assignDifficulty"
									/>
									<p>Rate the difficulty of the Midterm </p>
									<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide1.bind(this)}
										ref="NoUiSlider"
										tooltips connect
									// onChangeSlide = {this.onChangeSlide}
									// id = "midtermDifficulty"
									/>

									<p>Rate the difficulty of the FinalExam </p>
									<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide2.bind(this)}
										ref="NoUiSlider"
										tooltips connect
									// onChangeSlide = {this.onChangeSlide}
									// id = "finalDifficulty"
									/>
									<p>Rate the Overall difficulty of the Course </p>
									<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide3.bind(this)}
										ref="NoUiSlider"
										tooltips connect
									// onChangeSlide = {this.onChangeSlide}
									// id = "overallDifficulty"
									/>
									<p>Time Consumed per week </p>
									<Nouislider range={{ min: 0, max: 40 }} start={[15]} onSlide={this.onChangeSlide4.bind(this)}
										ref="NoUiSlider"
										tooltips connect
									// onChangeSlide = {this.onChangeSlide}
									// id = "overallDifficulty"
									/>
									<span className={classes.successText}>

									</span>{" "}
									Diffculty based on assigments , midterms and  finals in the range 1-10
              </p>
							</CardBody>
							<CardFooter chart>
								<div className={classes.stats}>
									<button
										style={{
											width: "150px",
											borderRadius: "3px",
											letterSpacing: "1.5px",
											marginTop: "1rem"
										}}
										type="submit"
										className="btn btn-large waves-effect waves-light hoverable blue accent-3"
										onClick={this.onSubmit}
									>
										Submit
                </button>
								</div>
							</CardFooter>
						</Card>
					</GridItem>
				</GridContainer>
				{/* <div class="row">
					<div class="col s12 m12">
						<div class="card">
							<div class="card-content">
								<span class="card-title"><h3 >Feedback Form </h3></span>
								<div className="row">
									<div className="col s3">
										<label>Course Name : {this.state.courses.courseName}</label>
										<br />
										<label>Department : {this.state.courses.department}</label>
										<br />
										<label>Course Number {this.state.courses.courseNumber}</label>
										<br />
										<label>Subject : {this.state.courses.subject}</label>
									</div>

								</div>
								<div className="row">
									<div className="col s3">
										<label>Rate the difficulty of the Assignment </label>
										<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide.bind(this)}
											ref="NoUiSlider"
											tooltips connect
										// onChangeSlide = {this.onChangeSlide}
										// id = "assignDifficulty"
										/>

									</div>

									<div className="col s3">
										<label>Rate the difficulty of the Midterm </label>
										<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide1.bind(this)}
											ref="NoUiSlider"
											tooltips connect
										// onChangeSlide = {this.onChangeSlide}
										// id = "midtermDifficulty"
										/>
									</div>
								</div>
								<br />
								<div className="row">

									<div className="col s3">
										<label>Rate the difficulty of the FinalExam </label>
										<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide2.bind(this)}
											ref="NoUiSlider"
											tooltips connect
										// onChangeSlide = {this.onChangeSlide}
										// id = "finalDifficulty"
										/>
									</div>
									<div className="col s3">
										<label>Rate the Overall difficulty of the Course </label>
										<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide3.bind(this)}
											ref="NoUiSlider"
											tooltips connect
										// onChangeSlide = {this.onChangeSlide}
										// id = "overallDifficulty"
										/>
									</div>
									<div className="col s3">
										<label>Time Consumed per week </label>
										<Nouislider range={{ min: 0, max: 40 }} start={[15]} onSlide={this.onChangeSlide4.bind(this)}
											ref="NoUiSlider"
											tooltips connect
										// onChangeSlide = {this.onChangeSlide}
										// id = "overallDifficulty"
										/>
									</div>
									{/* </div>
								{/* <div className="row">
									<div className="col s3">
										{/* <label>Rate the difficulty of the Course </label>
										<Nouislider range={{ min: 0, max: 10 }} start={[5]} onSlide={this.onChangeSlide.bind(this)}
											ref="NoUiSlider"
											tooltips connect /> */}
				{/* </div>
									<div className="col s3">


										<label className=" align-left">Rate the difficulty of the Course </label>
										<Slider /> */}




				{/* <Slider
							value={0}
							min={0}
							max={10}
							ticks
							markers={[{ value: 3, label: 'Three' }, { value: 8, label: 'Eight' }]}
							onChange={this.handleChange} />
									</div>
									<div className="col s3">

									</div> */}
				{/* </div>
			<div className="col s12" style={{ paddingLeft: "11.250px" }}>

			</div>
							</div >
						</div >
					</div >
				</div > * /} */}
			</div >

		);
	}

}

FeedBackForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedBackForm);
