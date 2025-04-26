import { createLoader } from '@entria/graphql-mongo-helpers';
import { registerLoader } from '../loader/loaderRegister';
import { User } from './UserModel';

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
	model: User,
	loaderName: 'UserLoader',
});

registerLoader('UserLoader', getLoader);

export const UserLoader = {
	Message: Wrapper,
	getLoader,
	clearCache,
	load,
	loadAll,
};
