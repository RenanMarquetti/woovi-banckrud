import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = new mongoose.Schema<IAccount>(
	{
		accountNumber: {
			type: String,
			unique: true,
		},
		userTaxId: {
			type: String,
			ref: 'User',
			unique: true,
			required: true,
		}
	},
	{
		collection: 'Account',
		timestamps: true,
	}
);

export type IAccount = {
	accountNumber: String;
	userTaxId: String;
	createdAt: Date;
	updatedAt: Date;
} & Document;

export const Account: Model<IAccount> = mongoose.model('Account', Schema);
