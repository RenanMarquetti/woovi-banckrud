import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { IAccount } from './AccountModel';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { AccountLoader } from './AccountLoader';
import { UserModel } from '../user/UserModel';
import { UserType } from '../user/UserType';

const AccountType = new GraphQLObjectType<IAccount>({
	name: 'Account',
	description: 'Represents a account',
	fields: () => ({
		id: globalIdField('Account'),
		accountNumber: {
			type: GraphQLString,
			resolve: (account) => account.accountNumber,
		},
		userTaxId: {
			type: GraphQLString,
			resolve: (account) => account.userTaxId,
		},
		owner: {
			type: new GraphQLNonNull(UserType),
			resolve: async ({userTaxId}) => {
				return UserModel.findOne({taxId: userTaxId});
			},
		},
		createdAt: {
			type: GraphQLString,
			resolve: (account) => account.createdAt.toISOString(),
		},
	}),
	interfaces: () => [nodeInterface],
});

const AccountConnection = connectionDefinitions({
	name: 'Account',
	nodeType: AccountType,
});

registerTypeLoader(AccountType, AccountLoader.load);

export { AccountType, AccountConnection };



