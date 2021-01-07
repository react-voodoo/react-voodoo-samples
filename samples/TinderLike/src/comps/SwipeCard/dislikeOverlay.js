export default {
	style: {
		position     : "absolute",
		top          : "50%",
		left         : "50%",
		width        : "300px",
		height       : "300px",
		transform    : [
			{
				translateX: "-50%",
				translateY: "-50%"
			}
		],
		//backgroundColor: 'red',
		fontSize     : "12px",
		fontWeight   : "bolder",
		//color          : "red",
		//border         : "solid 1px white",
		//borderRadius   : "5px",
		opacity      : 1,
		pointerEvents: "none"
	},
	axes : {
		hSwipe: [
			{
				from    : 30,
				duration: 20,
				apply   : {
					opacity: -1
				}
			}
		]
	}
}