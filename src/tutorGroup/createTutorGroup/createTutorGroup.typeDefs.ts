import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createTutorGroup(
      groupname: String
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      discription: String
      maxMember: Int
      facility: [Int]
      tutorGroupInfo: [String]
      tutorGroupTag: [String]
    ): [TutorGroup]
  }
`;
