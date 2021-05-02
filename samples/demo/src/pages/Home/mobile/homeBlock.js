export default {
	style: {
		position : "absolute",
		width    : ["100%"],
		top      : ["50%", "30px"],
		left     : "0px",
		bottom   : "75px",
		fontSize : "17px",
		textAlign: "center",
		transform: {
			"translateY": "0%",
		},
	},
	axes : {
		pageSwipe: [
			{
				from    : 0,
				duration: 50,
				apply   : {
					opacity  : -1,
					transform: {
						"translateY": "-50%",
					},
				}
			}
		]
	}
}