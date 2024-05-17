import React, { ChangeEvent, useState } from "react";
import { UpdateCoverImgType } from "@/app/allinterface";
import axios from "axios";
import { dev_url } from "@/url/hosturl";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./EditModal.module.css";

interface EditModalProps {
	onClose: () => void;
	changehandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => Promise<void>;
	coverImage: string;
}

const EditModal: React.FC<EditModalProps> = ({
	onClose,
	changehandler,
	submitHandler,
	coverImage,
}) => {
	console.log("cover", coverImage);

	return (
		<div className={styles.modal_overlay}>
			<div className={`${styles.modal_content} `}>
				<button className={styles.close_button} onClick={onClose}>
					X
				</button>
				<div className={`${styles.mobile_responsive_image} mt-5`}>
					<Image
						src="https://placehold.co/1200x450"
						width={500}
						height={500}
						quality={10}
						alt={"looged in aimage"}
						className={`${styles.coverimage} border  rounded-b rounded-t relative`}
					/>
				</div>
				<div className="flex justify-center flex-col items-center  mt-10">
					<div className="mb-4 ">
						<input
							className="block w-full p-2 border border-gray-300 rounded items-center text-center"
							type="file"
							name="coverImage"
							onChange={changehandler}
							placeholder="Cover Image"
						/>
					</div>
					<div>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-center"
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

export default EditModal;
