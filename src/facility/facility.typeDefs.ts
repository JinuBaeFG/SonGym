import { gql } from "apollo-server-express";

export default gql`
  type Facility {
    id: Int!
    user: User
    photoUrl: String
    facilityname: String!
    discription: String
    areaAddress: String
    areaLatitude: String
    areaLongitude: String
    facilityInfo: [FacilityInfo]
    facilityEvent: [FacilityEvent]
    facilityTag: [FacilityTag]
    tutor: [Tutor]
    group: [Group]
    createdAt: String!
    updatedAt: String!
  }

  type FacilityInfo {
    id: Int!
    facility: Facility
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type FacilityTag {
    id: Int!
    tagname: String
    facility: Facility
    createdAt: String!
    updatedAt: String!
  }

  type FacilityEvent {
    id: Int!
    sportsEvent: String
    facility: Facility
    createdAt: String!
    updatedAt: String!
  }
`;
