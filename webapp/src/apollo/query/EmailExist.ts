import { TypedDocumentNode } from '@apollo/client';
import { gql } from '__generated__/gql';
import { Email, EmailInput } from '__generated__/graphql';

export const EmailExist = gql(`
  query EmailExist($data: EmailExistInput!) {
    emailExist(data: $data) {
      exist
    }
  }
`) as TypedDocumentNode<Email, EmailInput>;
