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
    marginBottom: "0",
    textAlign: "left"
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

export default function Instructions() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardBody profile>
              <h1 className={classes.cardCategory}>Instructions</h1>
              <h2 className={classes.cardTitle}>Course Rater</h2>
              <h3 align="left">
                1. To provide feedback to the already taken course go to
                Feedback Form. Fill up the feedback form and submit it. The
                student gains coins by providing the feedback.
              </h3>
              <h3 align="left">
                2. To view the feedback for courses, go to Search and search for
                a course. The student can either subscribe to the course or
                provide feedback. On clicking subscribe button, the student will
                get subscribe to the course.
              </h3>
              <h3 align="left">
                3. On clicking the feedback button, the student can give
                feedback for a course.
              </h3>
              <h3 align="left">
                4. On clicking the Course Dashboard page, the courses a student
                has subscribed to will be displayed. On clicking the "View
                Course Summary", the student can see the summary for that
                course.
              </h3>

              <Button
                color="primary"
                round
                onClick={() => {
                  window.location.href = "./cdashboard";
                }}
              >
                Back to Course Dashboard
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
