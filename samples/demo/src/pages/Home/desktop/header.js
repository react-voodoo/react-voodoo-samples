export default {
	style: {
		position   : "absolute",
		width      : ["100%"],
		left       : "50%",
		top        : ["50px"],
		color      : "black",
		zIndex     : 5,
		fontSize   : "35px",
		paddingLeft: "0px",
		background : "rgba(255,255,255,0.42)",
		transform  : {
			"translateX": "-50%",
			"translateY": "-50%",
		},
	},
	axes : {
		pageSwipe: [
			{
				from    : 0,
				duration: 50,
				apply   : {
					paddingLeft: "200px",
					zIndex     : -5,
					top        : ["-20px"],
					fontSize   : "-10px",
				}
			}
		]
	}
}