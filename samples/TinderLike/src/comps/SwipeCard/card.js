export default {
	style: {
		position          : "absolute",
		top               : "10px",
		left              : "10px",
		width             : ["100%", "-20px"],
		height            : ["100%", "-170px"],
		transform         : [
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
		//filter            : {// this cause some lag in low perf devices
		//	grayscale: "100%"
		//},
		opacity           : 0,
		backgroundColor   : 'white',
		borderRadius      : "5px",
		overflow          : "hidden",
		cursor            : "pointer",
		backfaceVisibility: "hidden",// safari perfs
		zIndex            : 100
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
			},
			{
				from    : 40,
				duration: 10,
				apply   : {
					//filter: {
					//	grayscale: "-100%"
					//},
				}
			},
			{
				from    : 0,
				duration: 20,
				apply   : {
					opacity: 1,
				}
			},
			{
				from    : 80,
				duration: 20,
				apply   : {
					opacity: -1,
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
							//translateZ: "10px"
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
					//opacity: 1
				}
			}
		]
	}
}