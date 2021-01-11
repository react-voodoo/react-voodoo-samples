export function pushIn( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: "-.2box"
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: ".2box"
					},
				}
			},
			//{
			//	type    : "Tween",
			//	target  : target,
			//	from    : 250,
			//	duration: 500,
			//	easeFn  : "easeCircle",
			//	apply   : {
			//		transform: {
			//			rotateY: 180,
			//		},
			//	}
			//}
		]
	};
};