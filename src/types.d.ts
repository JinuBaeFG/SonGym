import { PrismaClient, User } from "@prisma/client";

type context = {
  loggedInUser?: User;
  client: PrismaClient;
};

export type Resolver = (root: any, args: any, context: any, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
