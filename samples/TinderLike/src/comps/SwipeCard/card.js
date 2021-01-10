export default {
	style: {
		position       : "absolute",
		top            : "10px",
		left           : "10px",
		width          : ["100%", "-20px"],
		height         : ["100%", "-170px"],
		transform      : [
			{
				translateY: "100%",
				translateX: "0%"
			},
			{
				rotateZ: "-30deg"
			},
			{
				translateY: "-200%",
				translateZ: "0px",
				rotateY   : "25deg"
			}
		],
		backgroundColor: 'grey',
		//border         : "solid 1px white",
		borderRadius   : "5px",
		opacity        : 0
	},
	axes : {
		hSwipe: [
			{
				from    : 0,
				duration: 100,
				apply   : {
					transform: [
						{},
						{
							rotateZ: "60deg"
						},
						{
							rotateY: "-50deg"
						},
					]
				}
			}
		],
		vSwipe: [
			{
				from    : 0,
				duration: 100,
				apply   : {
					transform: [
						{
							translateY: "200%"
						}, {}, {
							translateZ: "10px"
						}
					]
				}
			}
		],
		show  : [
			{
				from    : 0,
				duration: 100,
				apply   : {
					opacity: 1
				}
			}
		]
	}
}