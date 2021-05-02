export default {
	style: {
		position  : "absolute",
		width     : ["100%"],
		left      : "50%",
		top       : ["30px"],
		zIndex    : 5,
		background: "rgba(255,255,255,0.42)",
		fontSize  : "20px",
		transform : {
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
					top: ["-10px"],
				}
			}
		]
	}
}