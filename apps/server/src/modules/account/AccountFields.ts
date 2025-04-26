import { AccountType, AccountConnection } from './AccountType';
import { AccountLoader } from './AccountLoader';
import { connectionArgs } from 'graphql-relay';

export const accountField = (key: string) => ({
	[key]: {
		type: AccountType,
		resolve: async (obj: Record<string, unknown>, _, context) =>
			AccountLoader.load(context, obj.accountNumber as string),
	},
});

export const accountConnectionField = (key: string) => ({
	[key]: {
		type: AccountConnection.connectionType,
		args: {
			...connectionArgs,
		},
		resolve: async (_, args, context) => {
			return await AccountLoader.loadAll(context, args);
		},
	},
});

