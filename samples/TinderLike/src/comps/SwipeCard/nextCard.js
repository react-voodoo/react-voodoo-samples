export default {
	style: {
		position       : "absolute",
		top            : "10px",
		left           : "10px",
		width          : ["100%", "-20px"],
		height         : ["100%", "-170px"],
		transform      : [
			{
				translateZ: "0px",
			},
			{},
			{},
			{}
		],
		backgroundColor: 'grey',
		borderRadius   : "5px",
		opacity        : 1,
		overflow       : "hidden"
	},
	axes : {
		hSwipe: [
			{
				from    : 40,
				duration: 10,
				apply   : {
					opacity: -.5,
					
					transform: [
						{
							
							translateZ: "-20px",
						}
					]
				}
			},
			{
				from    : 50,
				duration: 10,
				apply   : {
					opacity  : .5,
					transform: [
						{
							translateZ: "20px",
						}
					]
				}
			}
		],
		vSwipe: [],
		show  : [
			{
				from    : 0,
				duration: 100,
				apply   : {
					//opacity: 1
				}
			}
		]
	}
}