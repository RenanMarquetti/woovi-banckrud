import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';

export type IAccount = {
	accountNumber: String;
	userTaxId: String;
	currencyType: String,
	createdAt: Date;
	updatedAt: Date;
} & Document;


const Schema = new mongoose.Schema<IAccount>(
	{
		accountNumber: {
			type: String,
			unique: true,
		},
		currencyType: {
			type: String,
			required: true,
		},
		userTaxId: {
			type: String,
			ref: 'User',
			required: true,
		}
	},
	{
		collection: 'Account',
		timestamps: true,
	}
);

export const Account: Model<IAccount> = mongoose.model('Account', Schema);
