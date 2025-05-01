import { graphql } from 'react-relay';

export const TransactionAdd = graphql`
	mutation TransactionAddMutation($input: TransactionAddInput!) {
		TransactionAdd(input: $input) {
			transaction {
				id
				sender {
					accountNumber
					currencyType
				}
				value
				description
				receiver {
					accountNumber
					currencyType
				}
			}
		}
	}
`;
