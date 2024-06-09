import { CommentDataType } from "@/app/allinterface";
import { useAppSelector } from "@/redux/store";
import { dev_url } from "@/url/hosturl";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = () => {
	const [comment, setComment] = useState("");
	const params = useParams<{
		[x: string]: any;
		tag: string;
		item: string;
	}>();
	const [fetchTrigger, setFetchTrigger] = useState(false);
	const [showcomment, setShowComment] = useState(false);
	const [showpopUpId, setShowPopUpId] = useState<string | undefined>();

	const userId = useAppSelector((state) => state.auth?.loggedInUser?._id);

	const [videoComment, setVideoComment] = useState<CommentDataType[]>([]);
	useEffect(() => {
		const fetchAllComments = async () => {
			const result = await axios(
				`${dev_url}/comments/getAllComments/${params?.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			console.log("result", result.data.data);
			// if (result.data.data) {
			setVideoComment(result.data.data);
			// }
		};
		fetchAllComments();
	}, [params?.id, fetchTrigger]);
	const submitHandler = async () => {
		const payload = {
			comment: comment,
			owner: userId,
			video: params?.id,
		};
		console.log("payload", payload);

		const result = await axios.post(
			`${dev_url}/comments/addComments/${params?.id}`,

			payload,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			}
		);
		if (result.data) {
			toast.success("Comment Succesfully Added"); // Displays a success message
			setFetchTrigger(!fetchTrigger); // Toggle fetchTrigger to refetch comments
		}
		console.log("result", result);
	};
	const popUpHandler = (item: CommentDataType) => {
		if (item) {
			const id = item?._id;
			setShowPopUpId(id);
			console.log("id", typeof id);
		}
	};
	const deleteHandler = async (item: CommentDataType) => {
		// console.log("item", id);
		const commentId = item._id;
		const result = await axios.delete(
			`${dev_url}/comments/deleteComment/${commentId}`,

			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			}
		);
		console.log("result", result);
		setFetchTrigger(!fetchTrigger); // Toggle fetchTrigger to refetch comments

		// fetchAllComments();
	};
	const editHandler = async (item: CommentDataType) => {
		const commentId = item?._id;
		const payload = {
			comment: comment,
			owner: userId,
			video: params?.id,
		};
		const result = await axios.post(
			`${dev_url}/comments/editComment/${commentId}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			}
		);
		setFetchTrigger(!fetchTrigger); // Toggle fetchTrigger to refetch comments
		console.log("result", result);
	};

	return (
		<>
			<div className="">
				<textarea
					className="w-full h-7 border  border-black"
					// name="comment"
					value={comment}
					id=""
					placeholder=" Add Comment"
					onChange={(e) => setComment(e.target.value)}
				/>
				<br />
				<div className="flex justify-end gap-4">
					<button className="" type="button">
						Cancel
					</button>
					<button
						className="bg-blue-700 border rounded p-1 text-white border-black"
						onClick={submitHandler}
					>
						Add Comment
					</button>
				</div>
				<div className="  ">
					<div className="flex justify-between">
						<h1> {videoComment.length} Comments</h1>
						<div>
							<button
								className="bg-gray-500 text-white border text-xs p-1 m-1 rounded border-black"
								onClick={() => setShowComment(!showcomment)}
							>
								{!showcomment ? "Show Comment" : "Hide Comment"}
							</button>
						</div>
					</div>

					{showcomment &&
						videoComment &&
						videoComment.map((item) => {
							return (
								<>
									<div key={item._id} className="border border-black m-1 p-1 ">
										<div className="flex justify-between ">
											<p>image</p>
											<div>
												<button onClick={() => popUpHandler(item)}>:</button>
											</div>
											{showpopUpId === item._id && (
												<div className="flex gap-2">
													<button onClick={() => editHandler(item)}>
														<EditIcon />
													</button>
													<button onClick={() => deleteHandler(item)}>
														<DeleteIcon />
													</button>
												</div>
											)}
										</div>
										<p className="text-left">{item.comment}</p>
									</div>
								</>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default Comment;
