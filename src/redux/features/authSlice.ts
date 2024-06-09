import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormDataType } from "@/app/allinterface";

export interface IAuthState {
	loggedInUser: FormDataType | null;
}

const initialState: IAuthState = {
	loggedInUser: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthState: (state, action: PayloadAction<FormDataType | null>) => {
			state.loggedInUser = action.payload;
		},
		updateFullName: (state, action: PayloadAction<string>) => {
			if (state.loggedInUser) {
				state.loggedInUser.fullName = action.payload;
			}
		},
		updateAvatar: (state, action: PayloadAction<string>) => {
			if (state.loggedInUser) {
				state.loggedInUser.avatar = action.payload;
			}
		},
		updateCoverImage: (state, action: PayloadAction<string>) => {
			if (state.loggedInUser) {
				state.loggedInUser.coverImage = action.payload;
			}
		},
		updateEmail: (state, action: PayloadAction<string>) => {
			if (state.loggedInUser) {
				state.loggedInUser.email = action.payload;
			}
		},
		updateUserName: (state, action: PayloadAction<string>) => {
			if (state.loggedInUser) {
				state.loggedInUser.username = action.payload;
			}
		},
	},
});

export const {
	setAuthState,
	updateFullName,
	updateAvatar,
	updateCoverImage,
	updateEmail,
	updateUserName,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

// Optional: Logging initial state for debugging
// console.log("Initial state from reducer", initialState);
