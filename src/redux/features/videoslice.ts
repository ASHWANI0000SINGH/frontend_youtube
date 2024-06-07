import { VideoType } from "@/app/allinterface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface videoState {
	videosState: VideoType | [];
}

const initialState: videoState = {
	videosState: [],
};

export const videoSlice = createSlice({
	name: "videos",
	initialState,
	reducers: {
		setVideoState: (state, action: PayloadAction<VideoType>) => {
			state.videosState = action.payload;
		},
	},
});

export const { setVideoState } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;
