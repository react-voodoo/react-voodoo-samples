export default {
	style: {
		position : "absolute",
		width    : ["250px"],
		top      : "120px",
		left     : "50%",
		height   : "250px",
		transform: {
			"translateX" : "-50%",
			"translateY" : "-50%",
			"perspective": "275px",
			rotateX      : "0deg"
		},
	},
	axes : {
		pageSwipe: [
			{
				from    : 0,
				duration: 50,
				apply   : {
					top      : ["-100px"],
					transform: {
						rotateX: "52deg"
					},
				}
			}
		]
	}
}