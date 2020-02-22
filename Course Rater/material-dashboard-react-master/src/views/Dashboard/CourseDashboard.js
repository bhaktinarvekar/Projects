import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DashboardPage from "views/Dashboard/Dashboard.js";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function check(id, courseNumber) {
  localStorage.setItem("courseNumber", courseNumber);
  localStorage.setItem("courseId", id);
}

export default function CourseDashboard() {
  const [diff, setdiff] = useState([]);
  const [course, setCourse] = useState([]);
  const [coin, setCoin] = useState([]);

  const getImage = c => {
    console.log(c.difficulty);
    //console.log(diff.length);
    if (c.difficulty > 4 && c.difficulty <= 7) {
      return "https://www.solidbackgrounds.com/images/3508x2480/3508x2480-amber-orange-solid-color-background.jpg";
    } else if (c.difficulty > 7) {
      return "https://www.solidbackgrounds.com/images/3508x2480/3508x2480-ou-crimson-red-solid-color-background.jpg";
    } else {
      return "https://www.solidbackgrounds.com/images/3508x2480/3508x2480-go-green-solid-color-background.jpg";
    }
  };

  useEffect(() => {
    let courses = [];
    var userId = localStorage.getItem("userid");

    axios
      .post(
        "http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/user/coins",
        userId
      )
      .then((res, err) => {
        setCoin(res.data);
        //console.log('Coins:  ', this.state.coins);
        if (err) console.log(err);
      });
    var userid = localStorage.getItem("userid");
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .put(
        "http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/userid",
        userid
      )
      .then((res, err) => {
        let courseIds = [];
        res.data.coursesSubscribed.map(r => courseIds.push(r));
        console.log(courseIds);
        axios
          .post(
            "http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/courseobjects/",
            courseIds
          )
          .then((res, err) => {
            let subsCourses = res.data;
            let diffs = [];
            //console.log(res.data);
            subsCourses.map((c, i) => {
              axios
                .get(
                  "http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/overallresponse/" +
                    c.id
                )
                .then(res => {
                  subsCourses[i]["difficulty"] = res.data;
                  let newdiff = diff.push(res.data);
                  diffs.push(res.data);
                  setdiff(newdiff);
                  setCourse(subsCourses);
                });
            });
            setdiff(diffs);
          });

        if (err) console.log(err);
      });
  }, []);

  const classes = useStyles();

  return (
    <div>
      {" "}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Coins</p>
              <h3 className={classes.cardTitle}>
                {coin}/100 <small>coins</small>
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
        {course.map((c, i) => (
          <GridItem xs={12} sm={6} md={3} key={c.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={c.subject}
                  height="140"
                  image={getImage(c)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {c.courseName} <br /> Difficulty : {c.difficulty}/10
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {c.subject} {c.courseNumber}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => check(c.id, c.courseNumber)}
                >
                  <NavLink to="/admin/dashboard"> View Course Summary </NavLink>
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
