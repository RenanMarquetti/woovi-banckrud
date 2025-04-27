import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { redisPubSub } from '../../pubSub/redisPubSub';
import { PUB_SUB_EVENTS } from '../../pubSub/pubSubEvents';

import { User } from '../UserModel';
import { userField } from '../userFields';

export type UserAddInput = {
	fullName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	taxId: string;
};

const mutation = mutationWithClientMutationId({
	name: 'UserAdd',
	inputFields: {
		fullName: {
			type: new GraphQLNonNull(GraphQLString),
		},
		email: {
			type: new GraphQLNonNull(GraphQLString),
		},
		password: {
			type: new GraphQLNonNull(GraphQLString),
		},
		passwordConfirmation: {
			type: new GraphQLNonNull(GraphQLString),
		},
		taxId: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	mutateAndGetPayload: async (args: UserAddInput) => {

		if(args.password !== args.passwordConfirmation) console.log("As senhas não são iguais"); // TODO: transformar no lançamento de exceptions
		
		const { fullName, password, email, taxId } = args;

		const [emailExists, taxIdExists] = await Promise.all([
			User.exists({ email }),
			User.exists({ taxId }),
		]);

		if(emailExists || taxIdExists) console.log("usuario já se encontra cadastrado")

		const user = await new User({
			fullName: fullName,
			email: email,
			password: password,
			taxId: taxId,
		}).save();

		const event = {user: user._id.toString()};

		redisPubSub.publish(PUB_SUB_EVENTS.USER.ADD, event);

		return event;
	},
	outputFields: {
		...userField('user'),
	},
});

export const UserAddMutation = {
	...mutation,
};
