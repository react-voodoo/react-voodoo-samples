export default {
	style: {
		position     : "absolute",
		top          : "75%",
		left         : "50%",
		width        : "300px",
		height       : "300px",
		transform    : [
			{
				translateX: "-50%",
				translateY: "-50%"
			}
		],
		opacity      : -1,
		pointerEvents: "none"
	},
	axes : {
		hSwipe: [
			{
				from    : 50,
				duration: 20,
				apply   : {
					top    : "-25%",
					opacity: 1
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