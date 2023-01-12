import { gql } from "apollo-server-express";

export default gql`
  type TutorGroup {
    id: Int!
    groupname: String
    activeArea: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    photoUrl: Upload
    users: [User]
    maxMember: Int
    facility: [Facility]
    tutorGroupInfo: [TutorGroupInfo]
    tutorGroupTag: [TutorGroupTag]
    tutorId: Tutor
    createdAt: String!
    updatedAt: String!
  }

  type TutorGroupTag {
    id: Int!
    tagname: String
    tutorGroupId: TutorGroup!
    createdAt: String!
    updatedAt: String!
  }

  type TutorGroupInfo {
    id: Int!
    discription: String
    awardDate: String
    tutorGroupId: TutorGroup
    createdAt: String!
    updatedAt: String!
  }
`;
