import { useState } from 'react';

import { useMutation } from 'react-relay';

import { TransactionAdd } from '../components/TransactionAddMutation';
import { TransactionAddMutation } from '../__generated__/TransactionAddMutation.graphql';

enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  BRL = "BRL",
  BTC = "BTC",
  VEF = "VEF",
}

export const CreateTransaction = () => {
	const [senderAccountNumber, setSenderAccountNumber] = useState('ziILE8V1VSh5xm8GuDbRApgxQJZNwhRpliJviKV/aZ4=');
	const [currencyType, setCurrencyType] = useState('USD');
	const [value, setValue] = useState('10');
	const [description, setDescription] = useState('');
	const [receiverAccountNumber, setReceiverAccountNumber] = useState('tVvNcEIfJuMupC+6zsLbCqjrXxblL38x+TySO6sZlIc=');

	const [commitTransaction, isPending ] = useMutation<TransactionAddMutation>(TransactionAdd);

	const submitTransaction = () => {
		const inputTransaction = 
		{
			variables: {
				input: {
					senderAccountNumber: senderAccountNumber,
					currencyType: currencyType as CurrencyType,
					value: value,
					description: description,
					receiverAccountNumber: receiverAccountNumber,
				}
			},
			onCompleted(data) {
				console.log(data);
			},
			onError(e) {
				console.log(e);
			}
		}
		

		const result = commitTransaction(inputTransaction);
	};

	return (
		<div>
			<input onChange={e => setSenderAccountNumber(e.target.value)} value={senderAccountNumber} placeholder="Sender Account Number" />
			<select onChange={e => setCurrencyType(e.target.value)} value={currencyType} placeholder="Select Currency Type" >
				<option value="USD">Dólar</option>
				<option value="EUR">Euro</option>
				<option value="BRL">Real</option>
				<option value="BTC">Bitcoin</option>
				<option value="VEF">Bolívar Venezuelano</option>
			</select>
			<input onChange={e => setValue(e.target.value)} value={value} placeholder="Value" />
			<input onChange={e => setDescription(e.target.value)} value={description} placeholder="Description" />
			<input onChange={e => setReceiverAccountNumber(e.target.value)} value={receiverAccountNumber} placeholder="Receiver Account Number" />
			<br/>
			<button onClick={submitTransaction}>Enviar</button>
		</div>
	);
}
