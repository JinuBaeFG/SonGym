import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createTutor(
      groupname: String!
      activeArea: String
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      photoUrl: Upload
      discription: String
      tutorInfo: [String]
      tutorTag: [String]
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
