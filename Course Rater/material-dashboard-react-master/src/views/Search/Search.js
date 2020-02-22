import React, { Component } from "react";
import axios from "axios";
import Suggestions from "../../layouts/Suggestions"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import { TableHead } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Warning from "@material-ui/icons/Warning";
import Icon from "@material-ui/core/Icon";
import Danger from "components/Typography/Danger.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

class Search extends Component {
	state = {
		query: "",
		results: [],
		coins: 0
	};
	componentDidMount = () => {
		var userId = localStorage.getItem('userid');
		//console.log(courseNumber)
		axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/coins', userId).then((res, err) => {
			this.setState({ coins: res.data });
			console.log('Coins:  ', this.state.coins);
			if (err)
				console.log(err);
		})

	}

	handleInputChange = () => {
		this.setState({
			query: this.search.value
		});
	};
	getInfo = () => {
		axios
			.get(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/filterCourses?query=` + this.state.query)
			.then(response => {
				console.log(JSON.stringify(response));
				this.setState({ results: response.data });
			})
			.catch(error => console.log(error.response));
	};
	handleInputChange = () => {
		this.setState(
			{
				query: this.search.value
			},
			() => {
				if (this.state.query && this.state.query.length >= 3) {
					this.getInfo();
				} else if (!this.state.query) {
					this.setState({ results: [] });
				}
			}
		);
	};



	render() {
		const { classes } = this.props;
		return (
			<div>
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
				<form>
					<input
						placeholder="Search for..."
						ref={input => (this.search = input)}
						onChange={this.handleInputChange}
					/>

					<Suggestions results={this.state.results} />
				</form>
			</div>
		);
	}
}

Search.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);