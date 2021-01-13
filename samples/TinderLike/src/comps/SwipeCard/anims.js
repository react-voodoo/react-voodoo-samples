export function pushIn( target, tm = 1000 ) {
	return {
		anims: [
			{
				target  : target,
				from    : 0,
				duration: tm / 2,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: "-200px"
					}
				}
			},
			{
				target  : target,
				from    : tm / 2,
				duration: tm / 2,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: "200px"
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