import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteTutor(id: Int!): MutationResponse
  }
`;
