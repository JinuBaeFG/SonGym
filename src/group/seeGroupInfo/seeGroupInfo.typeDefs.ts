import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeGroupInfo(id: Int!): [GroupInfo]
  }

  type GroupInfo {
    id: Int
    awardDate: String
    discription: String
  }
`;
