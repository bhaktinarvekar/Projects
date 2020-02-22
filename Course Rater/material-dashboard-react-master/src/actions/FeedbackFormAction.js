import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
// Register User
export const updateFeedback = (userData, history) => dispatch => {
	var temp;
	debugger
	axios
		.post("http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/addfeedback", userData)
		.then(res => {
			console.log(res);
			history.push("/login")
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);

};