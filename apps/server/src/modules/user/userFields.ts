import { UserType, UserConnection } from './UserType';
import { UserLoader } from './UserLoader';
import { connectionArgs } from 'graphql-relay';

export const userField = (key: string) => ({
	[key]: {
		type: UserType,
		resolve: async (obj: Record<string, unknown>, _, context) =>
			UserLoader.load(context, obj.user as string),
	},
});

export const userConnectionField = (key: string) => ({
	[key]: {
		type: UserConnection.connectionType,
		args: {
			...connectionArgs,
		},
		resolve: async (_, args, context) => {
			return await UserLoader.loadAll(context, args);
		},
	},
});

