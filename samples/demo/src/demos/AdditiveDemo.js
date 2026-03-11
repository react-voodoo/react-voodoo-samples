import React  from "react";
import Voodoo from "react-voodoo";

export default function AdditiveDemo() {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: false });
	const [axisX, setAxisX]  = React.useState(100);
	const [axisY, setAxisY]  = React.useState(100);

	React.useEffect(
		() => {
			const unsub = tweener.watchAxis?.("dragX", (pos) => setAxisX(Math.round(pos)));
			return () => unsub?.();
		},
		[tweener]
	);
	React.useEffect(
		() => {
			const unsub = tweener.watchAxis?.("dragY", (pos) => setAxisY(Math.round(pos)));
			return () => unsub?.();
		},
		[tweener]
	);

	return (
		<ViewBox style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
			<Voodoo.Axis axe="dragX" size={200} defaultPosition={100} scrollableWindow={200} inertia={true}/>
			<Voodoo.Axis axe="dragY" size={200} defaultPosition={100} scrollableWindow={200} inertia={true}/>

			<Voodoo.Draggable xAxis="dragX" yAxis="dragY">
				<div style={{ position: "absolute", inset: 0 }}>

					{/* Ball */}
					<Voodoo.Node
						id="ball"
						style={{
							position : "absolute",
							top      : "50%",
							left     : "50%",
							width    : "64px",
							height   : "64px",
							transform: [{ translateX: "68px" }, { translateY: "68px" }],
						}}
						axes={{
							dragX: [{ from: 0, duration: 200, apply: { transform: [{ translateX: "-200px" }, {}] } }],
							dragY: [{ from: 0, duration: 200, apply: { transform: [{}, { translateY: "-200px" }] } }],
						}}
					>
						<div style={{
							width       : "64px",
							height      : "64px",
							borderRadius: "50%",
							background  : "radial-gradient(circle at 35% 35%, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)",
							boxShadow   : "0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.3)",
						}}/>
					</Voodoo.Node>

					<div style={{
						position  : "absolute",
						inset     : 0,
						display   : "flex",
						alignItems: "center",
						justifyContent: "center",
						pointerEvents: "none",
					}}>
						<div style={{
							position : "absolute",
							bottom   : "16px",
							left     : "50%",
							transform: "translateX(-50%)",
							fontSize : "0.7rem",
							color    : "rgba(255,255,255,0.3)",
							textAlign: "center",
							whiteSpace: "nowrap",
						}}>
							two axes · one ball · drag anywhere
						</div>

						{/* X axis bar */}
						<div style={{
							position  : "absolute",
							bottom    : "48px",
							left      : "16px",
							right     : "16px",
							height    : "4px",
							background: "rgba(255,255,255,0.08)",
							borderRadius: "2px",
						}}>
							<div style={{
								position    : "absolute",
								top         : "50%",
								left        : `${(200 - axisX) / 2}%`,
								transform   : "translate(-50%, -50%)",
								width       : "12px",
								height      : "12px",
								borderRadius: "50%",
								background  : "var(--accent)",
								boxShadow   : "0 0 8px var(--accent)",
								transition  : "left 0.05s linear",
							}}/>
							<div style={{
								position  : "absolute",
								top       : "-18px",
								right     : "0",
								fontSize  : "0.65rem",
								color     : "rgba(255,255,255,0.4)",
							}}>X: {axisX}</div>
						</div>

						{/* Y axis bar */}
						<div style={{
							position  : "absolute",
							top       : "16px",
							right     : "16px",
							bottom    : "70px",
							width     : "4px",
							background: "rgba(255,255,255,0.08)",
							borderRadius: "2px",
						}}>
							<div style={{
								position    : "absolute",
								left        : "50%",
								top         : `${(200 - axisY) / 2}%`,
								transform   : "translate(-50%, -50%)",
								width       : "12px",
								height      : "12px",
								borderRadius: "50%",
								background  : "var(--accent2)",
								boxShadow   : "0 0 8px var(--accent2)",
								transition  : "top 0.05s linear",
							}}/>
							<div style={{
								position  : "absolute",
								bottom    : "-18px",
								left      : "50%",
								transform : "translateX(-50%)",
								fontSize  : "0.65rem",
								color     : "rgba(255,255,255,0.4)",
							}}>Y: {axisY}</div>
						</div>
					</div>
				</div>
			</Voodoo.Draggable>
		</ViewBox>
	);
}
