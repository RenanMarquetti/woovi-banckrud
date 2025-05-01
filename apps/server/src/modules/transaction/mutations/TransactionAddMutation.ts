import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

import mongoose from "mongoose";

import { Account } from '../../account/AccountModel';
import { Transaction } from '../TransactionModel';
import { transactionField } from '../transactionFields';
import { CurrencyType } from '../../account/AccountType';

export type TransactionAddInput = {
	senderAccountNumber: string;
	currencyType: string;
	value: string;
	receiverAccountNumber: string;
	description?: string;
};

const mutation = mutationWithClientMutationId({
	name: 'TransactionAdd',
	inputFields: {
		senderAccountNumber: {
			type: new GraphQLNonNull(GraphQLString),
		},
		currencyType: {
			type: new GraphQLNonNull(CurrencyType),
		},
		value: {
			type: new GraphQLNonNull(GraphQLString),
		},
		description: {
			type: GraphQLString,
		},
		receiverAccountNumber: {
			type: new GraphQLNonNull(GraphQLString),
		}, 
	},
	mutateAndGetPayload: async (args: TransactionAddInput, ctx) => {
		// TODO: implementar transações aqui
		//const session = await mongoose.startSession();
		//await session.startTransaction();

		try {

			const { senderAccountNumber, currencyType, value, description, receiverAccountNumber } = args;

			if(!senderAccountNumber || !currencyType || !value || !receiverAccountNumber) console.log("dados insuficientes");
			if(senderAccountNumber === receiverAccountNumber) console.log("as constas são iguais");
			
			const decimalValue = new mongoose.Types.Decimal128(value);

			const senderAccount = await Account.findOne({ accountNumber: senderAccountNumber }).exec() // .session(session);
			const receiverAccount = await Account.findOne({ accountNumber: receiverAccountNumber }).exec() // .session(session);

			if(senderAccount.currencyType != currencyType) console.log("tipo de moeda do sender não corresponde")
			if(receiverAccount.currencyType != currencyType) console.log("tipo de moeda do receiver não corresponde")
			
			// TODO: faltando função sufficientsFunds da entidade Account
			//if(!senderAccount.sufficientsFunds(value)) console.log("Saldo insuficiente");

			// TODO: verificar se a transação já foi efetuada anteriormente

			
			const transaction = await new Transaction({
				idempotentKey: new Date().toString(),
				senderAccountId: senderAccount._id,
				currencyType: currencyType,
				value: decimalValue,
				description: description,
				receiverAccountId: receiverAccount._id,
			}).save();
			
			const event = {transaction: transaction._id.toString()};

			redisPubSub.publish(PUB_SUB_EVENTS.TRANSACTION.ADDED, event);

			console.log(transaction);
			console.log(event);
			
			return event;

		} catch(err) {
			console.log(err)
			// await session.abortSession();
			throw err;
		} finally {
			// await session.endSession();
		};

	},
	outputFields: {
		...transactionField('transaction'),
	},
});

export const TransactionAddMutation = {
	...mutation,
};
