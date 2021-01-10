export default {
	style: {
		position       : "absolute",
		top            : "10px",
		left           : "10px",
		width          : ["100%", "-20px"],
		height         : ["100%", "-170px"],
		transform      : [
			{
				perspective: "1200px",
				translateZ : "200px",
				translateY : "100%",
				translateX : "0%"
			},
			{
				rotateZ: "-30deg",
				rotateY: "30deg"
			},
			{
				translateZ: "-200px",
				translateY: "-200%"
			},
			{}
		],
		backgroundColor: 'grey',
		//border         : "solid 1px white",
		borderRadius   : "5px",
		opacity        : 0,
		overflow       : "hidden"
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
							rotateY: "-60deg",
							rotateZ: "60deg"
						},
						{},
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