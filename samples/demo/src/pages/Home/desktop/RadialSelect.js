export default {
	style: {
		position : "absolute",
		top      : ["150px"],
		left     : "135px",
		width    : ["300px"],
		height   : "300px",
		zIndex   : 2,
		transform: {
			"translateX" : "-50%",
			"translateY" : "-50%",
			"perspective": "150px",
			"scale"      : "1.2",
			rotateX: "0deg"
		},
	},
	axes : {
		pageSwipe: [
			{
				from    : 0,
				duration: 50,
				apply   : {
					top      : ["-270px"],
					left     : ["-50%", "135px"],
					width    : ["-155px"],
					height   : ["-155px"],
					transform: {
						//"translateY": "50%",
					},
				}
			}
		]
	}
}