import React  from "react";
import Voodoo from "react-voodoo";

// Snap positions shared by both axes
const WAY_POINTS = [{ at: 0 }, { at: 100 }, { at: 200 }, { at: 300 }, { at: 400 }];

// Deterministic star field for the night panel
const STARS = Array.from({ length: 20 }, ( _, i ) => ({
	top : `${(i * 17 + 5) % 64}%`,
	left: `${(i * 23 + 8) % 87}%`,
	size: i % 3 === 0 ? "3px" : "2px",
}));

// Deterministic city-building list for the night panel
const BUILDINGS = Array.from({ length: 14 }, ( _, i ) => ({
	width : `${6 + (i * 7) % 9}px`,
	height: `${14 + (i * 11) % 24}px`,
	color : `rgba(${180 + (i * 30) % 75},${160 + (i * 20) % 95},80,0.65)`,
}));

export default function ParallaxDemo() {
	const [, ViewBox] = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true });
	
	return (
		<ViewBox
			style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", background: "#060a14" }}>
			
			{/* Two independent axes — one per panel */}
			<Voodoo.Axis
				id="day"
				size={400}
				defaultPosition={0}
				scrollableWindow={400}
				inertia={{ wayPoints: WAY_POINTS }}
			/>
			<Voodoo.Axis
				id="night"
				size={400}
				defaultPosition={0}
				scrollableWindow={400}
				inertia={{ wayPoints: WAY_POINTS }}
			/>
			
			{/* ─── LEFT PANEL — Day scene ──────────────────────────────────────── */}
			<div style={{
				position: "absolute",
				left    : 0,
				top     : 0,
				bottom  : 0,
				width   : "calc(50% - 1px)",
				overflow: "hidden"
			}}>
				<Voodoo.Draggable yAxis="day">
					<div style={{ position: "absolute", inset: 0 }}>
						
						{/* Sky */}
						<Voodoo.Node.div
							id="day-sky"
							style={{
								position  : "absolute",
								inset     : 0,
								background: "linear-gradient(180deg, #5ba8d9 0%, #91d0f5 55%, #f9c76b 100%)",
							}}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-28px" }] }
								}]
							}}
						/>
						
						{/* Sun — rises from bottom as you drag up */}
						<Voodoo.Node
							id="day-sun"
							style={{
								position : "absolute",
								left     : "40%",
								bottom   : "-6%",
								transform: [{ translateX: "-50%" }, { translateY: "0px" }],
							}}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{}, { translateY: "-265px" }] }
								}]
							}}
						>
							<div style={{
								width       : "38px",
								height      : "38px",
								borderRadius: "50%",
								background  : "radial-gradient(circle at 38% 38%, #fffde7, #ffd740 52%, #ff8f00)",
								boxShadow   : "0 0 30px 10px rgba(255,200,50,0.45)",
							}}/>
						</Voodoo.Node>
						
						{/* Clouds — medium parallax */}
						<Voodoo.Node
							id="day-clouds"
							style={{ position: "absolute", top: "18%", left: 0, right: 0 }}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-75px" }] }
								}]
							}}
						>
							<div style={{ position: "absolute", left: "6%", display: "flex", alignItems: "flex-end" }}>
								<div style={{
									width       : "46px",
									height      : "18px",
									borderRadius: "18px",
									background  : "rgba(255,255,255,0.90)"
								}}/>
								<div style={{
									width       : "26px",
									height      : "13px",
									borderRadius: "13px",
									background  : "rgba(255,255,255,0.90)",
									marginLeft  : "-9px"
								}}/>
							</div>
							<div style={{
								position  : "absolute",
								right     : "8%",
								top       : "22px",
								display   : "flex",
								alignItems: "flex-end"
							}}>
								<div style={{
									width       : "52px",
									height      : "20px",
									borderRadius: "20px",
									background  : "rgba(255,255,255,0.82)"
								}}/>
								<div style={{
									width       : "30px",
									height      : "14px",
									borderRadius: "14px",
									background  : "rgba(255,255,255,0.82)",
									marginLeft  : "-12px"
								}}/>
							</div>
						</Voodoo.Node>
						
						{/* Far mountains — slow */}
						<Voodoo.Node
							id="day-mtn-far"
							style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52%" }}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-95px" }] }
								}]
							}}
						>
							<svg viewBox="0 0 160 104" style={{ width: "100%", height: "100%", display: "block" }}
							     preserveAspectRatio="none">
								<polygon points="0,104 28,36 60,64 92,20 124,54 160,26 160,104" fill="#6fa5c0"/>
							</svg>
						</Voodoo.Node>
						
						{/* Near mountains — medium */}
						<Voodoo.Node
							id="day-mtn-near"
							style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%" }}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-145px" }] }
								}]
							}}
						>
							<svg viewBox="0 0 160 76" style={{ width: "100%", height: "100%", display: "block" }}
							     preserveAspectRatio="none">
								<polygon points="0,76 22,26 52,50 82,14 114,44 140,20 160,42 160,76" fill="#3d7a50"/>
							</svg>
						</Voodoo.Node>
						
						{/* Ground — fastest layer */}
						<Voodoo.Node.div
							id="day-ground"
							style={{
								position  : "absolute",
								bottom    : 0,
								left      : 0,
								right     : 0,
								height    : "11%",
								background: "linear-gradient(180deg, #4caf50 0%, #2e7d32 100%)",
							}}
							axes={{
								day: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-200px" }] }
								}]
							}}
						/>
						
						{/* Panel label */}
						<div style={{
							position     : "absolute",
							top          : "8px",
							left         : 0,
							right        : 0,
							textAlign    : "center",
							fontSize     : "0.6rem",
							fontWeight   : "700",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color        : "rgba(20,60,100,0.5)",
							pointerEvents: "none",
						}}>
							☀ day · drag ↕
						</div>
					</div>
				</Voodoo.Draggable>
			</div>
			
			{/* ─── Centre divider ──────────────────────────────────────────────── */}
			<div style={{
				position     : "absolute",
				left         : "50%",
				top          : 0,
				bottom       : 0,
				width        : "2px",
				background   : "rgba(255,255,255,0.12)",
				transform    : "translateX(-50%)",
				pointerEvents: "none",
				zIndex       : 10,
			}}/>
			
			{/* ─── RIGHT PANEL — Night scene ───────────────────────────────────── */}
			<div style={{
				position: "absolute",
				right   : 0,
				top     : 0,
				bottom  : 0,
				width   : "calc(50% - 1px)",
				overflow: "hidden"
			}}>
				<Voodoo.Draggable yAxis="night">
					<div style={{ position: "absolute", inset: 0 }}>
						
						{/* Sky + stars */}
						<Voodoo.Node.div
							id="night-sky"
							style={{
								position  : "absolute",
								inset     : 0,
								background: "radial-gradient(ellipse at 50% 20%, #1e3a5f 0%, #0a0f1e 65%)",
							}}
							axes={{
								night: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-24px" }] }
								}]
							}}
						>
							{STARS.map(( s, i ) => (
								<div key={i} style={{
									position    : "absolute",
									top         : s.top,
									left        : s.left,
									width       : s.size,
									height      : s.size,
									borderRadius: "50%",
									background  : "rgba(255,255,255,0.75)",
								}}/>
							))}
						</Voodoo.Node.div>
						
						{/* Moon — rises as you drag up */}
						<Voodoo.Node.div
							id="night-moon"
							style={{
								position : "absolute",
								left     : "62%",
								bottom   : "-6%",
								transform: [{ translateX: "-50%" }, { translateY: "0px" }],
							}}
							axes={{
								night: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{}, { translateY: "-250px" }] }
								}]
							}}
						>
							<div style={{
								width       : "30px",
								height      : "30px",
								borderRadius: "50%",
								background  : "radial-gradient(circle at 35% 35%, #fffde7, #f5d78f 58%, #c8a94a)",
								boxShadow   : "0 0 20px 6px rgba(245,215,143,0.22)",
							}}/>
						</Voodoo.Node.div>
						
						{/* Aurora — fades in mid-scroll, fades out late */}
						<Voodoo.Node.div
							id="night-aurora"
							style={{ position: "absolute", top: "12%", left: 0, right: 0, height: "34%", opacity: 0 }}
							axes={{
								night: [
									{ from: 120, duration: 80, apply: { opacity: 0.9 } },
									{ from: 310, duration: 70, apply: { opacity: 0 } },
								]
							}}
						>
							<div style={{
								position  : "absolute",
								inset     : 0,
								background: "linear-gradient(180deg, transparent, rgba(16,185,129,0.18) 44%, rgba(99,102,241,0.12) 74%, transparent)",
								filter    : "blur(7px)",
							}}/>
						</Voodoo.Node.div>
						
						{/* Mountains — slow */}
						<Voodoo.Node.div
							id="night-mtn"
							style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%" }}
							axes={{
								night: [{
									from    : 0,
									duration: 400,
									apply   : { transform: [{ translateY: "-105px" }] }
								}]
							}}
						>
							<svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%", display: "block" }}
							     preserveAspectRatio="none">
								<polygon points="0,100 26,40 56,64 88,18 118,52 144,28 160,44 160,100" fill="#1a2235"/>
								<polygon points="0,100 12,58 40,72 70,46 100,68 130,50 160,62 160,100" fill="#0d1526"/>
							</svg>
						</Voodoo.Node.div>
						
						{/* City lights — fade in + move up */}
						<Voodoo.Node.div
							id="night-city"
							style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%", opacity: 0 }}
							axes={{
								night: [
									{ from: 190, duration: 100, apply: { opacity: 1 } },
									{ from: 0, duration: 400, apply: { transform: [{ translateY: "-160px" }] } },
								]
							}}
						>
							<div style={{
								position      : "absolute",
								inset         : 0,
								display       : "flex",
								alignItems    : "flex-end",
								justifyContent: "center",
								gap           : "3px",
								padding       : "0 8px",
							}}>
								{BUILDINGS.map(( b, i ) => (
									<div key={i} style={{
										width       : b.width,
										height      : b.height,
										background  : b.color,
										borderRadius: "2px 2px 0 0",
										flexShrink  : 0,
									}}/>
								))}
							</div>
						</Voodoo.Node.div>
						
						{/* Panel label */}
						<div style={{
							position     : "absolute",
							top          : "8px",
							left         : 0,
							right        : 0,
							textAlign    : "center",
							fontSize     : "0.6rem",
							fontWeight   : "700",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color        : "rgba(180,210,255,0.4)",
							pointerEvents: "none",
						}}>
							☾ night · drag ↕
						</div>
					</div>
				</Voodoo.Draggable>
			</div>
			
			{/* ─── Bottom caption ──────────────────────────────────────────────── */}
			<div style={{
				position     : "absolute",
				bottom       : "8px",
				left         : 0,
				right        : 0,
				textAlign    : "center",
				fontSize     : "0.62rem",
				color        : "rgba(255,255,255,0.28)",
				pointerEvents: "none",
				zIndex       : 10,
			}}>
				two fingers · two axes · independent
			</div>
		</ViewBox>
	);
}
