import type {Document, Model} from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";


const Schema = new mongoose.Schema<IUser>(
	{
		fullName: String,
		email: String,
		taxId: String,
		password: String,
		active: Boolean,
	},{
		collection: "User",
		timestamps: true, 
	}
);

export type IUser = {
	fullName: String;
	email: Sting;
	taxId: String;
	password: String;
	active: Boolean;
	createdAt: Date;
  	updatedAt: Date;
} & Document;

export const User: Model<Iuser> = mongoose.model('User', Schema);
