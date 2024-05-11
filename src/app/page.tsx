"use client";
import AllVideo from "@/components/AllVideo/AllVideo";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import UseAuth from "@/components/UseAuth";

export default function Home() {
	// const { allowuser } = UseAuth();

	return (
		// <>
		// {allowuser ? (
		<>
			<div className=" ml-5 font-bold mt-5 text-black"></div>
			<div className="video-container">
				<AllVideo />
			</div>
		</>
		// ) : (
		// <>
		// 	<div className=" flex justify-end mx-2 p-5 border-sky-100">
		// 		<div className="m-2">
		// 			<Link
		// 				href="/login"
		// 				className={buttonVariants({ variant: "outline" })}
		// 			>
		// 				Login
		// 			</Link>
		// 		</div>
		// 		<div className="m-2">
		// 			<Link
		// 				href="/signup"
		// 				className={buttonVariants({ variant: "outline" })}
		// 			>
		// 				Signup
		// 			</Link>
		// 		</div>
		// 	</div>
		// </>
		// )}
		// </>
	);
}
