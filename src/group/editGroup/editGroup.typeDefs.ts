import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editGroup(
      id: Int!
      groupname: String
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      maxMember: Int
      groupInfo: [String]
      groupTag: [String]
    ): MutationResponse!
  }
`;
