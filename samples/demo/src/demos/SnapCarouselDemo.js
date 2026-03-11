import React  from "react";
import Voodoo from "react-voodoo";

const CARDS = [
	{ label: "Spring Physics",  color: "#3b82f6", emoji: "🌊" },
	{ label: "Inertia Engine",  color: "#8b5cf6", emoji: "⚡" },
	{ label: "Snap Points",     color: "#ec4899", emoji: "🎯" },
	{ label: "60 fps DOM",      color: "#10b981", emoji: "🚀" },
	{ label: "Zero deps",       color: "#f59e0b", emoji: "✨" },
];

const CARD_W  = 220;
const GAP     = 16;
const SLOT    = CARD_W + GAP;
const N_CARDS = CARDS.length;

export default function SnapCarouselDemo() {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true });
	const [active, setActive] = React.useState(0);

	const wayPoints = CARDS.map((_, i) => ({ at: i * 100 }));

	return (
		<ViewBox style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
			<Voodoo.Axis
				axe="snap"
				size={(N_CARDS - 1) * 100}
				defaultPosition={0}
				scrollableWindow={(N_CARDS - 1) * 100}
				inertia={{
					wayPoints,
					willSnap: (i) => setActive(i),
				}}
			/>
			<div style={{
				position      : "absolute",
				inset         : 0,
				display       : "flex",
				flexDirection : "column",
				alignItems    : "center",
				justifyContent: "center",
				gap           : "20px",
			}}>
				<div style={{ position: "relative", overflow: "hidden", width: "100%", height: "200px" }}>
					<Voodoo.Draggable xAxis="snap">
						<Voodoo.Node
							id="track"
							style={{
								position : "absolute",
								top      : "50%",
								left     : "50%",
								transform: [{ translateX: `${-(CARD_W / 2)}px` }, { translateY: "-50%" }],
							}}
							axes={{
								snap: [{
									from    : 0,
									duration: (N_CARDS - 1) * 100,
									apply   : { transform: [{ translateX: `${-(N_CARDS - 1) * SLOT}px` }, {}] }
								}]
							}}
						>
							<div style={{ display: "flex", gap: `${GAP}px` }}>
								{CARDS.map((card, i) => (
									<div
										key={i}
										onClick={() => tweener.axes?.snap?.scrollTo(i * 100, 400, "easeCubicInOut")}
										style={{
											width        : `${CARD_W}px`,
											height       : "160px",
											borderRadius : "16px",
											background   : `linear-gradient(135deg, ${card.color}22 0%, ${card.color}44 100%)`,
											border       : `1px solid ${card.color}55`,
											display      : "flex",
											flexDirection: "column",
											alignItems   : "center",
											justifyContent:"center",
											gap          : "12px",
											cursor       : "pointer",
											transition   : "box-shadow 0.3s",
											boxShadow    : active === i
												? `0 0 0 2px ${card.color}, 0 8px 32px ${card.color}44`
												: "none",
											flexShrink   : 0,
										}}
									>
										<span style={{ fontSize: "2.5rem" }}>{card.emoji}</span>
										<span style={{
											fontSize  : "0.85rem",
											fontWeight: "600",
											color     : card.color,
										}}>
											{card.label}
										</span>
									</div>
								))}
							</div>
						</Voodoo.Node>
					</Voodoo.Draggable>
				</div>

				{/* Dots */}
				<div style={{ display: "flex", gap: "8px" }}>
					{CARDS.map((card, i) => (
						<div
							key={i}
							onClick={() => tweener.axes?.snap?.scrollTo(i * 100, 400, "easeCubicInOut")}
							style={{
								width       : active === i ? "20px" : "8px",
								height      : "8px",
								borderRadius: "4px",
								background  : active === i ? card.color : "rgba(255,255,255,0.2)",
								transition  : "all 0.3s",
								cursor      : "pointer",
							}}
						/>
					))}
				</div>

				<div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
					drag · release · snap
				</div>
			</div>
		</ViewBox>
	);
}
