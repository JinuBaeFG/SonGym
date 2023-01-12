import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editTutorGroup(
      id: Int!
      groupname: String
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      maxMember: Int
      facility: [Int]
      tutorGroupInfo: [String]
      tutorGroupTag: [String]
    ): MutationResponse!
  }
`;
