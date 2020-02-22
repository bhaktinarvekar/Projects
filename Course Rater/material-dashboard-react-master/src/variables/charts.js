// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");
const axios = require("axios");
// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
	durations = 500;
var delays2 = 80,
	durations2 = 500;

axios.get("http://courserater-env2.3mbmqbacr3.us-east-2.elasticbeanstalk.com/retrievegrades", (res) => {
	console.log(res.data);
})
// ##############################
// // // Daily Sales
// #############################

const dailySalesChart = {
	data: {
		labels: ["Assignments", "Mid Terms", "Finals", "Projects"],
		series: [[5, 7, 8, 6]]
	},
	options: {
		lineSmooth: Chartist.Interpolation.cardinal({
			tension: 0
		}),
		low: 0,
		high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
		chartPadding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	},
	// for animation
	animation: {
		draw: function (data) {
			if (data.type === "line" || data.type === "area") {
				data.element.animate({
					d: {
						begin: 600,
						dur: 700,
						from: data.path
							.clone()
							.scale(1, 0)
							.translate(0, data.chartRect.height())
							.stringify(),
						to: data.path.clone().stringify(),
						easing: Chartist.Svg.Easing.easeOutQuint
					}
				});
			} else if (data.type === "point") {
				data.element.animate({
					opacity: {
						begin: (data.index + 1) * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: "ease"
					}
				});
			}
		}
	}
};

// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
	data: {
		labels: [
			"25",
			"42",
			"33"
		],
		series: [[5, 3, 4]]
	},
	options: {
		axisX: {
			showGrid: false
		},
		low: 0,
		high: 1000,
		chartPadding: {
			top: 0,
			right: 5,
			bottom: 0,
			left: 0
		}
	},
	responsiveOptions: [
		[
			"screen and (max-width: 640px)",
			{
				seriesBarDistance: 5,
				axisX: {
					labelInterpolationFnc: function (value) {
						return value[0];
					}
				}
			}
		]
	],
	animation: {
		draw: function (data) {
			if (data.type === "bar") {
				data.element.animate({
					opacity: {
						begin: (data.index + 1) * delays2,
						dur: durations2,
						from: 0,
						to: 1,
						easing: "ease"
					}
				});
			}
		}
	}
};

// ##############################
// // // Completed Tasks
// #############################
const dataPie = {
	data: {
		labels: [
			"Overall Difficulty- 60 %",
			"40"
		],
		series: [
			{ meta: "A value is:", value: 60 },
			{ meta: "B value is:", value: 40 }
		],
		colors: ["#111", "#000"]
	},
	options: {

		low: 0,
		high: 100,
		height: 0,
		width: 0,
		donut: false

	},
	responsiveOptions: [
		['screen and (min-width: 640px)', {
			chartPadding: 10,
			labelOffset: 100,
			labelDirection: 'explode',
			labelInterpolationFnc: function (value) {
				return value[0];
			}
		}],
		['screen and (min-width: 1024px)', {
			labelOffset: 80,
			chartPadding: 10
		}]
	]
};
const timePie = {
	data: {
		labels: [
			"Time Consumed- 60 %",
			"40"
		],
		series: [
			{ meta: "A value is:", value: 60 },
			{ meta: "B value is:", value: 40 }
		],
		colors: ["#111", "#000"]
	},
	options: {

		low: 0,
		high: 100,
		height: 0,
		width: 0,
		donut: false

	},
	responsiveOptions: [
		['screen and (min-width: 640px)', {
			chartPadding: 10,
			labelOffset: 100,
			labelDirection: 'explode',
			labelInterpolationFnc: function (value) {
				return value[0];
			}
		}],
		['screen and (min-width: 1024px)', {
			labelOffset: 80,
			chartPadding: 10
		}]
	]
};
const completedTasksChart = {
	data: {
		labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
		series: [[230, 750, 450, 300, 280, 240, 200, 190]]
	},
	options: {
		lineSmooth: Chartist.Interpolation.cardinal({
			tension: 0
		}),
		low: 0,
		high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
		chartPadding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	},
	animation: {
		draw: function (data) {
			if (data.type === "line" || data.type === "area") {
				data.element.animate({
					d: {
						begin: 600,
						dur: 700,
						from: data.path
							.clone()
							.scale(1, 0)
							.translate(0, data.chartRect.height())
							.stringify(),
						to: data.path.clone().stringify(),
						easing: Chartist.Svg.Easing.easeOutQuint
					}
				});
			} else if (data.type === "point") {
				data.element.animate({
					opacity: {
						begin: (data.index + 1) * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: "ease"
					}
				});
			}
		}
	}
};

module.exports = {
	dailySalesChart,
	emailsSubscriptionChart,
	completedTasksChart,
	dataPie,
	timePie
};
