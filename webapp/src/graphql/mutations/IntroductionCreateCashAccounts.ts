import { gql } from '__generated__';

export const INTRODUCTION_CREATE_CASH_ACCOUNT = gql(/* GraphQL */ `
  mutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {
    introductionCreateCashAccounts(data: $data) {
      success
    }
  }
`);
