import { useMutation } from 'react-relay';
import { AccountAdd } from '../components/AccountAddMutation';
import { AccountAddMutation } from '../__generated__/AccountAddMutation.graphql';

import { useState } from 'react';

const CreateAccount = () => {

	const [ taxId, setTaxId ] = useState("");
	const [ currencyType, setCurrencyType ] = useState("");

	const [ commitAccountMutation, isPending ] = useMutation<AccountAddMutation>(AccountAdd);

	const submitAccount = () => {
		const param = {
			variables: {
				input: {
					taxId: taxId,
					currencyType: currencyType,
				}
			},
			onCompleted(data) {
				console.log(data);
			},
			onError(e) {
				console.log(e);
			}
		}
		
		commitAccountMutation(param);
	}

	return (
		<div>
			<h2>Create Account</h2>
			<input onChange={e => setTaxId(e.target.value)} value={taxId} placeholder="CPF/CNPJ" />
			<select onChange={e => setCurrencyType(e.target.value)} value={currencyType} placeholder="Selecione Uma Moeda" >
				<option value="USD">Dólar</option>
				<option value="EUR">Euro</option>
				<option value="BRL">Real</option>
				<option value="BTC">Bitcoin</option>
				<option value="VEF">Bolívar Venezuelano</option>
			</select>
			<br/>
			<button onClick={ submitAccount } >Enviar</button>
		</div>
	)
};

export default CreateAccount;
