import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

import mongoose from "mongoose";

import { Transaction } from '../TransactionModel';
import { transactionField } from '../transactionFields';

export type TransactionAddInput = {
	receiverAccountNumber: string;
	value: string;
	description?: string;
};

const mutation = mutationWithClientMutationId({
	name: 'TransactionAdd',
	inputFields: {
		receiverAccountNumber: {
			type: new GraphQLNonNull(GraphQLString),
		},
		value: {
			type: new GraphQLNonNull(GraphQLString),
		},
		description: {
			type: GraphQLString,
		},
	},
	mutateAndGetPayload: async (args: TransactionAddInput, ctx) => {

		const session = await mongoose.startSession();
		session.startTransaction();

		try {

		const message = await new Message({
			content: args.content,
		}).save();

		redisPubSub.publish(PUB_SUB_EVENTS.MESSAGE.ADDED, {
			message: message._id.toString(),
		});

		return {
			message: message._id.toString(),
		};
		} catch(err) {
			await session.abortSession();
			throw err;
		} finally {
			await session.endSession();
		};


		const message = await new Message({
			content: args.content,
		}).save();

		redisPubSub.publish(PUB_SUB_EVENTS.MESSAGE.ADDED, {
			message: message._id.toString(),
		});

		return {
			message: message._id.toString(),
		};
	},
	outputFields: {
		...messageField('message'),
	},
});

export const MessageAddMutation = {
	...mutation,
};
