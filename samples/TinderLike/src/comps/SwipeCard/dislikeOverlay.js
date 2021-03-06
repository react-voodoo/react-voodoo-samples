export default {
	style: {
		position     : "absolute",
		top          : "50%",
		left         : "50%",
		width        : "200px",
		height       : "200px",
		transform    : [
			{
				translateX: "-50%",
				translateY: "-50%"
			}
		],
		fontSize     : "12px",
		opacity      : 0,
		pointerEvents: "none"
	},
	axes : {
		hSwipe: [
			{
				from    : 35,
				duration: 15,
				apply   : {
					transform    : [
						{
							translateY: "100%",
						}
					],
					opacity: -1
				}
			}
		],
		show  : [
			{
				from    : 0,
				duration: 50,
				apply   : {
					opacity: 1
				}
			}
		]
	}
}