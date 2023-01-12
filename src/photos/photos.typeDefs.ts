import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    files: [UploadFiles]
    caption: String
    likes: Int!
    commentNumber: Int!
    comments: [Comment]
    hashtag: [Hashtag]
    sortation: String
    isMine: Boolean!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photoId: Photo!
    createdAt: String!
    updatedAt: String!
  }

  type UploadFiles {
    id: Int!
    fileUrl: String
    photoId: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
