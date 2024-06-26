import { CommentDataType } from "@/app/allinterface";
import { useAppSelector } from "@/redux/store";
import { dev_url } from "@/url/hosturl";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const Comment = () => {
	const [comment, setComment] = useState("");
	const [editcommentdata, setEditCommentData] = useState("");

	const params = useParams<{
		[x: string]: any;
		tag: string;
		item: string;
	}>();
	const [fetchTrigger, setFetchTrigger] = useState(false);
	const [showcomment, setShowComment] = useState(false);
	const [openPopUp, SetOpenPopUp] = useState(false);
	const [showAddCommentButtons, setShowAddCommentButtons] = useState(false);
	const [showInputBox, seShowInput] = useState(false);

	const [editcomment, setEditComment] = useState(false);

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
			console.log("comments ", result);
			// if (result.data.data) {
			setVideoComment(result.data.data);
			// }
		};
		fetchAllComments();
	}, [params?.id, fetchTrigger]);

	const handleChangecomment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setShowAddCommentButtons(true);
		setComment(e.target.value);
	};
	const handleChangeEditcomment = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setShowAddCommentButtons(true);
		setEditCommentData(e.target.value);
	};
	const submitHandler = async () => {
		try {
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
		} catch (error) {
			// Displays a success message

			console.log("error", error);
		}
	};
	const popUpHandler = (item: CommentDataType) => {
		if (item) {
			const id = item?._id;
			setShowPopUpId(id);
			console.log("id", typeof id);
			SetOpenPopUp(!openPopUp);
		}
	};
	const deleteHandler = async (item: CommentDataType) => {
		console.log("item", item);
		const commentId = item._id;
		console.log("commentId", commentId);

		try {
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
			setFetchTrigger(!fetchTrigger);
			toast.success("Comment deleted");
			// Displays a success message
			// Toggle fetchTrigger to refetch comments
		} catch (error) {
			toast.error("you can only delete your own comments");
			console.log("error", error);
		}
	};
	const editHandler = async (item: CommentDataType) => {
		try {
			setEditComment(true);
			const commentId = item?._id;
			const payload = {
				comment: editcommentdata,
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
			toast.success("comment edited succesfully");

			setFetchTrigger(!fetchTrigger); // Toggle fetchTrigger to refetch comments
			setEditComment(false);

			console.log("result", result);
		} catch (error) {
			toast.error("you can only edit your own comments");
		}
	};
	const setShowEditComentHandler = () => {
		setShowAddCommentButtons(false);
		setEditComment(false);
	};

	return (
		<>
			<div className=" ">
				{/* <h1 className="text-center bg-red-500 border rounded"> comments</h1> */}

				<textarea
					className="w-full h-7 border rounded  border-black"
					name="comment"
					value={comment}
					id=""
					placeholder=" Add Comment"
					// onChange={(e) => setComment(e.target.value)}
					onChange={handleChangecomment}
				/>
				<br />
				{showAddCommentButtons && (
					<div className="flex justify-end gap-4  ">
						<button
							className="text-xs p-1 m-1"
							type="button"
							onClick={() => setShowAddCommentButtons(false)}
						>
							Cancel
						</button>
						<button
							className="bg-blue-700 text-white border text-xs p-1 m-1 rounded border-black"
							// className="bg-blue-700 border rounded text-xs p-1 m-1 text-white border-black"
							onClick={submitHandler}
						>
							Add Comment
						</button>
					</div>
				)}
				<div className="  ">
					<div className="flex justify-between  ">
						<h1> {videoComment.length} Comment</h1>
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
									<div
										key={item._id}
										className="border border-black m-1 p-1 rounded  "
									>
										<div className="flex justify-between  ">
											<div className="flex gap-2">
												<div>
													<Image
														src={
															videoComment &&
															item.userDetails?.avatar &&
															// Array.isArray(item.userDetails) &&
															typeof item.userDetails.avatar === "string"
																? item.userDetails.avatar
																: "https://placehold.co/20x20" // Provide a placeholder image URL or adjust as needed
														}
														width={500}
														height={500}
														quality={10}
														alt="User Avatar"
														className=" w-10 h-10 rounded-full p-1 text-center "
													/>
												</div>
												<div>
													<p className="text-left font-medium">
														@{item.userDetails?.username}
													</p>
													<p className="text-left font-light">{item.comment}</p>
												</div>
											</div>

											<div className="flex  justify-between gap-2 ">
												{showpopUpId === item._id && openPopUp && (
													<div className="flex gap-1">
														<div className="">
															{editcomment ? (
																<>
																	<textarea
																		className="w-full h-7 border rounded  border-black"
																		name="editcommentdata"
																		value={editcommentdata}
																		id=""
																		placeholder=" Add Comment"
																		// onChange={(e) => setComment(e.target.value)}
																		onChange={handleChangeEditcomment}
																	/>
																	{showAddCommentButtons && (
																		<div className="flex justify-end gap-4  ">
																			<button
																				className="text-xs p-1 m-1 bg-red-400"
																				type="button"
																				// onClick={() =>
																				// 	setShowAddCommentButtons(false)
																				// }
																				onClick={setShowEditComentHandler}
																			>
																				Cancel
																			</button>
																			<button
																				className="bg-blue-700 text-white border text-xs p-1 m-1 rounded border-black"
																				// className="bg-blue-700 border rounded text-xs p-1 m-1 text-white border-black"
																				onClick={() => editHandler(item)}
																			>
																				Edit Comment
																			</button>
																		</div>
																	)}
																</>
															) : (
																<>
																	<button
																		// onClick={() => editHandler(item)}
																		onClick={() => setEditComment(true)}
																	>
																		<EditIcon />
																	</button>
																	<button onClick={() => deleteHandler(item)}>
																		<DeleteIcon />
																	</button>
																</>
															)}
														</div>
													</div>
												)}
												<div>
													{openPopUp && showpopUpId === item._id ? (
														<>
															<button onClick={() => popUpHandler(item)}>
																<CloseIcon />
															</button>
														</>
													) : (
														<>
															<button onClick={() => popUpHandler(item)}>
																<MoreVertIcon />
															</button>
														</>
													)}
												</div>
											</div>
										</div>
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
