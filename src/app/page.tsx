"use client";
import AllVideo from "@/components/AllVideo/AllVideo";
import Valentine from "./valentine/page";

export default function Home() {
	return (
		<>
			<div className=" ml-5 font-bold mt-5 text-black"></div>
			<div className="video-container">
				{/* <AllVideo /> */}
				<Valentine />
			</div>
		</>
	);
}
