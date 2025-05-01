import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import type { ConnectionArguments } from 'graphql-relay';

import { ITransaction } from './TransactionModel';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { TransactionLoader } from './TransactionLoader';
import { Account } from '../account/AccountModel';
import { AccountType } from '../account/AccountType';

const TransactionType = new GraphQLObjectType<ITransaction>({
	name: 'Transaction',
	description: 'Represents a transaction',
	fields: () => ({
		id: globalIdField('Transaction'),
		sender: {
			type: new GraphQLNonNull(AccountType),
			resolve: async ({ senderAccountId }) => {
				console.log("senderAccountId: ", senderAccountId)
				return Account.findById(senderAccountId);
			},
		},
		receiver: {
			type: new GraphQLNonNull(AccountType),
			resolve: async ({ receiverAccountId }) => {
				console.log("receiverAccountId: ", receiverAccountId)
				return Account.findById(receiverAccountId);
			},
		},
		value: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: ({value}) => {
				console.log(value);
				return value.toString();
			},
		},
		description: {
			type: GraphQLString,
			resolve: ({description}) => {
				console.log(description);
				return description;
			},
		},
		createdAt: {
			type: GraphQLString,
			resolve: (transaction) => {
				console.log(transaction.createdAt);
				return transaction.createdAt.toISOString();
			},
		},
	}),
	interfaces: () => [nodeInterface],
});

const TransactionConnection = connectionDefinitions({
	name: 'Transaction',
	nodeType: TransactionType,
});

registerTypeLoader(TransactionType, TransactionLoader.load);

export { TransactionType, TransactionConnection };
