import React, { ChangeEvent, useState } from "react";
import { UpdateCoverImgType } from "@/app/allinterface";
import axios from "axios";
import { dev_url } from "@/url/hosturl";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./EditModal.module.css";
import { useAppSelector } from "@/redux/store";

interface EditModalProps {
	onClose: () => void;
	changehandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => Promise<void>;
	avatar: string;
}

const EditModal2: React.FC<EditModalProps> = ({
	onClose,
	changehandler,
	submitHandler,
	avatar,
}) => {
	// const [coverformData, setCoverFormData] = useState<UpdateCoverImgType>({
	// 	coverImage: "",
	// });
	console.log("type of operation", avatar);
	const authState = useAppSelector((state) => state.auth.loggedInUser);

	return (
		<div className={styles.modal_overlay}>
			<div className={`${styles.modal_content} `}>
				<button className={styles.close_button} onClick={onClose}>
					X
				</button>
				<div className={`${styles.mobile_responsive_image} mt-5`}>
					{/* <Image
						src="https://placehold.co/1200x450"
						width={500}
						height={500}
						quality={10}
						alt={"looged in aimage"}
						className={`${styles.coverimage} border  rounded-b rounded-t relative`}
					/> */}
					<Image
						src={
							authState && typeof authState.avatar === "string"
								? authState.avatar
								: "https://placehold.co/60x60" // Provide a placeholder image URL or adjust as needed
						}
						width={500}
						height={500}
						quality={10}
						alt="looged in aimage"
						className={`${styles.avatar_image}  border  rounded-b rounded-t relative `}
					/>
				</div>
				<div className="flex justify-center items-center  mt-10 flex-col">
					<div className="mb-4 ">
						<input
							className="block w-full p-2 border border-gray-300 rounded"
							type="file"
							name="avatar"
							onChange={changehandler}
							placeholder="Avatar"
						/>
					</div>
					<div>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
							type="submit"
							onClick={submitHandler}
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal2;
