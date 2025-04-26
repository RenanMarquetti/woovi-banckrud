import { useState, useEffect } from 'react';
import { useMutation } from 'react-relay';

import { Layout } from '../components/Layout';

import { UserAdd } from '../components/UserAddMutation';
import { UserAddMutation } from '../__generated__/UserAddMutation.graphql';

const FormAddUser = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [taxId, setTaxId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [result, setResult] = useState(null);

	const [userAdd, isPending] = useMutation<UserAddMutation>(UserAdd);

	const onSubmit = (e) => {
		const param = {
				variables: {
					input: {
						fullName: fullName,
						email: email,
						taxId: taxId,
						password: password,
						passwordConfirmation: passwordConfirmation,
					}
				},
				onCompleted(data) {
					setResult(data);
					console.log(data);
				},
				onError(e) {
					console.log(e);
				}
			}

		const result = userAdd(param);
	}

	return (
		<div>
			<input onChange={e => setFullName(e.target.value)} value={fullName} placeholder="Nome completo" />
			<input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
			<input onChange={e => setTaxId(e.target.value)} value={taxId} placeholder="cpf/cnpj" />
			<input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Senha" />
			<input type="password" onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} placeholder="Confirmação da senha" />

			<button type="button" onClick={onSubmit}>enviar</button>
		</div>
	);
}

export default FormAddUser;
