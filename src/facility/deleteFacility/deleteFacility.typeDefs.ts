import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteFacility(id: Int!): MutationResponse
  }
`;
