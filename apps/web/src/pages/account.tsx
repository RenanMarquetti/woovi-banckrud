import CreateAccount from '../components/CreateAccount';
import AccountTable from '../components/AccountTable';

const AccountPage = () => {
	return (
		<div>
			<h1>Account Page</h1>
			<CreateAccount/>
			<br/>
			<AccountTable/>
		</div>
	)
}

export default AccountPage;
