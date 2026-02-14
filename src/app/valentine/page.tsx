import Image from "next/image";
import React, { useState } from "react";

export default function Valentine() {
	const [noPosition, setNoPosition] = useState({ top: "0px", left: "0px" });
	const [accepted, setAccepted] = useState(false);

	const moveNoButton = () => {
		const newTop = Math.floor(Math.random() * 200) - 100;
		const newLeft = Math.floor(Math.random() * 200) - 100;

		setNoPosition({
			top: `${newTop}px`,
			left: `${newLeft}px`,
		});
	};

	if (accepted) {
		return (
			<div style={styles.container}>
				{/* <div style={styles.card}>
					<h1 style={styles.title}>Yay! ❤️ Happy Valentine’s Day!</h1>

					<h2 style={styles.name}>Teena Babu</h2>
					<h2 style={styles.subName}>Ulf Bondhada</h2>

					<p style={styles.message}>
						Cheers to our ~4 years of love and memories 💖
					</p>
				</div> */}
				<div
					style={{
						minHeight: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
						fontFamily: "'Poppins', sans-serif",
					}}
				>
					<div
						style={{
							background: "rgba(255,255,255,0.9)",
							padding: "50px 60px",
							borderRadius: "20px",
							boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
							textAlign: "center",
							maxWidth: "500px",
						}}
					>
						<h1
							style={{
								fontSize: "2.5rem",
								color: "#ff4d6d",
								marginBottom: "20px",
								textShadow: "0 4px 10px rgba(255,77,109,0.3)",
							}}
						>
							Yay! ❤️ Happy Valentine’s Day!
						</h1>

						<h2
							style={{
								fontSize: "2rem",
								color: "#333",
								margin: "10px 0",
								fontWeight: "600",
							}}
						>
							Teena Babu
						</h2>

						<h2
							style={{
								fontSize: "1.6rem",
								color: "#666",
								marginBottom: "20px",
								fontWeight: "500",
							}}
						>
							Ulf Bondhada
						</h2>

						<p
							style={{
								fontSize: "1.4rem",
								color: "#444",
								marginTop: "20px",
								lineHeight: "1.6",
							}}
						>
							Cheers to our ~4 years of love and memories 💖
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<h1 style={styles.text}>Will you be my Valentine? 💘</h1>

			<div style={styles.buttonWrapper}>
				<button style={styles.yesButton} onClick={() => setAccepted(true)}>
					Yes
				</button>

				<button
					style={{
						...styles.noButton,
						transform: `translate(${noPosition.left}, ${noPosition.top})`,
					}}
					onMouseEnter={moveNoButton}
					onTouchStart={moveNoButton}
				>
					No
				</button>
			</div>
		</div>
	);
}

const styles: { [key: string]: React.CSSProperties } = {
	container: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
		fontFamily: "sans-serif",
		textAlign: "center",
	},
	text: {
		fontSize: "2.5rem",
		color: "#fff",
		marginBottom: "40px",
	},
	subText: {
		fontSize: "1.5rem",
		color: "#fff",
	},
	buttonWrapper: {
		position: "relative",
		display: "flex",
		gap: "20px",
	},
	yesButton: {
		padding: "12px 30px",
		fontSize: "1.2rem",
		backgroundColor: "#ff4d6d",
		color: "white",
		border: "none",
		borderRadius: "8px",
		cursor: "pointer",
	},
	noButton: {
		padding: "12px 30px",
		fontSize: "1.2rem",
		backgroundColor: "#6c757d",
		color: "white",
		border: "none",
		borderRadius: "8px",
		cursor: "pointer",
		position: "relative",
		transition: "transform 0.2s ease",
	},
};
