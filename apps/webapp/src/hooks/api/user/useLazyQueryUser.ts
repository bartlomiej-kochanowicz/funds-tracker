import { GetUserQuery } from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "graphql/query/common/GetUser";

export const useLazyQueryUser = () => useLazyQuery<GetUserQuery>(GET_USER);
