import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { IUser } from './UserModel';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { UserLoader } from './UserLoader';

const UserType = new GraphQLObjectType<IUser>({
	name: 'User',
	description: 'Represents a user',
	fields: () => ({
		id: globalIdField('User'),
		fullName: {
			type: GraphQLString,
			resolve: (user) => user.fullName,
		},
		email: {
			type: GraphQLString,
			resolve: (user) => user.email,
		},
		taxId: {
			type: GraphQLString,
			resolve: (user) => user.taxId,
		},
		password: {
			type: GraphQLString,
			resolve: (user) => user.password,
		},
		active: {
			type: GraphQLBoolean,
			resolve: (user) => user.active,
		},
		createdAt: {
			type: GraphQLString,
			resolve: (user) => user.createdAt.toISOString(),
		},
	}),
	interfaces: () => [nodeInterface],
});

const UserConnection = connectionDefinitions({
	name: 'User',
	nodeType: UserType,
});

registerTypeLoader(UserType, UserLoader.load);

export { UserType, UserConnection };


