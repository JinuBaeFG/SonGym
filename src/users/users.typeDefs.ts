import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    group: [Group]
    tutorReview: [TutorReivew]
    favorite: [Favorite]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    tutor: [Tutor]
    tutorGroup: [TutorGroup]
    groupPresident: [GroupPresident]
  }

  type Favorite {
    id: Int!
    photoId: Photo!
    createdAt: String!
    updatedAt: String!
  }

  type Group {
    id: Int!
    groupname: String!
    activeArea: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    photoUrl: String
    users: [User]
    memberNum: Int!
    maxMember: Int
    groupInfo: [GroupInfo]
    facility: [Facility]
    groupTag: [GroupTag]
    tutor: Tutor
    createdAt: String!
    updatedAt: String!
  }
`;
