export interface VideoType {
	createdAt: string;
	duration: number;
	owner: FormDataType | FormDataType[];
	thumbnail: string;
	title: string;
	updatedAt: string;
	videoFile: string;
	_id: string;
	// users: FormDataType[];
}

export interface loginDataType {
	email: string;
	password: string;
}

export interface FormDataType {
	username?: string;
	email: string;
	fullName?: string;
	password: string;
	avatar?: File | string;
	coverImage?: File | string;
	_id?: string;
}

export interface PasswordChangeType {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

export interface UpdateUserDetailsType {
	email: string;
	username: string;
}
export interface UpdateAvaterType {
	avatar: File | string;
}
export interface UpdateCoverImgType {
	coverImage: File | string;
}

// export interface VideoDataType {
//     duration: string;
//     title: string;
//     thumbnail: string;
//     owner: FormDataType[] | null;
//     videoFile: File | string;
//   }
//   export interface FormDataType {
//     username: string;
//     email: string;
//     fullName: string;
//     password: string;
//     avatar: File | string;
//     coverImage: File | string;
//     _id: string;
//   }

export interface CommentDataType {
	comment: string;
	views?: string;
	likes?: string;
	owner: string;
	video: string;
	_id?: string;
	userDetails?: {
		avatar: string;
		coverImage: string;
		email: string;
		username: string;
		_id: string;
	};
}
