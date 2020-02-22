import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0"
		, textAlign: "left"
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none"
	}
};

const useStyles = makeStyles(styles);

export default function FAQ() {
	const classes = useStyles();
	return (
		<div>
			<GridContainer>

				<GridItem xs={12} sm={12} md={12}>
					<Card profile>

						<CardBody profile>
							<h1 className={classes.cardCategory}>Frequently Asked Questions </h1>
							<h2 className={classes.cardTitle}>Course Rater</h2>
							<h3 align="left" >
								Q. How can I earn points ? </h3>
							<h3 align="left" >
								A. You can earn points by providing feedback for the courses you are already enrolled in  </h3>
							<h3 align="left" >
								Q. How can I subscribe to Courses ? </h3>
							<h3 align="left" >
								A. You can subscribe to Courses by clicking on the Search Courses option on the Sidebar, start typing and all the available courses show up. Next to the course name you will find the button to subscribe to a course </h3>
							<h3 align="left" >
								Q. How can provide feedback to Courses ? </h3>
							<h3 align="left" >
								A. You can provide feedback to Courses by clicking on the Search Courses option on the Sidebar, start typing and all the available courses show up. Next to the course name you will find the button to provide feedback to a course </h3>
							<h3 align="left" >
								Q. What do the graphs on the dashboard indicate ? </h3>
							<h3 align="left" >
								A. The graphs on the dashboard are the feedbacks received by a course from the other students. Each of the course is rated based on the number of assignments , midterms, time consumed per week etc. And a graph is plotted based on the responses recieved  </h3>
							<h3 align="left" >
								Q. Where can I view the courses I have already subscribed to ? </h3>
							<h3 align="left" >
								A.You can view the subscribed courses by clicking on the course dashboard option on the sidebar  </h3>
							<Button color="primary" round>
								Back to Course Dashboard
              </Button>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
