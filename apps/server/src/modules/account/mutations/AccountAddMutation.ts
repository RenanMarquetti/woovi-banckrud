import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

import { Account } from '../AccountModel';
import { accountField } from '../accountFields';

import { createHash } from 'node:crypto';

export type AccountAddInput = {
	taxId: string;
	currencyType: string;
};

const mutation = mutationWithClientMutationId({
	name: "AccountAdd",
	inputFields: {
		taxId: {
			type: new GraphQLNonNull(GraphQLString),
		},
		currencyType: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	mutateAndGetPayload: async (args: AccountAddInput) => {
		const { taxId, currencyType } = args;
		
		if(!taxId || !currencyType) console.log("dados insuficientes");

		const accountExists = await Account.exists({taxId, currencyType});
		if(accountExists) console.log("a conta já existe");

		const accountNumber = createHash('sha-256').update(Buffer.from(taxId+currencyType), ).digest('base64');

		const accountUser = await new Account({
			accountNumber: accountNumber,
			taxId: taxId,
			currencyType: currencyType,
		}).save();

		const event = {account: accountUser._id.toString()};

		redisPubSub.publish(PUB_SUB_EVENTS.ACCOUNT.ADD, event);

		return event;

	},
	outputFields: {
		...accountField('account'),
	}
});


export const AccountAddMutation = {
	...mutation,
}
