import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createGroup(
      groupname: String!
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      discription: String
      maxMember: Int
      groupInfo: [String]
      groupTag: [String]
      facilityId: [Int]
    ): MutationResponse!
  }
`;
