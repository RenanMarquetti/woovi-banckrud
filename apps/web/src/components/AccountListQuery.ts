import { graphql } from 'relay-runtime';

export const AccountList = graphql`
	query AccountListQuery {
		account{
			edges {
				node {
					id
					accountNumber
					owner {
						taxId
						fullName
					}
					currencyType
					createdAt
				}
			}
		}
	}
`;
