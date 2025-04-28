import { GraphQLObjectType } from 'graphql';

import { userConnectionField } from '../modules/user/userFields';
import { accountConnectionField } from '../modules/account/accountFields';
import { transactionConnectionField } from '../modules/transaction/TransactionFields';

export const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		...userConnectionField('user'),
		...accountConnectionField('account'),
		...transactionConnectionField('transaction'),
	}),
});
