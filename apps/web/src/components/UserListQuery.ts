import { graphql } from 'relay-runtime';

export const UserList = graphql`
  query UserListQuery {
    user {
      edges {
        cursor
        node {
            id
            fullName
            email
            taxId
            active
            createdAt
        }
      }
    }
  }
`;
