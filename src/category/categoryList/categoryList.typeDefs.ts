export default `#graphql
  type Query {
    categoryList(offset: Int!): [Hashtag]
  }
`;
