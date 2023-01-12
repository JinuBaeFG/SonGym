import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editFacility(
      id: Int!
      photoUrl: Upload
      facilityname: String
      areaAddress: String
      areaLatitude: String
      areaLongitude: String
      facilityCall: String
      facilityInfo: [String]
      facilityTag: [String]
      facilityEvent: [String]
    ): MutationResponse!
  }
`;
