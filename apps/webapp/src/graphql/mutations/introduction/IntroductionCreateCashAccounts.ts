import { gql } from '__generated__';

export const INTRODUCTION_CREATE_CASH_ACCOUNTS = gql(/* GraphQL */ `
  mutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {
    introductionCreateCashAccounts(data: $data) {
      success
    }
  }
`);
