import { gql } from "apollo-server-express";

export default gql`
  type Tutor {
    id: Int!
    groupname: String!
    activeArea: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    tutorInfo: [TutorInfo]
    tutorTag: [TutorTag]
    tutorReview: [TutorReivew]
    facility: [Int]
    users: [User]
    group: [Group]
    tutorLike: [TutorLike]
    createdAt: String!
    updatedAt: String!
  }

  type TutorInfo {
    id: Int!
    tutor: Tutor
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type TutorTag {
    id: Int!
    tagname: String
    tutor: Tutor
    createdAt: String!
    updatedAt: String!
  }

  type TutorReivew {
    id: Int!
    payload: String!
    point: Int!
    tutor: Tutor
    user: User
    createdAt: String!
    updatedAt: String!
  }

  type TutorLike {
    id: Int!
    tutorId: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
