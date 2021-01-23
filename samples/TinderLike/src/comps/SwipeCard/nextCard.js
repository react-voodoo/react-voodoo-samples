export default {
	style: {
		position       : "absolute",
		top            : "10px",
		left           : "10px",
		width          : ["100%", "-20px"],
		height         : ["100%", "-170px"],
		perspective    : "1",
		transform      : [
			{
				translateZ: "-20px",
			},
			{},
			{},
			{}
		],
		//filter         : {
		//	blur: "5px"
		//},
		backgroundColor: 'white',
		borderRadius   : "5px",
		opacity        : .5,
		overflow       : "hidden",
		zIndex         : 1
	},
	axes : {
		showNext: [
			{
				from    : 0,
				duration: 100,
				apply   : {
					transform: [
						{
							translateZ: "20px",
						}
					],
					//filter         : {
					//	blur: "-5px"
					//},
					opacity  : .5
				}
			}
		]
	}
}