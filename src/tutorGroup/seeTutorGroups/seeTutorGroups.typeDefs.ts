import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeTutorGroups(offset: Int!): [Tutor]
  }
`;
