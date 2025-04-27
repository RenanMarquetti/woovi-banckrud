import { createLoader } from '@entria/graphql-mongo-helpers';
import { registerLoader } from '../loader/loaderRegister';
import { Account } from './AccountModel';

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
	model: Account,
	loaderName: 'AccountLoader',
});

registerLoader('AccountLoader', getLoader);

export const AccountLoader = {
	Message: Wrapper,
	getLoader,
	clearCache,
	load,
	loadAll,
};
