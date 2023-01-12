import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteTutorGroup(id: Int!): MutationResponse!
  }
`;
