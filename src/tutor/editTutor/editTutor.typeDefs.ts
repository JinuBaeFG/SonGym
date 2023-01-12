import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editTutor(
      id: Int!
      groupname: String
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      maxMember: Int
      tutorInfo: [String]
      tutorTag: [String]
      facility: [Int]
    ): MutationResponse!
  }
  type TutorTag {
    tagname: String
  }

  type TutorInfo {
    discription: String
    awardDate: String
  }
`;
