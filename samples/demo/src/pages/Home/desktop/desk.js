export default {
	style: {
		position: "absolute",
		width   : ["100%"],
		top     : ["170px", "100%"],
		left    : "0%",
		height  : ["100%", "-170px"],
	},
	axes : {
		pageSwipe: [
			{
				from    : 0,
				duration: 50,
				apply   : {
					top: ["-100%"],
					
				}
			}
		]
	}
}