import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { IAccount } from './AccountModel';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { AccountLoader } from './AccountLoader';
import { User } from '../user/UserModel';
import { UserType } from '../user/UserType';

export const CurrencyType = new GraphQLEnumType({
	name: "CurrencyType",
	values: {
		USD: {value: 'USD'},
		EUR: {value: 'EUR'},
		BRL: {value: 'BRL'},
		BTC: {value: 'BTC'},
		VEF: {value: 'VEF'},
	}
});

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
				return User.findOne({taxId: userTaxId});
			},
		},
		currencyType: {
			type: new GraphQLNonNull(CurrencyType),
			resolve: (account) =>  account.currencyType,
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



