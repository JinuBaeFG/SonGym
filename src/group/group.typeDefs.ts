import { gql } from "apollo-server-express";

export default gql`
  type Group {
    id: Int!
    groupname: String!
    activeArea: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    photoUrl: String
    discription: String
    users: [User]
    userCount: Int!
    memberNum: Int!
    maxMember: Int
    groupInfo: [GroupInfo]
    facility: [Facility]
    groupTag: [GroupTag]
    groupPresident: [GroupPresident]
    isPresident: Boolean
    groupJoin: [GroupJoin]
    isJoin: Boolean
    isJoining: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type GroupInfo {
    id: Int!
    group: Group
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type GroupTag {
    id: Int!
    tagname: String
    group: Group
    isUse: Boolean
    isCustom: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type GroupPresident {
    id: Int!
    user: User
    userId: Int
    group: Group
    groupId: Int
    createdAt: String!
    updatedAt: String!
  }

  type GroupJoin {
    id: Int!
    user: User
    userId: Int
    group: Group
    groupId: Int
    createdAt: String!
    updatedAt: String!
  }
`;
