import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
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

import { bugs, website, server } from "variables/general.js";

import {
	dailySalesChart,
	emailsSubscriptionChart,
	completedTasksChart,
	dataPie,
	timePie
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
	const [data, setData] = useState([]);
	const [assign, setAssign] = useState([]);
	const [midTerm, setMid] = useState([]);
	const [over, setOver] = useState([]);
	const [time, setTime] = useState([]);
	const [courseNumber, setCN] = useState([]);
	const [coins, setCoins] = useState([]);
	const [courseName, setCourseName] = useState([]);
	useEffect(() => {
		var courseNumber = localStorage.getItem('courseNumber');
		var id = localStorage.getItem('courseId');
		var userId = localStorage.getItem('userid');
		console.log(courseNumber)
		axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/coins', userId).then((res, err) => {
			setCoins(res.data);
			//console.log('Coins:  ', res.data);
			if (err)
				console.log(err);
		})
		axios.post('http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/retrievegrades', courseNumber).then((res, err) => {
			setData(res.data);
			console.log('Retrieve ', res.data[0].courseName);
			setCourseName(res.data[0].courseName)
			if (err)
				console.log(err);
		})
		axios.get(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/assignresponse/${id}`).then((res, err) => {
			setAssign(res.data);
			console.log('assign : ', res.data);
			if (err)
				console.log(err);
		})
		axios.get(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/midtermresponse/${id}`).then((res, err) => {
			setMid(res.data);
			//	console.log(res.data);
			if (err)
				console.log(err);
		})
		axios.get(`http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/overallresponse/${id}`).then((res, err) => {
			setOver(res.data);
			//console.log(data);
			if (err)
				console.log(err);
		})
		axios.get(`'http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/timeconsumedperweek/${id}`).then((res, err) => {
			setTime(res.data);
			//console.log(data);
			if (err)
				console.log(err);
		})
	}, []);
	const classes = useStyles();
	const listItems = data.map((data) =>
		<li key={data.id}>{data.termDescription} {data.department} {data.subject}</li>
	);
	console.log(assign)
	var res = [];
	var assignmentDifficulty = assign;


	// for (var a in assign) {
	// 	assignmentDifficulty += a;
	// }
	var midTermDifficulty = midTerm;

	// for (var j = 0; j < midTerm.length; j++) {
	// 	midTermDifficulty += midTerm[j];
	// }
	var overDifficulty = over;

	// for (var j = 0; j < over.length; j++) {
	// 	overDifficulty += over[j];
	// }

	var timeconsumedperweek = time;

	// for (var j = 0; j < time.length; j++) {
	// 	timeconsumedperweek += time[j];
	// }
	var chartData = [];
	chartData.push(assignmentDifficulty);
	chartData.push(midTermDifficulty);
	chartData.push(overDifficulty);
	chartData.push(overDifficulty);
	// for (var ch in chartData) {
	// 	console.log('checldks ' + chartData[ch]);
	// }
	var linechartData = {
		labels: ["Assignments", "Mid Terms", "Finals", "Projects"],
		series: [chartData]
	}

	var pieChartData = {
		labels: [
			"Overall Difficulty-" + overDifficulty,
			""
		],
		series: [
			{ meta: "A value is:", value: overDifficulty },
			{ meta: "B value is:", value: 10 - overDifficulty }
		],
		colors: ["#111", "#000"]

	}

	var timeChartData = {
		labels: [
			"Time Consumed-" + timeconsumedperweek,
			""
		],
		series: [
			{ meta: "A value is:", value: timeconsumedperweek },
			{ meta: "B value is:", value: 40 - timeconsumedperweek }
		],
		colors: ["#111", "#000"]

	}
	//linechartData.push(chartData)
	for (var j = 0; j < data.length; j++) {
		var array = Object.values(data[j]);
		//console.log(array);
		var arr = [];

		for (var i = 1; i < array.length; i++) {
			arr.push(array[i]);
		}
		res.push(arr);
	}

	return (
		<div>
			<div>
				<h3 className={classes.cardTitle}>
					{courseName}
				</h3>
			</div>
			<GridContainer>

				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="warning" stats icon>
							<CardIcon color="warning">
								<Icon>content_copy</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Used Coins</p>
							<h3 className={classes.cardTitle}>
								{coins}/100 <small>coins</small>
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
				{/* <GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="success" stats icon>
							<CardIcon color="success">
								<Store />
							</CardIcon>
							<p className={classes.cardCategory}>Revenue</p>
							<h3 className={classes.cardTitle}>$34,245</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<DateRange />
								Last 24 Hours
              </div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="danger" stats icon>
							<CardIcon color="danger">
								<Icon>info_outline</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Fixed Issues</p>
							<h3 className={classes.cardTitle}>75</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<LocalOffer />
								Tracked from Github
              </div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="info" stats icon>
							<CardIcon color="info">
								<Accessibility />
							</CardIcon>
							<p className={classes.cardCategory}>Followers</p>
							<h3 className={classes.cardTitle}>+245</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<Update />
								Just Updated
              </div>
						</CardFooter>
					</Card>
				</GridItem> */}
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart>
						<CardHeader color="success">
							<ChartistGraph
								className="ct-chart ct-perfect-fourth"
								data={linechartData}
								type="Line"
								options={dailySalesChart.options}
								listener={dailySalesChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}> Course Difficulty</h4>
							<p className={classes.cardCategory}>
								<span className={classes.successText}>

								</span>{" "}
								Diffculty based on assigments , midterms and  finals in the range 1-10
              </p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> updated 4 minutes ago
              </div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart>
						<CardHeader color="blue">
							<ChartistGraph
								className="ct-chart ct-perfect-fourth"
								data={pieChartData}
								type="Pie"
							// responsiveOptions={emailsSubscriptionChart.responsiveOptions}
							// listener={emailsSubscriptionChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}>Overall Course Difficulty</h4>
							<p className={classes.cardCategory}>Red - Overall Difficulty, Pink - Not Difficult</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> Updated 2 mins ago
              </div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart>
						<CardHeader color="blue">
							<ChartistGraph
								className="ct-chart ct-perfect-fourth"
								data={timePie.data}
								type="Pie"
								options={timePie.options}
								listener={completedTasksChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}>Time Consumed per week</h4>
							<p className={classes.cardCategory}>Red - Time Consumed, Pink - Time left</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> Updated 2 mins ago
              </div>
						</CardFooter>
					</Card>
				</GridItem>
			</GridContainer>
			<GridContainer>
				{/* <GridItem xs={12} sm={12} md={6}>
					<CustomTabs
						title="Tasks:"
						headerColor="primary"
						tabs={[
							{
								tabName: "Bugs",
								tabIcon: BugReport,
								tabContent: (
									<Tasks
										checkedIndexes={[0, 3]}
										tasksIndexes={[0, 1, 2, 3]}
										tasks={bugs}
									/>
								)
							},
							{
								tabName: "Website",
								tabIcon: Code,
								tabContent: (
									<Tasks
										checkedIndexes={[0]}
										tasksIndexes={[0, 1]}
										tasks={website}
									/>
								)
							},
							{
								tabName: "Server",
								tabIcon: Cloud,
								tabContent: (
									<Tasks
										checkedIndexes={[1]}
										tasksIndexes={[0, 1, 2]}
										tasks={server}
									/>
								)
							}
						]}
					/>
				</GridItem> */}
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Grade Distribution</h4>
							<p className={classes.cardCategoryWhite}>
								View the Grade Distribution for your course : {courseName}
							</p>
						</CardHeader>
						<CardBody>
							<Table
								tableHeaderColor="warning"
								tableHead={["Term", "Department", "Subject", "Course Number", "Course Name", "Instructor Name", "GPA Grades", "Total Grades", "Avg GPA", "Avg Cum GPA", "Percentage of A", "Percentage of B", "Percentage of C", "Percentage of D", "Percentage of Others", "Number of A+", "Number of A", "Number of A  -", "Number of B+", "Number of B", "Number of B-", "Number of C+", "Number of C", "Number of C-", "Number of D+", "Number of D", "Number of D-", "Number of F",]}
								tableData={res}
							/>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>

		</div>

	);
}
