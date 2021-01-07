export default {
	style: {
		position       : "absolute",
		top            : "50%",
		left           : "50%",
		width          : "300px",
		height         : "300px",
		transform      : [
			{
				translateX: "-50%",
				translateY: "-50%"
			}
		],
		//backgroundColor: 'green',
		//border         : "solid 1px white",
		//borderRadius   : "5px",
		opacity        : 0,
		pointerEvents  : "none"
	},
	axes : {
		hSwipe: [
			{
				from    : 50,
				duration: 20,
				apply   : {
					opacity: 1
				}
			}
		]
	}
}