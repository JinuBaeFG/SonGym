import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFacilities(offset: Int!): [Facility]
  }
`;
