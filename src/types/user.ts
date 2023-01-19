export interface IUser {
	id: number;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
	avatar: string;
}

export interface IUserSearch {
	login: string;
}

export interface IPasswordData {
	oldPassword: string;
	newPassword: string;
}
