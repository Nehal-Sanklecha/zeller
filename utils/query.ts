import { gql } from '@apollo/client';

export const List_Zeller_Customers = gql`
    query ListZellerCustomers {
      listZellerCustomers {
        items {
          id
          name
          role
        }
    }
  }
`;

export const Get_Zeller_Customer = gql`
    query GetZellerCustomer($getZellerCustomerId: String!) {
      getZellerCustomer(id: $getZellerCustomerId) {
        email
        id
        name
        role
    }
  }
`;
