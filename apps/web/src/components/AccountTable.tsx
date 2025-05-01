import { useLazyLoadQuery } from 'react-relay';
import { AccountList } from '../components/AccountListQuery';
import { AccountListQuery } from '../__generated__/AccountListQuery.graphql'

const AccountTable = () => {
	const { account } = useLazyLoadQuery<AccountListQuery>(AccountList, {});

	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Account Number</th>
					<th>Currency Type</th>
					<th>Name</th>
					<th>CPF/CNPJ</th>
					<th>Create Date</th>
				</tr>
			</thead>
			<tbody>{
				account.edges.map( account => (
				<tr>
					<td>{account.node.id ?? 'null'}</td>
					<td>{account.node.accountNumber ?? 'null'}</td>
					<td>{account.node.currencyType ?? 'null'}</td>
					<td>{account.node.owner.fullName ?? 'null'}</td>
					<td>{account.node.owner.taxId ?? 'null'}</td>
					<td>{account.node.createdAt ?? 'null'}</td>
				</tr>
				))
			}</tbody>

		</table>
	);
};

export default AccountTable;
