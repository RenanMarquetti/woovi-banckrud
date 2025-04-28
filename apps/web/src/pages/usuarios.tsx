import { useLazyLoadQuery } from 'react-relay';
import { UserList } from '../components/UserListQuery';
import { UserListQuery } from '../__generated__/UserListQuery.graphql'

const UserListPage = () => {
	const { user } = useLazyLoadQuery<UserListQuery>(UserList, {});

	return (
		<main>
			<h1>Lista de Usuarios</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>FullName</th>
						<th>Email</th>
						<th>CPF/CNPJ</th>
						<th>Active</th>
						<th>Create Date</th>
					</tr>
				</thead>
				<tbody>{
					user.edges.map( user => (
					<tr>
						<td>{user.node.id ?? 'null'}</td>
						<td>{user.node.fullName ?? 'null'}</td>
						<td>{user.node.email ?? 'null'}</td>
						<td>{user.node.taxId ?? 'null'}</td>
						<td>{user.node.active ?? 'null'}</td>
						<td>{user.node.createdAt ?? 'null'}</td>
					</tr>
					))
				}</tbody>

			</table>
		</main>
	);
};

export default UserListPage;
