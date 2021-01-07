export default {
	style: {
		position       : "absolute",
		top            : "10px",
		left           : "10px",
		width          : ["100%", "-20px"],
		height         : ["100%", "-170px"],
		transform      : [
			{
				translateX: "-100%",
				translateY: "-100%"
			}
		],
		backgroundColor: 'grey',
		border         : "solid 1px white",
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
						{
							translateX: "200%"
						}
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