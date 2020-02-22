import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
// Register User
export const updateUser = (userData, history) => dispatch => {
	var temp;

	axios
		.put("http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/users/5dc77b090cbb325607da2370", userData)
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