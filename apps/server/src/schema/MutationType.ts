import { GraphQLObjectType } from 'graphql';

import { messageMutations } from '../modules/message/mutations/messageMutations';
import { userMutations } from '../modules/user/mutations/userMutations';
import { accountMutations } from '../modules/account/mutations/accountMutations';
import { transactionMutations } from '../modules/transaction/mutations/transactionMutations';

export const MutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...messageMutations,
		...userMutations,
		...accountMutations,
		...transactionMutations,
	}),
});
